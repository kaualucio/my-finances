import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'

type ButtonWithoutIcon = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  handleFunction?: any
}

export function ButtonWithoutIcon({ title, isLoading = false, handleFunction, ...rest}: ButtonWithoutIcon) {
  return (
    <TouchableOpacity 
      disabled={isLoading} 
      onPress={() => handleFunction()} 
      activeOpacity={0.8} 
      style={[styles.button, { opacity: isLoading ? 0.8 : 1 }]} 
      {...rest}>
      {
        !isLoading 
        ? (
          <Text style={styles.title}>{title}</Text>
        ) 
        : <ActivityIndicator size="small" color={THEME.colors.primary[500]} />
      }
    </TouchableOpacity>
  )
}