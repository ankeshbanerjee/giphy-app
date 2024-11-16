import {View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {CustomText} from '../customText';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../../contexts/themeContext';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStyles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {KEY, removeData, storeData} from '../../utils/storage.utils';
import {ImageAssets} from '../../../assets';

export default function AppBar() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <FastImage
        source={ImageAssets.giphyIcon}
        style={{width: moderateScale(30), height: moderateScale(30)}}
        resizeMode="contain"
      />
      <CustomText
        fontWeight="semi-bold"
        color={theme.secondaryColor}
        size={RFValue(18)}>
        GIPHY
      </CustomText>
      <View style={{flex: 1}} />
      <Feather
        name={theme.isDark ? 'sun' : 'moon'}
        size={moderateScale(24)}
        color={theme.secondaryColor}
        style={{
          padding: moderateScale(4),
        }}
        onPress={function () {
          if (!theme.isDark) {
            storeData(KEY.THEME, 'dark_theme');
            toggleTheme();
          } else {
            removeData(KEY.THEME);
            toggleTheme();
          }
        }}
      />
    </View>
  );
}
