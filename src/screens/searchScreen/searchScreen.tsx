import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard, SafeAreaView, TextInput, View} from 'react-native';
import {ThemeContext} from '../../contexts/themeContext';
import {getStyles} from './styles';
import {CustomTextInput} from '../../components/customTextInput';
import {scale, verticalScale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/params';
import {ROUTES} from '../../navigation/routes';
import {gs} from '../../theme/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomText} from '../../components/customText';
import {RFValue} from 'react-native-responsive-fontsize';
import {safeApiCall} from '../../utils/axios.utils';
import {searchGifs} from '../../services/gifServices';
import {UiState} from '../../utils/app.utils';
import {Giphy} from '../../models/giphyModel';
import {useDebounce} from '../../hooks/useDebounce';
import {RippleButton} from '../../components/rippleButton';
import FastImage from 'react-native-fast-image';
import {LoadingComponent} from '../../components/loadingComponent';
import MasonryList from '@react-native-seoul/masonry-list';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.SEARCH>;

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [searchText, setSearchText] = useState<string>('');
  const searchRef = useRef<TextInput>(null);
  const [gifs, setGifs] = useState<Giphy[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [uiState, setUiState] = useState<UiState>('idle');

  function fetchGifs(resetSearch: boolean = false) {
    if (uiState === 'loading' || (!resetSearch && !hasMore)) return;
    setUiState('loading');
    safeApiCall(
      async () => {
        const response = await searchGifs(searchText, resetSearch ? 1 : page);
        const {data, pagination} = response.data;
        setGifs(p => (resetSearch ? data : [...p, ...data]));
        setHasMore(
          pagination.offset + pagination.count < pagination.total_count,
        );
        setPage(p => (resetSearch ? 2 : p + 1));
        setUiState('success');
      },
      () => setUiState('failure'),
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const debouncedSearch = useDebounce(() => {
    setGifs([]);
    if (searchText.trim()) {
      fetchGifs(true);
    } else {
      //   setGifs([]);
      setPage(1);
      setHasMore(true);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch();
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: scale(16),
          paddingVertical: verticalScale(6),
        }}>
        <View
          style={{
            ...gs.row,
            paddingBottom: verticalScale(12),
            gap: scale(10),
          }}>
          <AntDesign
            name="arrowleft"
            size={scale(24)}
            color={theme.secondaryColor}
            onPress={() => navigation.goBack()}
          />
          <CustomText
            size={RFValue(16)}
            fontWeight="semi-bold"
            color={theme.secondaryColor}>
            Search GIFs
          </CustomText>
        </View>
        <CustomTextInput
          ref={searchRef}
          value={searchText}
          setValue={setSearchText}
          placeHolder="Search GIFs"
        />
      </View>
      <MasonryList
        data={gifs}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        refreshing={uiState === 'refreshing'}
        onRefresh={() => {
          if (searchText.trim().length > 0) {
            setGifs([]);
            setUiState('refreshing');
            fetchGifs(true);
          }
        }}
        refreshControlProps={{
          tintColor: theme.primaryColor,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: scale(10)}}
        renderItem={({item, i}) => {
          const giphy = item as Giphy;
          const width = parseInt(giphy.images.fixed_width.width) - scale(10);
          const height = parseInt(giphy.images.fixed_width.height);
          const originalGifUrl = giphy.images.original.url;
          const mp4Url = giphy.images.original_mp4.mp4;
          return (
            <RippleButton
              onPress={() =>
                navigation.navigate(ROUTES.VIEW_GIF, {
                  gifUrl: originalGifUrl,
                  mp4Url,
                  title: giphy.title,
                })
              }
              style={{
                marginLeft: i % 2 === 0 ? 0 : scale(10),
                ...styles.previewGifContainer,
                height,
              }}>
              <FastImage
                style={styles.previewGif}
                source={{
                  uri: giphy.images.preview_gif.url,
                  priority: FastImage.priority.normal,
                }}
                onError={() => console.log('fast image error')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </RippleButton>
          );
        }}
        onEndReached={fetchGifs}
        ListFooterComponent={
          <>{uiState === 'loading' ? <LoadingComponent /> : null}</>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
