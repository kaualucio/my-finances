import { View, Text } from 'react-native'
import React from 'react'
import { ColumnData } from '../ColumnData'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'

interface CalendarStatisticsProps {
  month: string
}

const months = {
  'Jan': {
    month: 'Jan',
    receita: 1000,
    despesa: 640
  },
  'Fev': {
    month: 'Fev',
    receita: 1200,
    despesa: 800
  }, 
  'Mar': {
    month: 'Mar',
    receita: 2000,
    despesa: 1000
  }, 
  'Abr': {
    month: 'Abr',
    receita: 2500,
    despesa: 800
  }
}

export function CalendarStatistics({month}: CalendarStatisticsProps) {
  return (
    <View style={[styles.container, { borderRightWidth: month != 'Dez' ? 2 : 0, borderRightColor: month != 'Dez' ? THEME.colors.gray[200] : '' }]}>
      <View style={styles.graphic}>
        <ColumnData value={months[`${month}`] ? months[`${month}`].receita : 500} type="Receita" />
        <ColumnData value={months[`${month}`] ? months[`${month}`].despesa : 500} type="Despesa" />
      </View>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{month}</Text>
      </View>
    </View>
  )
}