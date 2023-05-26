import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {theme} from '../../Theme';

export const PressableLabeledInputField = props => {
  return (
    <View style={theme.styles.view}>
      <Text style={theme.styles.label}>{props.label}</Text>
      <Text style={theme.styles.colon}>:</Text>
      <Pressable
        style={theme.styles.pressable}
        onPress={() =>
          props.setStartDatePickerVisibility(!props.showStartDatePicker)
        }>
        <TextInput
          style={theme.styles.input}
          placeholder={props.placeholder}
          value={props.startDate}
          autoFocus={true}
          editable={false}
        />
      </Pressable>
    </View>
  );
};
