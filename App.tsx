
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'

import { THEME } from './src/global/styles/theme';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Routes } from './src/routes';
import { db } from './src/databases/sqlite';
import { WalletContextProvider } from './src/context/WalletsContext';

SplashScreen.preventAutoHideAsync()

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold 
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
       
        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS wallets (id varchar(255) primary key not null, name varchar(255) not null, description varchar(255), created_at datetime, updated_at datetime);",
            [],
          );
        });


      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  
  if (!appIsReady) {
    return null;
  }

  if(!fontsLoaded) return <Text>Carregando Fontes</Text>

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar 
        style="auto" 
        backgroundColor={THEME.colors.white} 
      />
      <WalletContextProvider>
        <Routes />
      </WalletContextProvider>
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