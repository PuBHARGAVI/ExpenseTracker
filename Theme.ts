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
  }),
  viewAllBudgetStyles: StyleSheet.create({
    linearGradientContainer: {
      flex: 1,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      borderRadius: 10,
      padding: 10,
    },
    touchableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'darkgray',
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
    },
    headerText: {
      flex: 0.3,
      textAlign: 'center',
      color: 'grey',
      fontWeight: 'bold',
      fontSize: 20,
    },
    touchableText: {
      flex: 0.3,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
    },
  }),
  addNewExpenseStyles: StyleSheet.create({
    linearGradientContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    pickerView: {
      width: '100%',
      borderWidth: 1,
      borderColor: themeColors.dodgerblue,
      borderRadius: 15,

    },
    budgetView: {
      marginTop: 15,
    },
    labelView: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
      alignItems: 'flex-start'

    },
    label: {
      color: themeColors.black,
      fontWeight: '500',
      fontSize: 17,
      flex: 0.3,
    },
    picker: {
      margin: 1,
    }
  })
}