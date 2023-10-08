import React from 'react';
import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme, themeColors } from '../Theme';

export const Home = ({navigation}) => {
  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {/* <MessageOverlay
        isVisible={logoutStatus !== 'success' && loginStatus !== ''}
        message={'Logout is failed'}
        onDismiss={handleOnDismiss}
      /> */}
      <View style={theme.styles.pressableView}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: themeColors.lightseagreen,
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
              backgroundColor: themeColors.lightseagreen,
            },
            theme.styles.pressable,
          ]}
          onPress={() => navigation.navigate('Expenses')}>
          <Text style={theme.styles.title}>Expenses</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};
