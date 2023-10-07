import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme, themeColors} from '../Theme';

export const Expense = ({navigation}) => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={theme.addNewBudgetStyles.pressableView}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: themeColors.lightseagreen,
            },
            theme.addNewBudgetStyles.pressable,
          ]}
          onPress={() => navigation.navigate('AddNewExpense')}>
          <Text style={theme.styles.title}>Add New Expense</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: themeColors.lightseagreen,
            },
            theme.addNewBudgetStyles.pressable,
          ]}
          onPress={() => navigation.navigate('ViewAllExpenses')}>
          <Text style={theme.styles.title}>View All Expenses</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};
