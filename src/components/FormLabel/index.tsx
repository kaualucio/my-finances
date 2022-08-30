import { Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface FormLabelProps {
  label: string
}

export function FormLabel({label}: FormLabelProps) {
  return (
   <Text style={styles.label}>{label}</Text>
  )
}