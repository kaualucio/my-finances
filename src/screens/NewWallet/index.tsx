import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import Wallet from '../../databases/sqlite/services/Wallet'
import { useWallet } from '../../context/WalletsContext'
import { CheckCircle } from 'phosphor-react-native'


export default function NewWallet() {
  const { handleRefetchData } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [walletData, setWalletData] = useState({
    name: '',
    minIncome: '',
    maxSpend: '',
    description: '',
  })

  async function handleCreateWallet() {
    try {
      if(!walletData.name) {
        return Alert.alert('Campos inválidos', 'Escolha um nome para sua carteira, para continuar')
      }
      setIsLoading(true)
      await Wallet.create(walletData)
      handleRefetchData()
      setWalletData({
        name: '',
        minIncome: '',
        maxSpend: '',
        description: '',
      })
      Alert.alert('Sucesso!', 'Sua carteira foi criada com sucesso!')
    } catch (error) {
      console.log()
      Alert.alert('Algo deu errado :(!', 'Ocorreu um erro ao criar sua carteira, tente novamente')
    }finally {
      setIsLoading(false)
    }
   
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Carteira" handleFunction={handleCreateWallet} icon={<CheckCircle size={28} color={"#32bd50"} />}  isLoading={isLoading} />
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView 
          style={styles.form}
          behavior={Platform.OS === 'ios'? 'padding': 'height'}
          keyboardVerticalOffset={10}  
        >
          <View style={styles.formField}>
            <FormLabel label="Nome da carteira*" />
            <Input keyboardType="default" value={walletData.name} onChangeText={(value) => setWalletData(prevState => ({...prevState, name: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Receita Mínima" />
            <Input keyboardType="numeric" value={walletData.minIncome} onChangeText={(value) => setWalletData(prevState => ({...prevState, minIncome: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Despesa Máxima" />
            <Input keyboardType="numeric" value={walletData.maxSpend} onChangeText={(value) => setWalletData(prevState => ({...prevState, maxSpend: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição da carteira" />
            <Input textArea multiline keyboardType="default" value={walletData.description} onChangeText={(value) => setWalletData(prevState => ({...prevState, description: value}))} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}