import {SafeAreaView, View} from 'react-native';
import React, {FC, useContext, useMemo} from 'react';
import {ThemeContext} from '../../contexts/themeContext';
import {CustomText} from '../customText';
import {RippleButton} from '../rippleButton';
import ColorAssets from '../../theme/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStyles} from './styles';

interface Props {
  onRetry: () => void;
  errorType: 'retry' | 'load-more';
}

const ErrorComponent: FC<Props> = ({onRetry, errorType}) => {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <RippleButton
        style={{...styles.btn, marginTop: errorType === 'retry' ? 10 : 0}}
        onPress={onRetry}>
        <CustomText
          style={{color: ColorAssets.white}}
          fontWeight="semi-bold"
          size={RFValue(12)}>
          {errorType === 'retry' ? 'Retry' : 'Load More'}
        </CustomText>
      </RippleButton>
    </SafeAreaView>
  );
};

export default ErrorComponent;
