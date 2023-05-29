/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Home} from './screens/Home';
import {Budget} from './screens/Budget';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AddNewBudget} from './screens/AddNewBudget';
import {AddNewExpense} from './screens/AddNewExpense';
import {ViewAllBudgets} from './screens/ViewAllBudgets';
import {themeColors, fontFamily} from './Theme';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() == 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: themeColors.dodgerblue,
              fontFamily: fontFamily,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Budget & Expenses Tracker'}}
          />
          <Stack.Screen
            name="Budgets"
            component={Budget}
            options={{title: 'Budgets'}}
          />
          <Stack.Screen
            name="AddNewBudget"
            component={AddNewBudget}
            options={{title: 'Add New Budget'}}
          />
          <Stack.Screen
            name="Expense"
            component={AddNewExpense}
            options={{title: 'Add a new Expense'}}
          />
          <Stack.Screen
            name="ViewAllBudgets"
            component={ViewAllBudgets}
            options={{
              title: 'View All Budgets',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
