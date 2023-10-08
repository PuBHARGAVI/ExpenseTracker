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
import {formatDate} from '../utils/dateUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MessageOverlay } from '../components/MessageOverlay';
import { Pressable } from 'react-native';

export const ViewAllBudgets = ({navigation}) => {
  const controller = useViewAllBudgetsScreen();

  if (controller.requestStatus === 'please Authenticate yourself') {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  } 

  const budgetList = controller.budgets;

  const handleBackButton = () => {
    navigation.navigate('Budgets');
    return true;
  };

  const handleBudgetPress = (id) => {
    navigation.navigate('ViewAllExpenses',{budgetId: id});
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBudgetDelete = id => {
    controller.DELETE_BUDGET(id);
  };

  const renderItem = ({item}) => {
    const {id, amount, startDate, endDate} = JSON.parse(item);
    formattedStartDate = formatDate(new Date(startDate));
    formattedEndDate = formatDate(new Date(endDate));
    return (
      <TouchableOpacity
        onPress={() => handleBudgetPress(id)}
        activeOpacity={0.7}
        style={theme.viewAllBudgetStyles.touchableContainer}>
        <Text style={theme.viewAllBudgetStyles.touchableText}>{amount}</Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {formattedStartDate}
        </Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {formattedEndDate}
        </Text>
        <Pressable
          onPress={() => handleBudgetDelete(id)}
          style={theme.viewAllBudgetStyles.deleteIcon}>
          <Icon name="trash" color="red" size={18} />
        </Pressable>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['white', 'lightblue']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={theme.viewAllBudgetStyles.linearGradientContainer}>
      <MessageOverlay
        isVisible={controller.requestStatus === 'success'}
        message={'Budget & its Expenses are deleted successfully'}
        onDismiss={() => {
          return controller.DISMISS;
        }}
      />
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
