import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseContext from './store/ExpenseContext';
import { colors } from './data/Colors';

const Stack = createStackNavigator();


export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <ExpenseContext>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:colors.secondary},headerTintColor:colors.quaternary}}>
            <Stack.Screen name='AllExpenses' component={AllExpenses} />
            {/* <Stack.Screen name='RecentExpenses' component={RecentExpenses} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContext>
    </>
  );
}

