import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'
import { Diamond } from 'phosphor-react-native'
import { Income } from '../../context/IncomeContext'
import { Spending } from '../../context/SpendingContext'
import moment from 'moment'
import { formatPriceValue } from '../../utils/formatPriceValue'


interface HistoricItemProps {
  item: Income | Spending
}

export function HistoricItem({item}: HistoricItemProps) {
  

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <Diamond size={18} weight="fill" color={item.type === 'income' ? THEME.colors.secondary.blue : THEME.colors.secondary.yellow } />
        <View style={{marginLeft: 20}}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.date}>{moment(new Date(item.created_at)).format("DD/MM/YYYY")}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.value}>R${formatPriceValue(String(item.value)).replace('.', ',')}</Text>
      </View>
    </View>
  )
}