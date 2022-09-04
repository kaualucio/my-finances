import React, { forwardRef } from 'react'
import { Modalize } from 'react-native-modalize';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { Wallet } from 'phosphor-react-native';
import { THEME } from '../../global/styles/theme';
import { useWallet, Wallet as WalletInterface } from '../../context/WalletsContext';
import { Portal } from 'react-native-portalize';

interface ModalWalletsProps {
  wallets: WalletInterface[]
}

export const ModalWallets = forwardRef(({wallets}: ModalWalletsProps, ref: any) => {
  const { handleChangeCurrentWallet } = useWallet()

  function handleChangeWallet(walletId: string) {
    handleChangeCurrentWallet(walletId)

  }

  return (
     <Portal>
       <Modalize 
          ref={ref}
          snapPoint={500}
          modalHeight={400}
          modalStyle={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: THEME.colors.primary[600]
          }}
          flatListProps={{
            data: wallets,
            renderItem: ({item}) => (
              <ButtonWithIcon onPress={() => handleChangeWallet(item.id)} key={item.id} icon={<Wallet size={28} color={THEME.colors.white} />} title={item.name} />
            ),
            keyExtractor: item => item.id,
            showsVerticalScrollIndicator: false,
          }}
        />
    </Portal>
     
  )
})