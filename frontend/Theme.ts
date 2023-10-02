import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const themeColors = {
  dodgerblue: '#1e90ff',
  dimgray: '#696969',
  black: '#000000',
  white: '#ffffff',
  lightseagreen: '#20b2aa',
  lightgrey: '#d3d3d3',
  lightOrange: '#f0ad4e'
}

export const fontFamily = (Platform.OS == "android") ? 'sans-serif-light' : 'System';

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
      fontWeight: 'bold',
      fontSize: 17,
      color: themeColors.black,
      flex: 0.1,
      fontFamily: fontFamily
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
      fontWeight: 'bold',
      fontSize: 17,
      flex: 0.3,
      fontFamily: fontFamily
    },
    overlay: {
      elevation: 5,
      backgroundColor: themeColors.white,
      borderRadius: 10,
      width: '90%',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      justifyContent: 'space-between'
    },
    overlayText: {
      color: themeColors.black,
      fontSize: 18,
      fontWeight: '400',
      fontFamily: fontFamily,
    },
    warningLabel: {
      color: themeColors.lightOrange,
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: fontFamily,
    },
    warningText: {
      color: themeColors.black,
      fontSize: 18,
      fontFamily: fontFamily,
    },
    warningContainer: {
      alignItems: 'flex-start'
    },
    pressableView: {
      margin: 10,
      marginTop: 30,
      width: '95%',
      height: '100%',
    },
    pressable: {
      height: 100,
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
      fontFamily: fontFamily
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
      backgroundColor: themeColors.lightgrey,
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
    },
    headerText: {
      flex: 0.3,
      textAlign: 'center',
      color: themeColors.lightseagreen,
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: fontFamily
    },
    touchableText: {
      flex: 0.3,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      fontFamily: fontFamily
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
      fontWeight: 'bold',
      fontFamily: fontFamily,
      fontSize: 17,
      flex: 0.3,
    },
    picker: {
      margin: 1,
    }
  }),
  addNewBudgetStyles: StyleSheet.create({
    pressableView: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      margin: 10,
      marginTop: 30,
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
    }
  })
}