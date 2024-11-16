import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import ColorAssets from '../../../theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native';

interface Props {
  icon: string;
  onpress: () => void;
  styles?: ViewStyle;
}

export function IconButton({icon, onpress, styles}: Props) {
  const {top} = useSafeAreaInsets();
  return (
    <AntDesign
      name={icon}
      size={moderateScale(24)}
      color={ColorAssets.white}
      style={{
        position: 'absolute',
        top: top + moderateScale(16),
        zIndex: 1,
        padding: moderateScale(10),
        ...(styles ?? {}),
      }}
      onPress={onpress}
    />
  );
}
