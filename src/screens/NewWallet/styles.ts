import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  formField: {
    zIndex: 0,
    marginBottom: 15
  },
  button: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20 
  }
})