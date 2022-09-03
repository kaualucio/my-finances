import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  column: {
    width: 47,
    maxHeight: 180,
    borderRadius: 4,
    position: 'relative'
  },
  value: {
    position: 'absolute',
    top: -20,
    left: 7,
    fontSize: 11,
    color: THEME.colors.black
  }
})