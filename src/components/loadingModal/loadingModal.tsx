import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import ColorAssets from '../../theme/colors';

const LoadingModal = ({visible}: {visible: boolean}) => {
  return (
    <Modal isVisible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={ColorAssets.white} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
