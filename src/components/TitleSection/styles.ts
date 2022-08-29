import { THEME } from '../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    position: 'relative',
    top: 2,
    fontSize: 20,
    fontFamily: THEME.fonts.title500,
    color: THEME.colors.black
  }
})