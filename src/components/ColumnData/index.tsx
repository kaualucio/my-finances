import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'

interface ColumnDataProps {
  value: number,
  type: string
}

export function ColumnData({value, type}: ColumnDataProps) {
  return (
    <View style={[styles.column, {height: value / 200  * 10, backgroundColor: type === 'Receita' ? THEME.colors.secondary.blue : THEME.colors.secondary.yellow}]}>
      <Text style={styles.value}>R${value}</Text>
    </View>
  )
}