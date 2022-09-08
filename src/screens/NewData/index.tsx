import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Alert, SafeAreaView } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'

import Income from '../../databases/sqlite/services/Income'
import { useWallet } from '../../context/WalletsContext'

import { THEME } from '../../global/styles/theme'
import { styles } from './styles'

import { formatPriceValue } from '../../utils/formatPriceValue'
import { CheckCircle } from 'phosphor-react-native'
import { ScrollView } from 'react-native'
import Spending from '../../databases/sqlite/services/Spending'

export default function NewData() {
  const { allMyWallets, handleRefetchHistory, currentWallet } = useWallet()
  const [data, setData] = useState({
    name: '',
    description: '',
  })
  const [selectedWallet, setSelectedWallet] = useState('Selecione a carteira')
  const [value, setValue] = useState('')
  const [type, setType] = useState('Selecione o tipo')
  const [isLoading, setIsLoading] = useState(false)
   
  async function handleCreateIncome() {
    try {
      setIsLoading(true)

      if(!currentWallet) {
        return Alert.alert('Erro', 'Crie uma carteira para poder inserir dados')
      }

      let selectedWalletId = handleSelectWalletByName(selectedWallet)
      
      if(!data.name || !value) {
        return Alert.alert('Campos Inválidos :(', 'Os campos marcados com (*) são obrigatórios, preencha-os para')
      }
      
      if(!selectedWalletId) {
        return Alert.alert('Carteira Inválida :(', 'Selecione uma carteira válida para continuar')
      }

      if(type === 'Receita') {
        await Income.create({...data, value: formatPriceValue(value), walletId: selectedWalletId})
      }else {
        await Spending.create({...data, value: formatPriceValue(value), walletId: selectedWalletId})
      }
      handleRefetchHistory()
      setData({
        name: '', 
        description: '',
      })
      setType('Selecione o tipo'),
      setValue('')
      setSelectedWallet('Selecione a carteira')
      Alert.alert('Sucesso!', `Sua ${type.toLowerCase()} foi adicionada com sucesso com sucesso!`)
     
    } catch (error) {
      console.log(error)
      Alert.alert('Algo deu errado :(', `Ocorreu um erro ao adicionar sua ${type.toLowerCase()}, tente novamente`)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectWalletByName(value: string) {
    return allMyWallets.find(wallet => wallet.name === value).id
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation title="Novo dado" handleFunction={handleCreateIncome} icon={<CheckCircle size={28} color={"#32bd50"} />}  isLoading={isLoading}  />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding': 'height'}
          keyboardVerticalOffset={10}
          style={styles.form}
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
            <FormLabel label="Título*" />
            <Input keyboardType="default" value={data.name} onChangeText={value => setData(prevState => ({...prevState, name: value}))} />
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
              onChange={(option)=> setSelectedWallet(option.label)} 
            />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Tipo*" />
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
              data={[
                { key: 'income', label: 'Receita' },
                { key: 'spending', label: 'Despesa' },
              ]}
              initValue={type}
              onChange={(option)=> setType(option.label)} 
            />
          </View>
          
          <View style={styles.formField}>
            <FormLabel label="Valor R$*" />
            <Input keyboardType="numeric" value={value} onChangeText={value => setValue(value)} />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição" />
            <Input textArea multiline keyboardType="default"  value={data.description} onChangeText={value =>  setData(prevState => ({...prevState, description: value}))}  />
          </View>
          {/* <ButtonWithoutIcon isLoading={isLoading} handleFunction={handleCreateIncome} title="Adicionar receita" /> */}
          </ScrollView>
         
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </SafeAreaView>
  )
}