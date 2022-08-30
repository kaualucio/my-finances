import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'


import { THEME } from './src/global/styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Routes } from './src/routes';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';

 function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold 
  });

  if(!fontsLoaded) return <Text>Carregando Fontes</Text>

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar 
        style="auto" 
        backgroundColor={THEME.colors.white} 
      />
      <Routes />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: THEME.colors.white,
  },
});

export default gestureHandlerRootHOC(App)