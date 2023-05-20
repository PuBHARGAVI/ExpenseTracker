/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {HomeScreen} from './android/Screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddNewBudget} from './android/Screens/AddNewBudget';
import {AddNewExpense} from './android/Screens/AddNewExpense';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
          navigationBarColor: 'white',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Budget"
          component={AddNewBudget}
          options={{title: 'Add a new Budget'}}
        />
        <Stack.Screen
          name="Expense"
          component={AddNewExpense}
          options={{title: 'Add a new Expense'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
