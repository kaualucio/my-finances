import { Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { styles } from './styles'

type ButtonWithIconProps = TouchableOpacityProps & {
  icon: ReactElement<IconProps>,
  title: string,
}

export function ButtonWithIcon({icon, title, ...rest}: ButtonWithIconProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...rest}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}