import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { THEME } from '../../global/styles/theme'

export function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
    </View>
  )
}