import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'
import { Diamond } from 'phosphor-react-native'
import moment from 'moment'
import { formatPriceValue } from '../../utils/formatPriceValue'
import { TypeBudget, useWallet } from '../../context/WalletsContext'
import Animated, { Layout, SlideInRight, SlideOutLeft } from 'react-native-reanimated'


interface HistoricItemProps {
  item: TypeBudget
}

export function HistoricItem({item}: HistoricItemProps) {
  const { handleDeleteItem } = useWallet()

  return (
    <Animated.View 
      entering={SlideInRight.delay(130)}
      exiting={SlideOutLeft.delay(100)}
      layout={Layout.springify()}  
    >
     <TouchableOpacity
      delayLongPress={600}
      onLongPress={() => handleDeleteItem(item.type, item.id)}
      activeOpacity={0.8} 
      style={styles.container}>
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
    </TouchableOpacity>
    </Animated.View>
  )
}