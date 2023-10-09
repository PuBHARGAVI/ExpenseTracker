/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Home} from './screens/Home';
import {Budget} from './screens/Budget';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AddNewBudget} from './screens/AddNewBudget';
import {AddNewExpense} from './screens/AddNewExpense';
import {ViewAllBudgets} from './screens/ViewAllBudgets';
import {themeColors, fontFamily} from './Theme';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {Expense} from './screens/Expense';
import {ViewAllExpenses} from './screens/ViewAllExpenses';
import {useLoginScreen} from './screens/LoginController';
import {__AuthenticationToken, __DeviceId} from './shared/GlobalVariables';
import {apiRequest} from './utils/requestApi';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() == 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const controller = useLoginScreen();

  const handleLogout = () => {
    controller.LOGOUT();
  };

  const [tokenList, setTokenList] = useState([]);
  const checkTokenExpiry = async (token: string) => {
    const header = {
      Accept: 'application/json',
      Authorization: token,
    };

    const response = await apiRequest('GET', header, '', 'tokenExpiry');
    setTokenList(response.status);
  };

  const checkLoginStatus = async () => {
    const header = {
      Accept: 'application/json',
      Authorization: __AuthenticationToken.getToken(),
    };

    const queryParams = `deviceId=${__DeviceId.deviceId}`;

    const response = await apiRequest(
      'GET',
      header,
      '',
      'tokenList',
      queryParams,
    );
    const tokenList = response.status;
    setTokenList(tokenList)
    if (tokenList.length > 0) {
      __AuthenticationToken.setToken(tokenList[0])
      checkTokenExpiry(tokenList[0]);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    console.log("after%%%")
  }, [__DeviceId.deviceId]);

  const initialRouteName = tokenList.length === 0 ? 'Login' : 'Home';
  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={({route}) => ({
            // headerRight: () =>
            //   route.name !== 'Login' ? (
            //     <TouchableOpacity onPress={handleLogout}>
            //       <Text
            //         style={{color: 'red', textAlign: 'right', fontSize: 18}}>
            //         Logout
            //       </Text>
            //     </TouchableOpacity>
            //   ) : null,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: themeColors.dodgerblue,
              fontFamily: fontFamily,
              fontWeight: 'bold',
            },
          })}>
          {initialRouteName !== 'Home' && (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Login'}}
            />
          )}
          {initialRouteName !== 'Home' && (
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{title: 'Signup'}}
            />
          )}
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
            name="ViewAllBudgets"
            component={ViewAllBudgets}
            options={{
              title: 'View All Budgets',
            }}
          />
          <Stack.Screen
            name="Expenses"
            component={Expense}
            options={{title: 'Expenses'}}
          />
          <Stack.Screen
            name="AddNewExpense"
            component={AddNewExpense}
            options={{title: 'Add New Expense'}}
          />
          <Stack.Screen
            name="ViewAllExpenses"
            component={ViewAllExpenses}
            options={{
              title: 'View All Expenses',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
