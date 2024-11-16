import {SafeAreaView, Image, View} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';
import {ThemeContext} from '../../contexts/themeContext';
import {ImageAssets} from '../../../assets';
import {initService} from '../../utils/axios.utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/params';
import {ROUTES} from '../../navigation/routes';
import {getStyles} from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.SPLASH>;

export default function SplashScreen({navigation}: Props) {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    initService();
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.HOME);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={ImageAssets.giphyIcon}
          style={{
            height: 150,
            width: 150,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
