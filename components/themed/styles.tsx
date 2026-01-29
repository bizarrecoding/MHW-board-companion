import { StyleSheet } from "react-native";

const cardColor = '#8883';
const cardBorderColor = '#8884';
// const cardColorLight = '#dadada';
// const cardColorDark = '#1B1B1B';
// const cardBorderColorDark = '#383838';

export const commonStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  row: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  card: {
    padding: 12,
    backgroundColor: cardColor,
    borderColor: cardBorderColor,
    borderWidth: 1,
    borderRadius: 16, 
  }, 
  shadows: {
    elevation: 10,
    shadowColor: "#000A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  webCenter: {
    justifyContent: "center",
    margin: "auto"
  }
});