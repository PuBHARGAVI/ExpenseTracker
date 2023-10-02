import React from 'react';
import { Button, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../Theme';
import { LabeledInputField } from '../components/LabeledInputField';
import { useLoginScreen } from './LoginController';


export const Login = () => {
  const controller = useLoginScreen();

  const addEmail = email => controller.ADD_EMAIL(email);
  const addPassword = password => controller.ADD_PASSWORD(password);

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
            keyboardType="email"
          />
          <LabeledInputField
            label="Password"
            value={controller.password}
            onChange={addPassword}
            placeholder="Enter the Password"
            keyboardType="password"
          />
        </View>
        <Button title="Submit" onPress={controller.SUBMIT} />
      </LinearGradient>
  )
}
