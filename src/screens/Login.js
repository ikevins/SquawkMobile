import React, { useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha256 from './sha256.js';

import { colors } from '../components/colors';
const { primary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import PressableText from '../components/Texts/PressableText';
import RowContainer from '../components/Containers/RowContainer';
import BigText from '../components/Texts/BigText';

const Login = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const handleLogin = async (credentials, setSubmitting) => {
        try {
            setMessage(null);

            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: credentials.email,
                    password: sha256.hash(credentials.password)
                  })
              });

            // handle response 
            var res = JSON.parse(await response.text());
            if(res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                // move to next page
                const user = {
                    firstName:res.firstName,
                    lastName:res.lastName,
                    _id:res._id,
                    email:res.email
                }

                await AsyncStorage.setItem('@MyApp_user', JSON.stringify(user));
                moveTo('Dashboard');
                setMessage('');
            }
            setSubmitting(false);
        } catch (error) {
            setMessage('Login failed: ' + error.message);
            setSubmitting(false);
        }
    };

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            <Image 
                source={require('../../assets/squawklogo.png')} 
                style={{
                    height: 250, 
                    width: 300, 
                    resizeMode: 'contain', 
                    borderRadius: 50, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    alignSelf: 'center',
                    marginTop: -10,
                    marginBottom: 15
                }}
            />

            <Formik 
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, {setSubmitting}) => {
                    if(values.email == "" || values.password == "") {
                        setMessage('Please fill in all fields');
                        setSubmitting(false);
                    } else {
                        handleLogin(values, setSubmitting);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <>
                        <StyledTextInput 
                            label="Email Address" 
                            icon="email-variant" 
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            onChangeText={ handleChange('email') }
                            onBlur={ handleBlur('email') }
                            value={ values.email }
                            style={{marginBottom: 10}}
                        />

                        <StyledTextInput 
                            label="Password" 
                            icon="lock-open" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('password') }
                            onBlur={ handleBlur('password') }
                            value={ values.password }
                            isPassword={true}
                            style={{marginBottom: 10}}
                        />

                        <MsgBox style={{marginBottom: 10}} success={isSuccessMessage}>
                            { message || ' '}
                        </MsgBox>
                        {!isSubmitting && <RegularButton onPress={ handleSubmit }>Login</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={ true }>
                            <ActivityIndicator size="small" color={ primary } />
                            </RegularButton>
                        )}

                        <RowContainer>
                            <PressableText onPress={() => {moveTo('Signup')}}>New account sign up</PressableText>
                            <PressableText onPress={() => {moveTo('ForgotPassword')}}>Forgot Password</PressableText>
                        </RowContainer>
                    </>
                )}
            </Formik>
        </KeyboardAvoidingContainer>
    </MainContainer>
)}

export default Login;