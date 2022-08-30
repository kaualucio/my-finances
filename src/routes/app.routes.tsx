import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import Historic from '../screens/Historic';
import NewWallet from '../screens/NewWallet';
import NewIncome from '../screens/NewIncome';
import NewSpending from '../screens/NewSpending';
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
      <Screen name="NewWallet" component={NewWallet} />
      <Screen name="NewIncome" component={NewIncome} />
      <Screen name="NewSpending" component={NewSpending} />
    </Navigator>
  )

}