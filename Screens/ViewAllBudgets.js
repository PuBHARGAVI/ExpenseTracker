import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useViewAllBudgetsScreen} from './ViewAllBudgetsController';
import {theme} from '../Theme';

export const ViewAllBudgets = ({navigation}) => {
  const controller = useViewAllBudgetsScreen();
  const budgetList = controller.budgets;

  const formatDate = date =>
    new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const handleBackButton = () => {
    navigation.navigate('Budgets');
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const renderItem = ({item}) => {
    const {amount, startDate, endDate} = JSON.parse(item);
    formattedStartDate = formatDate(startDate);
    formattedEndDate = formatDate(endDate);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={theme.viewAllBudgetStyles.touchableContainer}>
        <Text style={theme.viewAllBudgetStyles.touchableText}>{amount}</Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {formattedStartDate}
        </Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {formattedEndDate}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.viewAllBudgetStyles.linearGradientContainer}>
      <View style={theme.viewAllBudgetStyles.headerContainer}>
        <Text style={theme.viewAllBudgetStyles.headerText}>Amount</Text>
        <Text style={theme.viewAllBudgetStyles.headerText}>Start Date</Text>
        <Text style={theme.viewAllBudgetStyles.headerText}>End Date</Text>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={budgetList}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
    </LinearGradient>
  );
};
