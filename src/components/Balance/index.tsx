import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'

interface BalanceProps {
  title: string,
  value: number
}

export function Balance({title, value}: BalanceProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: title === 'Receita' ? THEME.colors.secondary.blue : THEME.colors.secondary.yellow }]} />
      <View>
        <Text style={styles.title}>{title}</Text>
          <View>
            <Text style={styles.value}>R${value},00</Text>
          </View>
      </View>
    </View>
  )
}