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
  bg?: string
}

export function ButtonWithoutIcon({ title, isLoading = false, handleFunction, bg, ...rest}: ButtonWithoutIcon) {
  return (
    <TouchableOpacity 
      disabled={isLoading} 
      onPress={() => handleFunction()} 
      activeOpacity={0.8} 
      style={[styles.button, { opacity: isLoading ? 0.8 : 1, backgroundColor: bg ? bg : THEME.colors.primary[600] }]} 
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