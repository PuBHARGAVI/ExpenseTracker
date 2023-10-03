import React from 'react';
import {Button, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../Theme';
import {LabeledInputField} from '../components/LabeledInputField';
import {__AuthenticationToken} from '../utils/globalVariables';
import {useSingupScreen} from './SignupController';

export const Signup = props => {
  const controller = useSingupScreen();

  const addEmail = email => controller.ADD_EMAIL(email);
  const addPassword = password => controller.ADD_PASSWORD(password);

  const handleSubmit = () => controller.SUBMIT();

  if (controller.signupStatus === 'success') {
    __AuthenticationToken.setToken(controller.authToken);
    props.navigation.navigate('Home');
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
      <Button title="Submit" onPress={handleSubmit} />
    </LinearGradient>
  );
};
