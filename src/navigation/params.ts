import {ROUTES} from './routes';

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.VIEW_GIF]: {
    gifUrl: string;
    mp4Url: string;
    title: string;
  };
  [ROUTES.SEARCH]: undefined;
};
