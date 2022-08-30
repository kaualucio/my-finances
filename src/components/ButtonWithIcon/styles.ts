import { THEME } from '../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    // marginBottom: 10,
    width: "100%",
    height: 60,
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: THEME.colors.primary[600]
  },
  title: {
    fontSize: 15,
    fontFamily: THEME.fonts.text400,
    color: THEME.colors.white,
    marginLeft: 8
  }
})