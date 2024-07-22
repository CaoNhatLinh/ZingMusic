import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from "../pages/Home";
// import Top100 from "../pages/Top100";
import DetailPlaylist from "../pages/DetailPlaylist";
// import ChartHome from "../pages/ChartHome";
// // import Artist from "../pages/Artist";
// import Search from "../pages/Search";
// import MV from "../pages/MV";
// import DetailMV from "../pages/DetailMV";
import { TestScreen } from "../pages/pagtest";
import colors from "../assets/colors";
import SongSreen from "../pages/PlaySong";
import Artist from "../pages/Artist";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.black,
        text: colors.white,
    },
};
export const AppNavigation = () => {

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.black,
                    },
                    headerTintColor: '#FFF',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }}
            >
                <Stack.Screen name="inapp" component={InappNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="DetailPlaylist"
                    component={DetailPlaylist}
                    options={({ route }: { route: { params?: { name?: string } } }) => ({ title: route.params?.name, headerShown: true, ...TransitionPresets.SlideFromRightIOS, })} />
                <Stack.Screen name="SongSreen"
                    component={SongSreen}
                    options={({ route }: { route: { params?: { name?: string } } }) =>
                    ({

                        title: route.params?.name,
                        headerShown: false,
                        gestureDirection: 'vertical',
                        transitionSpec: {
                            open: {
                                animation: 'timing',
                                config: { duration: 300 },
                            },
                            close: {
                                animation: 'timing',
                                config: { duration: 300 },
                            },
                        },
                        cardStyleInterpolator: ({ current, next, layouts }) => {
                            return {
                                cardStyle: {
                                    transform: [
                                        {
                                            translateY: current.progress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [layouts.screen.height, 0],
                                            }),
                                        },
                                        {
                                            translateY: next
                                                ? next.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, -layouts.screen.height],
                                                })
                                                : 1,
                                        },
                                    ],
                                },
                            };
                        },
                    })} />
<Stack.Screen name="ArtisScreen"
                    component={Artist}
                    options={({ route }: { route: { params?: { name?: string } } }) => ({ title: route.params?.name, headerShown: true, ...TransitionPresets.SlideFromRightIOS, })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



const InappNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'Home') {
                        iconName = 'home';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerStyle: {
                    backgroundColor: colors.black,
                },
                headerTitleStyle: {
                    color: 'white'
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}

