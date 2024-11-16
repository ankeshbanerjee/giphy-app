import axios from 'axios';
import {showToast} from './app.utils';
import {Constants} from './constants';

export function initService() {
  axios.defaults.baseURL = Constants.BASE_URL;
  axios.defaults.timeout = 15000;
  axios.defaults.timeoutErrorMessage = 'Request Timeout';
}

axios.interceptors.request.use(
  config => {
    console.log('axios request config', config);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export const safeApiCall = async (
  call: () => Promise<void>,
  onError: () => void = () => {},
) => {
  call().catch((error: any) => {
    onError();
    try {
      console.log(error?.response?.data?.message);
      const errorMsg = error?.response?.data?.message;
      if (errorMsg !== undefined) {
        console.log('safeapicall error', errorMsg);
        showToast(errorMsg);
      } else {
        showToast('Something Went Wrong');
      }
    } catch (e) {
      console.log('some error', e);
      showToast('Something Went Wrong');
    }
  });
};
