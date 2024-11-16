import {StyleSheet} from 'react-native';
import {ThemeData} from '../../theme/themeData';

export const getStyles = (theme: ThemeData) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroungColor,
    },
  });
