import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'
import Wallet from '../../databases/sqlite/services/Wallet'
import { useWallet } from '../../context/WalletsContext'
export default function NewWallet() {
  const { handleRefetchData } = useWallet()
  const [walletName, setWalletName] = useState('')
  const [walletDescription, setWalletDescription] = useState('')

  async function handleCreateWallet() {
    try {
      await Wallet.create({name: walletName})
      handleRefetchData()
      Alert.alert('Sucesso!', 'Sua carteira foi criada com sucesso!')
    } catch (error) {
      Alert.alert('Algo deu errado :(!', 'Ocorreu um erro ao criar sua carteira, tente novamente')
    }
   
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Carteira" />
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView style={styles.form}>
          <View style={styles.formField}>
            <FormLabel label="Nome da carteira*" />
            <Input keyboardType="default" value={walletName} onChangeText={(value) => setWalletName(value)} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição da carteira" />
            <Input textArea multiline keyboardType="default" value={walletDescription} onChangeText={(value) => setWalletDescription(value)} />
          </View>
          <View style={styles.button}>
            <ButtonWithoutIcon onPress={handleCreateWallet} title="Criar carteira" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}