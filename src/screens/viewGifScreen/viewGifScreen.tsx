import {Pressable, SafeAreaView, StatusBar, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/params';
import {ROUTES} from '../../navigation/routes';
import {getStyles} from './styles';
import {ThemeContext} from '../../contexts/themeContext';
import Video from 'react-native-video';
import {moderateScale} from 'react-native-size-matters';
import ColorAssets from '../../theme/colors';
import {IconButton} from './components/iconButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {LoadingModal} from '../../components/loadingModal';
import {showToast, UiState} from '../../utils/app.utils';
import handleDownloadAndOpenGif from '../../services/dowloadGifService';
import {shareGif} from '../../services/shareGifService';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.VIEW_GIF>;

const ViewGifScreen: React.FC<Props> = ({navigation, route}) => {
  const {gifUrl, mp4Url, title} = route.params;
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const playPauseIconOpacity = useSharedValue(0);
  const [uiState, setUiState] = useState<UiState>('idle');

  useEffect(() => {
    playPauseIconOpacity.value = withSequence(
      // show icon
      withTiming(1, {
        duration: 200,
      }),
      // hide icon
      withDelay(400, withTiming(0, {duration: 200})),
    );
  }, [isPaused]);

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <IconButton
          icon="arrowleft"
          onpress={() => navigation.goBack()}
          styles={{
            left: moderateScale(10),
          }}
        />
        <IconButton
          icon="download"
          onpress={function () {
            setUiState('loading');
            handleDownloadAndOpenGif(
              gifUrl,
              msg => {
                showToast(msg);
                setUiState('idle');
              },
              title,
            );
          }}
          styles={{
            right: moderateScale(60),
          }}
        />
        <IconButton
          icon="sharealt"
          onpress={() => {
            setUiState('loading');
            shareGif(gifUrl, msg => {
              setUiState('idle');
              if (msg) showToast(msg);
            });
          }}
          styles={{
            right: moderateScale(10),
          }}
        />
        <Pressable onPress={() => setIsPaused(p => !p)} style={{flex: 1}}>
          <Video
            repeat
            source={{uri: mp4Url}}
            paused={isPaused}
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: ColorAssets.black,
            }}
            resizeMode="contain"
          />
        </Pressable>
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => setIsPaused(p => !p)}>
            <Animated.View
              style={{
                opacity: playPauseIconOpacity,
              }}>
              <FontAwesome5
                name={isPaused ? 'pause' : 'play'}
                size={moderateScale(50)}
                color={ColorAssets.white}
                style={{
                  shadowColor: ColorAssets.black,
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                }}
              />
            </Animated.View>
          </Pressable>
        </View>
      </SafeAreaView>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoadingModal visible={uiState === 'loading'} />
      </View>
    </>
  );
};

export default ViewGifScreen;
