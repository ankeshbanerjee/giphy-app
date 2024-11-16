import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeContext} from '../contexts/themeContext';
import {NavigationContainer} from '@react-navigation/native';
import {rootNavigationRef} from '../utils/app.utils';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './params';
import {ROUTES} from './routes';
import {HomeScreen} from '../screens/homeScreen';
import {ViewGifScreen} from '../screens/viewGifScreen';
import {SearchScreen} from '../screens/searchScreen';
import {doesExist, getData, KEY} from '../utils/storage.utils';
import {SplashScreen} from '../screens/splashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  function setTheme() {
    if (doesExist(KEY.THEME)) {
      const theme = getData(KEY.THEME);
      if (theme === 'dark_theme') {
        toggleTheme();
      }
    }
  }

  useEffect(() => {
    setTheme();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme.backgroungColor}
        barStyle={!theme.isDark ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer ref={rootNavigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
          initialRouteName={ROUTES.SPLASH}>
          <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
          <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
          <Stack.Screen name={ROUTES.VIEW_GIF} component={ViewGifScreen} />
          <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
