import {StyleSheet} from 'react-native';
import {ThemeData} from '../../theme/themeData';
import {scale, verticalScale} from 'react-native-size-matters';
import ColorAssets from '../../theme/colors';

export const getStyles = (theme: ThemeData) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroungColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderRadius: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      marginHorizontal: scale(16),
    },
    btn: {
      backgroundColor: theme.primaryColor,
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(16),
      borderRadius: 10,
      shadowColor: ColorAssets.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
