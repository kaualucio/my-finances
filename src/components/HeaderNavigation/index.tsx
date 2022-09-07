import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, IconProps } from 'phosphor-react-native'
import React, { ReactElement } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'

interface HeaderNavigationProps {
  title: string,
  handleFunction?: any,
  isLoading?: boolean,
  icon?: ReactElement<IconProps>,
}

export function HeaderNavigation({title, handleFunction, isLoading, icon}: HeaderNavigationProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack} style={[styles.button, { opacity: isLoading ? 0.8 : 1 }]}>
        <ArrowLeft size={28} color="white"  />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {
        icon 
        ? (
          <TouchableOpacity activeOpacity={0.8} disabled={isLoading} onPress={handleFunction} style={styles.button}>
            {icon}
          </TouchableOpacity>
        )
        : <View style={styles.viewEmpty} />
      }
      
    </View>
  )
}