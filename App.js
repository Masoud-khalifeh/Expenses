import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './data/Colors';
import ExpenseContext from './store/ExpenseContext';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Currency from './screens/Currency';
import CurrencyContext from './store/CurrencyContext';
import Home from './screens/Home';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabLoader() {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: colors.quaternary ,tabBarLabelStyle:{fontSize:15,padding:5},tabBarStyle:{paddingHorizontal:15,paddingVertical:10,height:"10%",backgroundColor:colors.primary}  
      ,tabBarInactiveTintColor:colors.tertiary,tabBarInactiveBackgroundColor:colors.primary,tabBarActiveTintColor:colors.quaternary,tabBarActiveBackgroundColor:colors.secondary, backgroundColor:"red"}}>
      <Tab.Screen name='AllExpensesTab' component={AllExpenses} options={{ title: "All Expenses",  tabBarLabel:"All", tabBarIcon:()=> <Ionicons name="card" size={25} color={colors.tertiary} /> }} />
      <Tab.Screen name='RecentExpenses' component={RecentExpenses} options={{ title: "Recent Expenses", tabBarLabel:"Recent", tabBarIcon:()=> <Ionicons name="time" size={25} color={colors.tertiary} />}} />
      <Tab.Screen name='Currency' component={Currency} options={{ title: "Currency",  tabBarIcon:()=> <Ionicons name="pulse" size={25} color={colors.tertiary} /> }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    < >
      <StatusBar style='light'  />
      <ExpenseContext>
        <CurrencyContext>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: colors.quaternary, }}>
              <Stack.Screen name="Home" component={Home} options={{ headerLeft: null }} />
              <Stack.Screen name="Login" component={Login} options={{ headerLeft: null }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerLeft: null }} />
              <Stack.Screen name='AllExpenses' component={TabLoader} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </CurrencyContext>
      </ExpenseContext>
    </>
  );
}

