import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigation from './UnauthenticatedNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from '../Screens/HomeScreen';
import ShippingScreen from "../Screens/ShippingScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import PlaceOrderScreen from "../Screens/PlaceOrderScreen";
import ProductDetail from "../Screens/ProductDetail";
import OrderScreen from "../Screens/OrderScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingScreen from '../Screens/SettingScreen';
import Colors from '../color';
import { useAuth } from '../contexts/authContext';
import ChangePasswordScreen from '../Screens/ChangePasswordScreen';

const Tab = createBottomTabNavigator();

// const retrieveToken = async () => {
//     try {
//         const userToken = await AsyncStorage.getItem('userToken');
//         if (userToken !== null) {
//             // Đã tìm thấy token, bạn có thể sử dụng nó ở đây
//             return true;
//         } else {
//             // Nếu không tìm thấy token
//             console.log('Token không tồn tại.');
//             return false;
//         }
//     } catch (error) {
//         console.error('Lỗi khi lấy token từ AsyncStorage:', error);
//         return false;
//     }
// };


const CustomTab = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.customTab}>
        {children}
    </TouchableOpacity>
);

function HomeBottom() {
    return (
        <Tab.Navigator
            backBehavior="HomeBottom"
            initialRouteName="HomeBottom"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tab },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            {/* Main */}
            <Tab.Screen
                name="HomeBottom"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <Entypo name="home" size={24} color={Colors.main} />
                            ) : (
                                <AntDesign name="home" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
            {/* Cart */}
            <Tab.Screen
                name="CartBottom"
                component={CartStack}
                options={{
                    tabBarButton: (props) => <CustomTab {...props} />,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <FontAwesome5 name="shopping-basket" size={24} color={Colors.white} />
                            ) : (
                                <MaterialCommunityIcons name="shopping-outline" size={24} color={Colors.white} />
                            )}
                        </View>
                    ),
                }}
            />
            {/* Profile */}
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.center}>
                            {focused ? (
                                <FontAwesome name="user" size={24} color={Colors.main} />
                            ) : (
                                <AntDesign name="user" size={24} color={Colors.black} />
                            )}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Single" component={ProductDetail} />
        </Stack.Navigator>
    )
}

function CartStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CartStack" component={CartScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
            <Stack.Screen name="PlaceorderScreen" component={PlaceOrderScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        </Stack.Navigator>
    )
}

export default function AppNavigation() {
    // const [token, setToken] = useState(null);
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    // useEffect(() => {
    //     const getToken = async () => {
    //         const retrievedToken = await retrieveToken();
    //         setIsLoggedIn(retrievedToken);
    //     };

    //     getToken();
    // }, [setIsLoggedIn]);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {
                    isLoggedIn ?
                        <Stack.Screen name="Home" component={HomeBottom} /> :
                        <Stack.Screen name="Auth" component={UnauthenticatedNavigation} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tab: {
        elevation: 0,
        backgroundColor: Colors.white,
        height: 60,
    },
    customTab: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: Colors.main,
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        top: -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});