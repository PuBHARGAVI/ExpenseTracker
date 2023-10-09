import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../Theme';
import {LabeledInputField} from '../components/LabeledInputField';
import {useLoginScreen} from './LoginController';
import { __AuthenticationToken } from '../shared/GlobalVariables';

export const Login = ({navigation}) => {
  const controller = useLoginScreen();
  const addEmail = email => {
    controller.ADD_EMAIL(email);
  };
  const addPassword = password => controller.ADD_PASSWORD(password);

  const handleSubmit = () => {
    controller.SUBMIT();
  };

  const handleOnPress = () => {
    navigation.navigate('Signup');
  };

  if (controller.loginStatus === 'success') {
    __AuthenticationToken.setToken(controller.authToken);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.styles.linearGradient}>
      <View>
        <LabeledInputField
          label="Email"
          value={controller.email}
          onChange={addEmail}
          placeholder="Enter the Email"
          keyboardType="email-address"
        />
        <LabeledInputField
          label="Password"
          value={controller.password}
          onChange={addPassword}
          placeholder="Enter the Password"
          type="current-password"
        />
      </View>
      {controller.loginStatus !== 'success' && (
        <Text style={{color: '#B00020', textAlign: 'center', margin: 10}}>
          {controller.loginStatus}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>{"Don't have an account?"}</Text>

        <Pressable onPress={() => handleOnPress()}>
          <Text style={{color: 'blue', marginLeft: 5}}>Create it now</Text>
        </Pressable>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </LinearGradient>
  );
};
