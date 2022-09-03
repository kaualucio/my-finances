import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: 120,
  },
  graphic: {
    height: 210,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  monthContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthText: {
    fontSize: 11,
    color: THEME.colors.gray[500]
  }
})