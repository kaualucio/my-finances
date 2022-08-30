import { View, Text } from 'react-native'
import React, { forwardRef } from 'react'
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { Coins, HeartBreak, MinusCircle, Wallet } from 'phosphor-react-native';
import { THEME } from '../../global/styles/theme';

interface ModalMenuProps {
  handleGoToScreen: (screen: any) => void
}

export const ModalMenu = forwardRef(({handleGoToScreen}: ModalMenuProps, ref: any) => {
  return (
      <Modalize 
      ref={ref}
      snapPoint={250}
      modalHeight={250}
      modalStyle={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: THEME.colors.primary[600]
      }}
    >
      <ButtonWithIcon onPress={() => handleGoToScreen('NewWallet')} icon={<Wallet size={28} color={THEME.colors.white} />} title="Adicionar nova carteira" />
      <ButtonWithIcon onPress={() => handleGoToScreen('NewIncome')} icon={<Coins size={28} color={THEME.colors.white} />} title="Adicionar nova receita" />
      <ButtonWithIcon onPress={() => handleGoToScreen('NewSpending')} icon={<HeartBreak size={28} color={THEME.colors.white} />} title="Adicionar nova despesa" />
    </Modalize>
  )
})