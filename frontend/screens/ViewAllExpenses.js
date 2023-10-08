import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../Theme';
import {formatDate} from '../utils/dateUtils';
import { useViewAllExpensesScreen } from './ViewAllExpensesController';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ViewAllExpenses = (props) => {
  const controller = useViewAllExpensesScreen();
  const budgetId = props.route.params?.budgetId;
  
  useEffect(()=>{
    if (budgetId) {
      controller.GET_EXPENSES_OF_BUDGET(budgetId);
    } else {
      controller.GET_ALL_EXPENSES();
    }
  },[budgetId])

  if (controller.requestStatus === 'please Authenticate yourself') {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }

  const budgetList = controller.expenses;

  const handleBackButton = () => {
    props.navigation.navigate('Expenses');
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

  const handleExpenseDelete = (id) => {
    controller.DELETE_EXPENSE(id)
  }
  const renderItem = ({item}) => {
    const {id, amount, description, date} = JSON.parse(item);
    formattedDate = formatDate(new Date(date));
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={theme.viewAllBudgetStyles.touchableContainer}>
        <Text style={theme.viewAllBudgetStyles.touchableText}>{amount}</Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {formattedDate}
        </Text>
        <Text style={theme.viewAllBudgetStyles.touchableText}>
          {description}
        </Text>
        <Pressable
          onPress={() => handleExpenseDelete(id)}
          style={theme.viewAllBudgetStyles.deleteIcon}>
          <Icon
            name="trash"
            color="red"
            size={18}
          />
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
      <View style={theme.viewAllBudgetStyles.headerContainer}>
        <Text style={theme.viewAllBudgetStyles.headerText}>Amount</Text>
        <Text style={theme.viewAllBudgetStyles.headerText}>Date</Text>
        <Text style={theme.viewAllBudgetStyles.headerText}>Description</Text>
        <Text style={theme.viewAllBudgetStyles.deleteIcon}></Text>
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
