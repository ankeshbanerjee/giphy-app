import React, {useEffect} from 'react';
import {ThemeProvider} from './src/contexts/themeContext';
import Router from './src/navigation/router';
import {initService} from './src/utils/axios.utils';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
