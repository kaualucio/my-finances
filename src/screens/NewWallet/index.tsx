import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'

export default function NewWallet() {
  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Carteira" />
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView style={styles.form}>
          <FormLabel label="Nome da carteira" />
          <Input keyboardType="default" />
          <View style={styles.button}>
            <ButtonWithoutIcon title="Criar carteira" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}