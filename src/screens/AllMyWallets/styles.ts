import { THEME } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  buttonContainer: {
    position: 'relative',
    zIndex: 9,
    marginBottom: 15
  },
  button: {
    height: 80,
    paddingHorizontal: 15,
    borderRadius: 6,
    backgroundColor: THEME.colors.primary[500],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: THEME.fonts.title500,
    color: THEME.colors.white
  },
  date: {
    fontSize: 10,
    fontFamily: THEME.fonts.text400,
    color: THEME.colors.white
  },
  hiddenContent: {
    flexGrow: 1,
    minHeight: 150,
    maxHeight: 220,
    paddingVertical: 15,
    backgroundColor: THEME.colors.primary[400],
    paddingHorizontal: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    position: 'relative',
    top: -5,
  },
  dataInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataInfoTitle: {
    fontFamily: THEME.fonts.text300,
    color: THEME.colors.white,
    fontSize: 12
  },
  dataInfoText: {
    fontFamily: THEME.fonts.title500,
    color: THEME.colors.white,
    fontSize: 16
  },
  actionButtons: {
    marginTop: 15,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtonContainer: {
    width: "49%",
  }
})