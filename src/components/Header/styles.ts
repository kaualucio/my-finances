import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderBottomColor: THEME.colors.gray[200],
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    width: "100%",
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})