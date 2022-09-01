import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Text, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import ModalSelector from 'react-native-modal-selector'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'
import { THEME } from '../../global/styles/theme'
import { useWallet } from '../../context/WalletsContext'
import Spending from '../../databases/sqlite/services/Spending'
import { useSpending } from '../../context/SpendingContext'
import { formatPriceValue } from '../../utils/formatPriceValue'

export default function NewSpending() {
  const { allMyWallets, handleRefetchHistory } = useWallet()
  const { handleRefetchDataSpending } = useSpending()

  const [selectedWallet, setSelectedWallet] = useState('Selecione a carteira')
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
   
  async function handleCreateSpending() {
    try {
      let selectedWalletId = handleSelectWalletByName(selectedWallet)
      
      if(!name || !value) {
        return Alert.alert('Campos Inválidos :(', 'Os campos marcados com (*) são obrigatórios, preencha-os para')
      }
      
      if(!selectedWalletId) {
        return Alert.alert('Carteira Inválida :(', 'Selecione uma carteira válida para continuar')
      }


      await Spending.create({name, value: formatPriceValue(value), walletId: selectedWalletId,  description})
      handleRefetchDataSpending()
      handleRefetchHistory()
      setName('')
      setSelectedWallet('Selecione a carteira')
      setValue('')
      setDescription('')
      Alert.alert('Sucesso!', 'Sua despesa foi adicionada com sucesso com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('Algo deu errado :(', 'Ocorreu um erro ao criar sua carteira, tente novamente')
    }
  }

  function handleSelectWalletByName(value: string) {
    let walletExists = allMyWallets.find(wallet => wallet.name === value)
    if(walletExists) {
      return walletExists.id
    }else {
      return false
    }
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Despesa" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "position"}
           keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={styles.form}>
          <View style={styles.formField}>
            <FormLabel label="Título da despesa*" />
            <Input value={name} onChangeText={value => setName(value)} keyboardType="default" />
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
            <Input value={value} onChangeText={value => setValue(value)} keyboardType="numeric" />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição" />
            <Input value={description} onChangeText={value => setDescription(value)} textArea multiline keyboardType="default" />
          </View>
          <View style={styles.button}>
            <ButtonWithoutIcon handleFunction={handleCreateSpending} title="Adicionar despesa" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}