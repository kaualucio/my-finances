
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import moment from 'moment';
import { Host } from 'react-native-portalize';

import { THEME } from './src/global/styles/theme';
import { Routes } from './src/routes';
import { db } from './src/databases/sqlite';
import { WalletContextProvider } from './src/context/WalletsContext';

SplashScreen.preventAutoHideAsync()
moment.updateLocale('br', {
  monthsShort : [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]
});


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
            "CREATE TABLE IF NOT EXISTS wallets (id varchar(255) primary key not null, name varchar(255) not null, minIncome varchar(255), maxSpend varchar(255), description varchar(255), created_at datetime, updated_at datetime);",
            [],
          );
        });

        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS incomes (id varchar(255) primary key not null, name varchar(255) not null, walletId varchar(255) not null, value number not null, type varchar(10), description varchar(255), created_at datetime, updated_at datetime, CONSTRAINT fk_walletId FOREIGN KEY (walletId) REFERENCES wallets (id) ON DELETE CASCADE);",
            [],
          );
        });

        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS spendings (id varchar(255) primary key not null, name varchar(255) not null, walletId varchar(255) not null, value number not null, type varchar(10), description varchar(255), created_at datetime, updated_at datetime, CONSTRAINT fk_walletId FOREIGN KEY (walletId) REFERENCES wallets (id) ON DELETE CASCADE);",
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

  if(!fontsLoaded) return null

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar 
          style="auto" 
          backgroundColor={THEME.colors.white} 
          />
          <Host>
            <WalletContextProvider>
              <Routes />
            </WalletContextProvider>
          </Host>
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