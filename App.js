import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpenseContext from './store/ExpenseContext';
import { colors } from './data/Colors';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabLoader() {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: colors.quaternary }}>
      <Tab.Screen name='AllExpensesTab' component={AllExpenses} options={{title:"All Expenses"}}/>
      <Tab.Screen name='RecentExpenses' component={RecentExpenses} options={{title:"Recent Expenses"}}/>
    </Tab.Navigator>
  )

}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <ExpenseContext>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: colors.quaternary }}>
            <Stack.Screen name='AllExpenses' component={TabLoader} options={{headerShown:false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContext>
    </>
  );
}

