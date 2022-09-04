import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Animated, { FadeInUp, SlideInRight, SlideOutLeft } from 'react-native-reanimated'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { HistoricItem } from '../../components/HistoricItem'
import { TitleSection } from '../../components/TitleSection'
import { useWallet } from '../../context/WalletsContext'
import { THEME } from '../../global/styles/theme'
import { styles } from './styles'

export default function Historic() {
  const { allWalletHistory } = useWallet()
  const [filterSelected, setFilterSelected] = useState('all')
  let historic = filterSelected === 'all' 
                ? allWalletHistory 
                : filterSelected === 'income' 
                  ? allWalletHistory.filter(item => item.type === 'income')
                  : allWalletHistory.filter(item => item.type === 'spending')
  function handleChangeFilter(filter: string) {
    filterSelected === filter ? setFilterSelected('all') : setFilterSelected(filter)
  }

  useEffect(() => {
    historic = allWalletHistory.filter(item => item.type === filterSelected)
  }, [filterSelected])

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
            onPress={() => handleChangeFilter('spending')} 
            style={[styles.buttonFilter, {borderWidth: filterSelected === 'spending' ? 1 : 0, borderColor: filterSelected === 'spending' ? THEME.colors.secondary.yellow : THEME.colors.primary[600]}]}
          >
            <Text 
              style={[styles.buttonFilterText, { color: filterSelected === 'spending' ? THEME.colors.secondary.yellow : THEME.colors.white }]}
            >
              Despesas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleSection}>
          <TitleSection title={filterSelected === 'all' ? 'Todos' : filterSelected === 'income' ? 'Receitas' : 'Despesas'} />
          <Text style={styles.warningText}>(Pressione e segure um item para deletar)</Text>
        </View>
        {
          historic.length > 0 ? (
            <Animated.ScrollView
              entering={FadeInUp}
              style={{marginTop: 20}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20
              }}
             
            >
              {
                  historic.map(item => (
                    <HistoricItem key={item.id} item={item} />
                  ))
                }
            </Animated.ScrollView>
          )
          : (
            <Animated.Text
              entering={SlideInRight} 
              exiting={SlideOutLeft} 
              style={{marginTop: 20, textAlign: 'center', fontSize: 13, color: THEME.colors.gray[500]}}
            >
                Oops! Parece que você ainda não dados na sua carteira!
            </Animated.Text>
          )
        }
        
      </View>
    </View>
  )
}