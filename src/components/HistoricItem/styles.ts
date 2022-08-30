import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: THEME.colors.primary[500]
  },
  title: {
    color: THEME.colors.white,
    fontFamily: THEME.fonts.title500,
    fontSize: 16
  },
  date: {
    fontSize: 12,
    fontFamily: THEME.fonts.text400,
    color: THEME.colors.gray[200]
  },
  value: {
    fontSize: 16,
    color: THEME.colors.white,
    fontFamily: THEME.fonts.title500
  }
})