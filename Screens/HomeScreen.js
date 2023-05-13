import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  statusBarStyle,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={statusBarStyle} hidden={true} />
      <Pressable style={styles.pressableContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgreen', false)}>
          <View style={styles.box}>
            <Text style={styles.title}>Budgets</Text>
          </View>
        </TouchableNativeFeedback>
      </Pressable>
      <Pressable style={styles.pressableContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgreen', false)}>
          <View style={styles.box}>
            <Text style={styles.title}>Expenses</Text>
          </View>
        </TouchableNativeFeedback>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    flex: 1,
  },
  pressableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 23,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleEffectStyles: {
    color: 'red',
    radius: 15,
    borderless: false,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
