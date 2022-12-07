import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import EmailVerification from '../screens/EmailVerification';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import ChangePassword from '../screens/ChangePassword';
import Dashboard from '../screens/Dashboard';
import Avatar from '../components/Buttons/Avatar';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../components/colors';
const { primary, secondary, white, } = colors;

const Tab = createBottomTabNavigator();
  
  function HomeTabs() {
    return (
        <Tab.Navigator
        screenOptions={{
            backgroundColor: primary,
            tabBarShowLabel: false,
            tabBarStyle:{backgroundColor: primary},
            tabBarInactiveTintColor: white,
            tabBarActiveTintColor: secondary,
            
        }} 
        >
        <Tab.Screen 
            name= "Dashboards" 
            component ={Dashboard} 
            options={{
                headerTintColor: white,
                headerStyle: {
                height: 75, 
                backgroundColor: primary,
                borderBottomWidth: 0,
                shadowColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0
                },
                headerRight: () => <Avatar />,
                tabBarIcon: ({color,size}) =>(
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen 
            name= "Favorites" 
            component ={Favorites} 
            options={{
                headerTintColor: white,
                headerStyle: {
                    height: 75, 
                    backgroundColor: primary,
                    borderBottomWidth: 0,
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                    elevation: 0
                    },
                tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name="heart" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen 
            name= "Profile" 
            component ={Profile} 
            options={{
                headerTintColor: white,
                headerStyle: {
                    height: 75, 
                    backgroundColor: primary,
                    borderBottomWidth: 0,
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                    elevation: 0
                    },
                tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={size}/>
                )
            }}
        />
    </Tab.Navigator>
    );
  }
  
  const Stack = createStackNavigator();
  
  export default function Navigator() {
    return (
      <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: white,
                    headerStyle: {
                        height: 75, 
                        backgroundColor: primary,
                        borderBottomWidth: 0,
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0,
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 10   
                    },
                    headerRightContainerStyle: {
                        paddingRight: 25   
                    }
                }}
                initialRouteName='Login'
            >
<Stack.Screen name='Login' component={ Login } />
                <Stack.Screen name='Favorites' component={ Favorites } />
                <Stack.Screen name='Signup' component={ Signup } />
                <Stack.Screen name='EmailVerification' component={ EmailVerification } options={{headerTitle: 'Email Verification'}} />
                <Stack.Screen name='ForgotPassword' component={ ForgotPassword } options={{headerTitle: 'Forgot Password'}} />
                <Stack.Screen name='ResetPassword' component={ ResetPassword } options={{headerTitle: 'Reset Password'}} />
                <Stack.Screen name='ChangePassword' component={ ChangePassword } options={{headerTitle: 'Change Password'}} />
                <Stack.Screen name='Dashboard' component={ HomeTabs } options={{ headerShown: false }}
                />
            </Stack.Navigator>
      </NavigationContainer>
    );
  }