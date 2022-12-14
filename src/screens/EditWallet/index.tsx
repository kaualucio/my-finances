import { View, KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import Wallet from '../../databases/sqlite/services/Wallet'
import { useWallet } from '../../context/WalletsContext'
import { useRoute } from '@react-navigation/native'
import { CheckCircle } from 'phosphor-react-native'

export default function EditWallet() {
  const { handleRefetchData } = useWallet()
  const { params } = useRoute()
  const [isLoading, setIsLoading] = useState(false)
  const [walletData, setWalletData] = useState({
    name: params.wallet.name,
    minIncome: params.wallet.minIncome ? params.wallet.minIncome : '',
    maxSpend: params.wallet.maxSpend ? params.wallet.maxSpend : '',
    description: params.wallet.description ? params.wallet.description : '',
  })

  async function handleEditWallet() {
    try {
      setIsLoading(true)

      await Wallet.update(walletData, params.wallet.id)
      handleRefetchData()
      Alert.alert('Sucesso!', 'Sua carteira foi editada com sucesso!')
    } catch (error) {
      Alert.alert('Algo deu errado :(!', 'Ocorreu um erro ao editar sua carteira, tente novamente')
    }finally {
      setIsLoading(false)
    }
   
  }


  return (
    <View style={styles.container}>
      <HeaderNavigation title="Editar Carteira" handleFunction={handleEditWallet} icon={<CheckCircle size={28} color={"#32bd50"} />}  isLoading={isLoading}/>
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView 
        style={styles.form}
        behavior={Platform.OS === 'ios'? 'padding': 'height'}
        keyboardVerticalOffset={10}  
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={{paddingBottom: 30}}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={false}
        >
          <View style={styles.formField}>
            <FormLabel label="Nome da carteira*" />
            <Input keyboardType="default" value={walletData.name} onChangeText={(value) => setWalletData(prevState => ({...prevState, name: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Receita M??nima" />
            <Input keyboardType="numeric" value={walletData.minIncome} onChangeText={(value) => setWalletData(prevState => ({...prevState, minIncome: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Despesa M??xima" />
            <Input keyboardType="numeric" value={walletData.maxSpend} onChangeText={(value) => setWalletData(prevState => ({...prevState, maxSpend: value}))} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descri????o da carteira" />
            <Input textArea multiline keyboardType="default" value={walletData.description} onChangeText={(value) => setWalletData(prevState => ({...prevState, description: value}))} />
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}