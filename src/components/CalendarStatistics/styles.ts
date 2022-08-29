import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    width: 100,
  },
  graphic: {
    height: 200,
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
    color: '#62676D'
  }
})