import {StyleSheet} from 'react-native';
import {ThemeData} from '../../theme/themeData';
import {verticalScale} from 'react-native-size-matters';

export const getStyles = (theme: ThemeData) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroungColor,
    },
    previewGifContainer: {
      borderRadius: 20,
      marginBottom: verticalScale(10),
      overflow: 'hidden',
    },
    previewGif: {
      flex: 1,
      backgroundColor: theme.onSecondary,
    },
  });
