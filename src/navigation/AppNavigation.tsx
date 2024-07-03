import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Fontisto';
import LoginScreen from '../features/auth/LoginScreen';
import MusicListScreen from '../features/music/MusicListScreen';
import MusicDetailScreen from '../features/music/MusicDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AppNavigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="auth" component={AuthNavigation} />
            {/* <Stack.Screen name="inapp" component={InappNavigation} /> */}
        </Stack.Navigator>
    </NavigationContainer>  
    );
}
const AuthNavigation = () => {
    return (
    
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MusicList" component={MusicListScreen} />
        <Stack.Screen name="MusicDetail" component={MusicDetailScreen} />
        </Stack.Navigator>
    );
}

// const InappNavigation = () => {
//     return (
        
//         <Tab.Navigator
//         screenOptions={({route}) => ({
            
//            tabBarActiveTintColor: 'tomato',
//            tabBarInactiveTintColor: 'gray',
//         })}
//         >
//         <Tab.Screen name="home" component={HomeScreen}  />
//         <Tab.Screen name="profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     );
// }