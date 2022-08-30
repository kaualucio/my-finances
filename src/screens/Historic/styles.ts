import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    
  },
  filter: {
    marginBottom: 15,
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonFilter: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "49%",
    paddingVertical: 8,
    backgroundColor: THEME.colors.primary[600]
  },
  buttonFilterText: {
    textTransform: "uppercase",
    fontSize: 15,
    color: THEME.colors.white
  }
})