import { StyleSheet } from "react-native";

export const themeColors = {
  dodgerblue: '#1e90ff',
  dimgray: '#696969',
  black: '#000000',
}

export const theme = {
  styles: StyleSheet.create({
    linearGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    input: {
      borderBottomColor: themeColors.dodgerblue,
      borderBottomWidth: 1,
      color: themeColors.dimgray,
    },
    colon: {
      fontWeight: '500',
      fontSize: 17,
      color: themeColors.black,
      flex: 0.1,
    },
    pressable: {
      flex: 0.6,
    },
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      justifyContent: 'space-evenly',
      width: '80%',
    },
    label: {
      color: themeColors.black,
      fontWeight: '500',
      fontSize: 17,
      flex: 0.3,
    },
  }),
  colors: {

  }
}