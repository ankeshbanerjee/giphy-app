import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/params';
import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

export const rootNavigationRef =
  createNavigationContainerRef<RootStackParamList>();

export type UiState = 'loading' | 'success' | 'idle' | 'failure' | 'refreshing';

export const showToast = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Toast.showWithGravity(msg, Toast.LONG, Toast.BOTTOM);
  }
};
