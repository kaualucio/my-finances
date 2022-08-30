import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 5,
    backgroundColor: THEME.colors.white,
    marginBottom: 15,
    borderBottomColor: THEME.colors.gray[200],
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    width: "100%",
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary[600]
  },
  title: {
    fontSize: 20,
    color: THEME.colors.black,
    fontFamily: THEME.fonts.title500
  },
  viewEmpty: {
    width: 50,
    height: 50,
  }
})