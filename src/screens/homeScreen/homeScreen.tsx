import {Pressable, SafeAreaView, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {ThemeContext} from '../../contexts/themeContext';
import {getStyles} from './styles';
import MasonryList from '@react-native-seoul/masonry-list';
import FastImage from 'react-native-fast-image';
import {Giphy} from '../../models/giphyModel';
import {scale, verticalScale} from 'react-native-size-matters';
import {RippleButton} from '../../components/rippleButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/params';
import {ROUTES} from '../../navigation/routes';
import {CustomTextInput} from '../../components/customTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppBar} from '../../components/appBar';
import {CustomText} from '../../components/customText';
import {RFValue} from 'react-native-responsive-fontsize';
import {LoadingComponent} from '../../components/loadingComponent';
import {safeApiCall} from '../../utils/axios.utils';
import {UiState} from '../../utils/app.utils';
import {getTrendingGifs} from '../../services/gifServices';
import {ErrorComponent} from '../../components/errorComponent';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.HOME>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [gifs, setGifs] = useState<Giphy[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [uiState, setUiState] = useState<UiState>('idle');

  function fetchGifs(refresh: boolean = false) {
    if (uiState === 'loading' || !hasMore) return;

    if (refresh) {
      setGifs([]);
      setUiState('refreshing');
    } else setUiState('loading');

    safeApiCall(
      async () => {
        console.log('homescren', 'called');
        const response = await getTrendingGifs(refresh ? 1 : page);
        const {data, pagination} = response.data;
        console.log('payload size', data.length);
        setGifs(p => (refresh ? data : [...p, ...data]));
        setHasMore(
          pagination.offset + pagination.count < pagination.total_count,
        );
        setPage(p => (refresh ? 2 : p + 1));
        setUiState('success');
      },
      () => setUiState('failure'),
    );
  }

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <View
        style={{
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(10),
        }}>
        <Pressable onPress={() => navigation.navigate(ROUTES.SEARCH)}>
          <CustomTextInput
            value={''}
            placeHolder="Search GIFs"
            textInputProps={{
              editable: false,
            }}
            leadingIcon={
              <AntDesign
                name="search1"
                size={scale(16)}
                color={theme.secondaryContainer}
                style={{marginRight: scale(6)}}
              />
            }
          />
        </Pressable>
      </View>
      <MasonryList
        data={gifs}
        keyExtractor={(item: Giphy): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: scale(10)}}
        refreshing={uiState === 'refreshing'}
        onRefresh={() => fetchGifs(true)}
        refreshControlProps={{
          tintColor: theme.primaryColor,
        }}
        ListHeaderComponent={
          <CustomText
            style={{
              paddingBottom: verticalScale(10),
              paddingTop: verticalScale(4),
            }}
            size={RFValue(16)}
            fontWeight="semi-bold"
            color={theme.secondaryColor}>
            Trending GIFs
          </CustomText>
        }
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
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                onError={() => console.log('fast image error')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </RippleButton>
          );
        }}
        onEndReached={fetchGifs}
        ListFooterComponent={
          <>
            {uiState === 'loading' ? (
              <LoadingComponent />
            ) : uiState === 'failure' ? (
              <ErrorComponent
                onRetry={() => fetchGifs()}
                errorType={gifs.length > 0 ? 'load-more' : 'retry'}
              />
            ) : null}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
