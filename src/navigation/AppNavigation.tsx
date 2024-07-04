import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../features/auth/LoginScreen';
import Home from "../pages/Home";
// import Top100 from "../pages/Top100";
import DetailPlaylist from "../pages/DetailPlaylist";
// import ChartHome from "../pages/ChartHome";
// // import Artist from "../pages/Artist";
// import Search from "../pages/Search";
// import MV from "../pages/MV";
// import DetailMV from "../pages/DetailMV";
import { TestScreen } from "../pages/pagtest";
const Stack = createStackNavigator();
const StackMain = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AppNavigation = () => {
    return (
    <NavigationContainer>
        <Stack.Group>
            <Stack.Screen name="inapp" component={InappNavigation} />
            <Stack.Screen name="route" component={RouterPage} />
        </Stack.Group>
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
            headerShown:false,
           tabBarActiveTintColor: 'tomato',
           tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="home" component={Home}  />
        </Tab.Navigator>
    );
}

const RouterPage = () => {
    return (
        <StackMain.Navigator>
          {/* <Stack.Screen name="Top100" component={Top100} />
          <Stack.Screen name="DetailPlaylist" component={DetailPlaylist} /> */}
            <StackMain.Screen name="DetailPlaylist" component={DetailPlaylist} />
          
          {/* <Stack.Screen name="ChartHome" component={ChartHome} /> */}
          {/* <Stack.Screen name="Artist" component={Artist} /> */}
          {/* <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="MV" component={MV} />
          <Stack.Screen name="DetailMV" component={DetailMV} /> */}
        </StackMain.Navigator>
    );
  };