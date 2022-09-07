import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import Historic from '../screens/Historic';
import NewWallet from '../screens/NewWallet';
import NewSpending from '../screens/NewSpending';
import AllMyWallets from '../screens/AllMyWallets';
import EditWallet from '../screens/EditWallet';
import NewData from '../screens/NewData';
const { Navigator, Screen } = createNativeStackNavigator()
export const AppRoutes = () => {

  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Historic" component={Historic} />
      <Screen name="AllMyWallets" component={AllMyWallets} />
      <Screen name="NewWallet" component={NewWallet} />
      <Screen name="NewData" component={NewData} />
      <Screen name="EditWallet" component={EditWallet} />
    </Navigator>
  )

}