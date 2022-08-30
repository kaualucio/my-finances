import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { THEME } from '../../global/styles/theme'
import { styles } from './styles'

interface HeaderNavigationProps {
  title: string
}

export function HeaderNavigation({title}: HeaderNavigationProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.button}>
        <ArrowLeft size={28} color="white"  />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewEmpty} />
    </View>
  )
}