import { THEME } from '../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  
  form: {
    justifyContent: "space-evenly",
    flex: 1,
    paddingHorizontal: 20,
  },
 
  formField: {
    zIndex: 0,
    marginBottom: 15
  },
  //PICKER COMPONENT
  cancelStyle: {
    backgroundColor: THEME.colors.primary[600],
    paddingVertical: 10
  },
  cancelContainerStyle: {
    borderRadius: 5,
  },
  cancelTextStyle: {
    color: THEME.colors.white,
    textTransform: "uppercase"
  },
  selectOption: {
    paddingVertical: 15
  },
  optionTextStyle: {
    color: THEME.colors.primary[500],
    fontFamily: THEME.fonts.title500,
    textTransform: "uppercase"
  },
  optionContainerStyle: {
    backgroundColor: THEME.colors.white
  }
})