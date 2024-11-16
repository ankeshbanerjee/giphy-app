import {scale, verticalScale} from 'react-native-size-matters';
import {gs} from '../../theme/globalStyles';
import {ThemeData} from '../../theme/themeData';

export function getStyles(theme: ThemeData) {
  return {
    container: {
      ...gs.row,
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(6),
      gap: scale(6),
    },
  };
}
