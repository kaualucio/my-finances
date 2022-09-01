import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Text, Platform, Alert } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'

import Income from '../../databases/sqlite/services/Income'
import { useWallet } from '../../context/WalletsContext'

import { THEME } from '../../global/styles/theme'
import { styles } from './styles'
import { useIncome } from '../../context/IncomeContext'
import { formatPriceValue } from '../../utils/formatPriceValue'

export default function NewIncome() {
  const { allMyWallets, handleRefetchHistory } = useWallet()
  const { handleRefetchDataIncome } = useIncome()
  const [selectedWallet, setSelectedWallet] = useState('Selecione a carteira')
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
   
  async function handleCreateIncome() {
    try {
      setIsLoading(true)
      let selectedWalletId = handleSelectWalletByName(selectedWallet)
      
      if(!name || !value) {
        return Alert.alert('Campos Inválidos :(', 'Os campos marcados com (*) são obrigatórios, preencha-os para')
      }
      
      if(!selectedWalletId) {
        return Alert.alert('Carteira Inválida :(', 'Selecione uma carteira válida para continuar')
      }

      await Income.create({name, value: formatPriceValue(value), walletId: selectedWalletId,  description})
      handleRefetchDataIncome()
      handleRefetchHistory()
      setName('')
      setSelectedWallet('Selecione a carteira')
      setValue('')
      setDescription('')
      Alert.alert('Sucesso!', 'Sua receita foi adicionada com sucesso com sucesso!')
     
    } catch (error) {
      Alert.alert('Algo deu errado :(', 'Ocorreu um erro ao criar sua carteira, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectWalletByName(value: string) {
    return allMyWallets.find(wallet => wallet.name === value).id
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Receita" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "height"}
           keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={styles.form}>
          <View style={styles.formField}>
            <FormLabel label="Título da receita*" />
            <Input keyboardType="default" value={name} onChangeText={value => setName(value)} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Carteira*" />
            <ModalSelector
              selectStyle={{
                paddingVertical: 14,
                borderColor: THEME.colors.gray[200],
                backgroundColor: THEME.colors.gray[200],
              }}
              initValueTextStyle={{
                color: THEME.colors.primary[600]
              }}
              
              optionContainerStyle={styles.optionContainerStyle}
              optionStyle={styles.selectOption}
              optionTextStyle={styles.optionTextStyle}
              cancelStyle={styles.cancelStyle}
              cancelContainerStyle={styles.cancelContainerStyle}
              cancelTextStyle={styles.cancelTextStyle}
              cancelText="Cancelar"  
              data={allMyWallets.map(wallet => { return { key: wallet.id, label: wallet.name } })}
              initValue={selectedWallet}
              onChange={(option)=> setSelectedWallet(option.label) } 
            />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Valor R$*" />
            <Input keyboardType="numeric" value={value} onChangeText={value => setValue(value)} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição" />
            <Input textArea multiline keyboardType="default"  value={description} onChangeText={value => setDescription(value)}  />
          </View>
          <ButtonWithoutIcon isLoading={isLoading} handleFunction={handleCreateIncome} title="Adicionar receita" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}