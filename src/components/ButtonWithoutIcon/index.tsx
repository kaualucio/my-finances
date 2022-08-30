import { Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { styles } from './styles'

type ButtonWithoutIcon = TouchableOpacityProps & {
  title: string
}

export function ButtonWithoutIcon({ title, ...rest}: ButtonWithoutIcon) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}