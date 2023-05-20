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
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() == 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Pressable style={styles.pressableContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgreen', false)}
          onPress={() => navigation.navigate('Budget')}>
          <View style={styles.box}>
            <Text style={styles.title}>Budgets</Text>
          </View>
        </TouchableNativeFeedback>
      </Pressable>
      <Pressable style={styles.pressableContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgreen', false)}
          onPress={() => navigation.navigate('Expense')}>
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
    backgroundColor: 'white',
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
