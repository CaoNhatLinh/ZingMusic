import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../features/auth/LoginScreen';
import Home from "../pages/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AppNavigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {/* <Stack.Screen name="auth" component={AuthNavigation} /> */}
            <Stack.Screen name="inapp" component={InappNavigation} />
        </Stack.Navigator>
    </NavigationContainer>  
    );
}
const AuthNavigation = () => {
    return (
    
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
      
        </Stack.Navigator>
    );
}

const InappNavigation = () => {
    return (
        
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName = '';
                if(route.name === 'home') {
                    iconName = 'home';
                }
                return <Icon name={iconName} size={size} color={color} />;
            },
           tabBarActiveTintColor: 'tomato',
           tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="home" component={Home}  />
        </Tab.Navigator>
    );
}