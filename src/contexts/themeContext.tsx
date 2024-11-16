import React, {PropsWithChildren, useState} from 'react';
import {ThemeData} from '../theme/themeData';
import {LightTheme} from '../theme/lightTheme';
import {DarkTheme} from '../theme/darkTheme';

interface ThemeContextType {
  theme: ThemeData;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<ThemeData>(LightTheme);
  function toggleTheme() {
    setTheme(th => (th.isDark ? LightTheme : DarkTheme));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
