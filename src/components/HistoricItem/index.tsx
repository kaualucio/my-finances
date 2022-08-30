import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'
import { Diamond } from 'phosphor-react-native'

interface Item {
  id: string,
  title: string,
  value: number,
  date: string
}

interface HistoricItemProps {
  item: Item
}

export function HistoricItem({item}: HistoricItemProps) {
  return (
    <View style={styles.container}>
      <Diamond size={18} weight="fill" color={item.title === 'Receita' ? THEME.colors.secondary.blue : THEME.colors.secondary.yellow } />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View>
        <Text style={styles.value}>R${item.value},00</Text>
      </View>
    </View>
  )
}