import React from 'react';

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// styled components
import styled from 'styled-components/native';
import { colors } from '../components/colors';
const { primary, accent, secondary, darkGray, white } = colors;

// screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import EmailVerification from '../screens/EmailVerification';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import ChangePassword from '../screens/ChangePassword';
import Dashboard from '../screens/Dashboard';
import Avatar from '../components/Buttons/Avatar';

const Stack = createStackNavigator();

const RootStack = () => {
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
                initialRouteName='Dashboard'
            >
                <Stack.Screen name='Login' component={ Login } />
                <Stack.Screen name='Signup' component={ Signup } />
                <Stack.Screen name='EmailVerification' component={ EmailVerification } options={{headerTitle: 'Email Verification'}} />
                <Stack.Screen name='ForgotPassword' component={ ForgotPassword } options={{headerTitle: 'Forgot Password'}} />
                <Stack.Screen name='ResetPassword' component={ ResetPassword } options={{headerTitle: 'Reset Password'}} />
                <Stack.Screen name='ChangePassword' component={ ChangePassword } options={{headerTitle: 'Change Password'}} />
                <Stack.Screen name='Dashboard' component={ Dashboard }/>
            </Stack.Navigator>
    </NavigationContainer>
    );
};

export default RootStack;