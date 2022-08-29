import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.primary[500],
    width: "49%",
    height: 90,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

elevation: 4
  },
  circle: {
    marginRight: 10,
    width: 14,
    height: 14,
    borderRadius: 9999,
  },
  containerInfo: {
    flexDirection: 'column'
  },
  title: {
    fontSize: 12,
    color: THEME.colors.primary[400],
    fontFamily: THEME.fonts.text400
  },
  value: {
    fontSize: 18,
    fontFamily: THEME.fonts.title500,
    color: THEME.colors.white
  } 
})