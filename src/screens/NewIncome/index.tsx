import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import ModalSelector from 'react-native-modal-selector'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { Input } from '../../components/Input'
import { FormLabel } from '../../components/FormLabel'
import { styles } from './styles'
import { ButtonWithoutIcon } from '../../components/ButtonWithoutIcon'
import { THEME } from '../../global/styles/theme'

export default function NewIncome() {
  const [selectedWallet, setSelectedWallet] = useState('')
   let index = 0;
  return (
    <View style={styles.container}>
      <HeaderNavigation title="Nova Receita" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "position"}
           keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={styles.form}>
          <View style={styles.formField}>
            <FormLabel label="Título da receita*" />
            <Input keyboardType="default" />
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
              data={[
                { key: index++, label: 'Carteira 1'},
                { key: index++, label: 'Carteira 2'},
                { key: index++, label: 'Carteira 3'},
                { key: index++, label: 'Carteira 4'}
              ]}
              initValue="Selecione a carteira"
              onChange={(option)=> setSelectedWallet(option.label) } 
            />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Valor R$*" />
            <Input keyboardType="numeric" />
          </View>
          <View style={styles.formField}>
            <FormLabel label="Descrição" />
            <Input textArea multiline keyboardType="default" />
          </View>
          <View style={styles.button}>
            <ButtonWithoutIcon title="Adicionar receita" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback> 
    </View>
  )
}