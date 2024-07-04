import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Fontisto';
import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";
import { HomeScreen } from "../pages/Home";
import { ProfileScreen } from "../pages/Profile";
import RouterPage from "../../../routes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AppNavigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="auth" component={AuthNavigation} />
            <Stack.Screen name="inapp" component={InappNavigation} />
            <Stack.Screen name="router" component={RouterPage} />
        </Stack.Navigator>
    </NavigationContainer>  
    );
}
const AuthNavigation = () => {
    return (
    
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

const InappNavigation = () => {
    return (
        
        <Tab.Navigator
        screenOptions={({route}) => ({
            
           tabBarActiveTintColor: 'tomato',
           tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="home" component={HomeScreen}  />
        <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}