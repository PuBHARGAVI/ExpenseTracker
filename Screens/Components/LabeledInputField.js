import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {theme} from '../../Theme';

export const LabeledInputField = props => {
  return (
    <View style={theme.styles.view}>
      <Text style={theme.styles.label}>{props.label}</Text>
      <Text style={theme.styles.colon}>:</Text>
      <TextInput
        style={[
          theme.styles.input,
          {
            flex: 0.6,
          },
        ]}
        keyboardType="numeric"
        placeholder={props.placeholder}
        placeholderTextColor="#696969"
        value={props.budgetAmount}
        autoFocus={true}
        onChangeText={text => props.handleBudgetInput(text)}
      />
    </View>
  );
};
