import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export const Home = ({navigation}) => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.viewContainer}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: pressed ? '#000080' : '#1e90ff',
            },
            styles.pressableContainer,
          ]}
          onPress={() => navigation.navigate('Budget')}>
          <Text style={styles.title}>Budgets</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: pressed ? '#000080' : '#1e90ff',
            },
            styles.pressableContainer,
          ]}
          onPress={() => navigation.navigate('Expense')}>
          <Text style={styles.title}>Expenses</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: 10,
    marginTop: 30,
    width: '100%',
    height: '100%',
  },
  pressableContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: 'green',
    shadowOffset: {width: 0, height: 10},
    elevation: 4,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
