import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'
import { Diamond } from 'phosphor-react-native'

interface BalanceProps {
  title: string,
  value: number
}

export function Balance({title, value}: BalanceProps) {
  return (
    <View style={styles.container}>
      <Diamond size={18} weight="fill" color={title === 'Receita' ? THEME.colors.secondary.blue : THEME.colors.secondary.yellow } />
      <View style={{marginLeft: 10}}>
        <Text style={styles.title}>{title}</Text>
          <View>
            <Text style={styles.value}>R${value},00</Text>
          </View>
      </View>
    </View>
  )
}