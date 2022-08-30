import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { styles } from './styles'

type ButtonIconProps = TouchableOpacityProps & {
  icon: ReactElement<IconProps>
}

export function ButtonAdd({icon, ...rest}: ButtonIconProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      {icon}
    </TouchableOpacity>
  )
}