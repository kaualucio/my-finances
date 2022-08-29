import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary[600]
  }
})