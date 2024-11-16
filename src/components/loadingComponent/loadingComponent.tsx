import {ActivityIndicator, SafeAreaView} from 'react-native';
import React, {FC, useContext} from 'react';
import {styles} from './styles';
import {ThemeContext} from '../../contexts/themeContext';

const LoadingComponent: FC = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={theme.primaryColor} />
    </SafeAreaView>
  );
};

export default LoadingComponent;
