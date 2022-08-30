import React, { forwardRef } from 'react'
import { Modalize } from 'react-native-modalize';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { Wallet } from 'phosphor-react-native';
import { THEME } from '../../global/styles/theme';

export const ModalWallets = forwardRef(({}, ref: any) => {
  return (
      <Modalize 
      ref={ref}
      snapPoint={500}
      modalHeight={400}
      modalStyle={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: THEME.colors.primary[600]
      }}
    >
      <ButtonWithIcon icon={<Wallet size={28} color={THEME.colors.white} />} title="Carteira 1" />
      <ButtonWithIcon icon={<Wallet size={28} color={THEME.colors.white} />} title="Carteira 2" />
      <ButtonWithIcon icon={<Wallet size={28} color={THEME.colors.white} />} title="Carteira 3" />
      <ButtonWithIcon icon={<Wallet size={28} color={THEME.colors.white} />} title="Carteira 4" />
    </Modalize>
  )
})