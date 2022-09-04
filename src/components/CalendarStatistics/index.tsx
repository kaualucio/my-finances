import { View, Text } from 'react-native'
import React from 'react'
import { ColumnData } from '../ColumnData'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'
import { useWallet } from '../../context/WalletsContext'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'

interface CalendarStatisticsProps {
  month: string
}

export function CalendarStatistics({month}: CalendarStatisticsProps) {
  const { handleSortDataStatistics } = useWallet()
  const sortedData = handleSortDataStatistics()
  let allIncomeByMonth = 0
  let allSpendingByMonth = 0
  sortedData.incomes.map(item => {
    if(item.date === month) {
      allIncomeByMonth += item.value
    }
  }) 

  sortedData.spendings.map(item => {
    if(item.date === month) {
      allSpendingByMonth += item.value
    }
  }) 
  

  return (
    <Animated.View 
      entering={SlideInRight.delay(130)}
      exiting={SlideOutLeft.duration(100)}  
      style={[styles.container, { borderRightWidth: month != 'Dez' ? 2 : 0, borderRightColor: month != 'Dez' ? THEME.colors.gray[200] : '' }]}>
      <View style={styles.graphic}>
        <ColumnData value={allIncomeByMonth} type="Receita" />
        <ColumnData value={allSpendingByMonth} type="Despesa" />
      </View>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{month}</Text>
      </View>
    </Animated.View>
  )
}