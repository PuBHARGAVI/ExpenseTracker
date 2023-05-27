import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../Theme';

export const Home = ({navigation}) => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={theme.styles.pressableView}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: pressed ? '#000080' : '#1e90ff',
            },
            theme.styles.pressable,
          ]}
          onPress={() => navigation.navigate('Budgets')}>
          <Text style={theme.styles.title}>Budgets</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: pressed ? '#000080' : '#1e90ff',
            },
            theme.styles.pressable,
          ]}
          onPress={() => navigation.navigate('Expense')}>
          <Text style={theme.styles.title}>Expenses</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};
