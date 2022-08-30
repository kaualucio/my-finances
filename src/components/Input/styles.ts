import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 17,
    fontFamily: THEME.fonts.text300,
    backgroundColor: THEME.colors.gray[200],
    color: THEME.colors.primary[600]
  },
})