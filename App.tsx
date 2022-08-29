import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'

import { HomeScreen } from './src/screens/Home/index';
import { THEME } from './src/global/styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold 
  });

  if(!fontsLoaded) return <Text>Carregando Fontes</Text>

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: getStatusBarHeight(),
    backgroundColor: THEME.colors.white,
  },
});
