import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontFamily: THEME.fonts.title500,
    color: THEME.colors.primary[600],
    fontSize: 18,
    marginBottom: 5
  },
})