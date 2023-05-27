import { StyleSheet } from "react-native";

export const themeColors = {
  dodgerblue: '#1e90ff',
  dimgray: '#696969',
  black: '#000000',
  white: '#ffffff'
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
    pressableTextInput: {
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
    overlay: {
      elevation: 5,
      backgroundColor: themeColors.white,
      padding: 15,
    },
    overlayText: {
      color: themeColors.black
    },
    pressableView: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      margin: 10,
      marginTop: 30,
      width: '100%',
      height: '100%',
    },
    pressable: {
      width: 130,
      height: 200,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      shadowColor: 'green',
      shadowOffset: { width: 0, height: 10 },
      elevation: 4,
    },
    title: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    }
  })
}