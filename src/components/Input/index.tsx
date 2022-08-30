import { TextInput, TextInputProps } from 'react-native'
import React from 'react'
import { styles } from './styles'

type InputProps = TextInputProps & {
  textArea?: boolean
}
export function Input({textArea = false, ...rest}: InputProps) {
  return (
    <TextInput
      textAlignVertical={textArea ? 'top' : 'center'}
      style={[styles.input, { height: textArea ? 100 : 50, paddingTop: textArea ? 10 : 0 },]}
      {...rest}
    />
  )
}