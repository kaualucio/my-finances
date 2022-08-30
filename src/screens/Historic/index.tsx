import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { HistoricItem } from '../../components/HistoricItem'
import { TitleSection } from '../../components/TitleSection'
import { THEME } from '../../global/styles/theme'
import { styles } from './styles'

const items = [
  {
    id: '123',
    title: 'Compras do mês',
    date: '27/08/2022',
    value: 800
  },
  {
    id: '456',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '789',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '489',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '7989',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '7619',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
  {
    id: '7892',
    title: 'Gasolina do carro',
    date: '28/08/2022',
    value: 100
  },
]

export default function Historic() {
  const [filterSelected, setFilterSelected] = useState('all')

  function handleChangeFilter(filter: string) {
    filterSelected === filter ? setFilterSelected('all') : setFilterSelected(filter)
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation title="Histórico" />
      <View style={{ flex: 1, paddingHorizontal: 20}}>
        <View style={styles.filter}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={() => handleChangeFilter('income')} 
            style={[styles.buttonFilter, {borderWidth: filterSelected === 'income' ? 1 : 0, borderColor: filterSelected === 'income' ? THEME.colors.secondary.blue : THEME.colors.primary[600]}]}
          >
            <Text 
              style={[styles.buttonFilterText, { color: filterSelected === 'income' ? THEME.colors.secondary.blue : THEME.colors.white }]}
            >Receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={1}
            onPress={() => handleChangeFilter('spend')} 
            style={[styles.buttonFilter, {borderWidth: filterSelected === 'spend' ? 1 : 0, borderColor: filterSelected === 'spend' ? THEME.colors.secondary.yellow : THEME.colors.primary[600]}]}
          >
            <Text 
              style={[styles.buttonFilterText, { color: filterSelected === 'spend' ? THEME.colors.secondary.yellow : THEME.colors.white }]}
            >
              Despesas</Text>
          </TouchableOpacity>
        </View>
        <TitleSection title={filterSelected === 'all' ? 'Todos' : filterSelected === 'income' ? 'Receitas' : 'Despesas'} />
        <ScrollView
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        >
          {
              items.map(item => (
                <HistoricItem key={item.id} item={item} />
              ))
            }
        </ScrollView>
      </View>
    </View>
  )
}