import React, { useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha256 from './sha256';

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

const Signup = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const handleSignup = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: credentials.email,
                    password: sha256.hash(credentials.password),
                    firstName: credentials.firstName,
                    lastName: credentials.lastName
                  })
              });

            // handle response 
            var res = JSON.parse(await response.text());

            const newUser = {
                firstName:res.firstName,
                lastName:res.lastName,
                _id:res._id,
                token:res.token,
                password:res.password,
                email:res.email
            }

            await AsyncStorage.setItem('@MyApp_newUser', JSON.stringify(newUser));

            // move to next page
            moveTo('EmailVerification');
            setSubmitting(false);
        } catch (error) {
            setMessage(error.message);
            setSubmitting(false);
        }
    }

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            {/*<RegularText style={{ marginBottom: 15 }}>Enter your account credentials</RegularText>*/}

            <Formik 
                initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                onSubmit={(values, {setSubmitting}) => {
                    if(values.firstName == '' || values.lastName == '' || values.email == '' || values.password == "" || values.confirmPassword == "") {
                        setMessage('Please fill in all fields');
                        setSubmitting(false);
                    } 
                    else if(values.password !== values.confirmPassword) {
                        setMessage('Passwords do not match');
                        setSubmitting(false);
                    } else {
                        handleSignup(values, setSubmitting);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <>
                        <StyledTextInput 
                            label="First Name" 
                            icon="account" 
                            placeholder="Enter first name"
                            onChangeText={ handleChange('firstName') }
                            onBlur={ handleBlur('firstName') }
                            value={ values.firstName }
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Last Name" 
                            icon="account"
                            placeholder="Enter last name"
                            onChangeText={ handleChange('lastName') }
                            onBlur={ handleBlur('lastName') }
                            value={ values.lastName }
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Email Address" 
                            icon="email-variant" 
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            onChangeText={ handleChange('email') }
                            onBlur={ handleBlur('email') }
                            value={ values.email }
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Password" 
                            icon="lock-open" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('password') }
                            onBlur={ handleBlur('password') }
                            value={ values.password }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Confirm Password" 
                            icon="lock-open" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('confirmPassword') }
                            onBlur={ handleBlur('confirmPassword') }
                            value={ values.confirmPassword }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <MsgBox style={{marginBottom: 25}} success={isSuccessMessage}>
                            { message || ' '}
                        </MsgBox>
                        {!isSubmitting && <RegularButton onPress={ handleSubmit }>Signup</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={ true }>
                            <ActivityIndicator size="small" color={ primary } />
                            </RegularButton>
                        )}

                            <PressableText style={{paddingVertical: 15}} onPress={() => {moveTo('Login')}}>Sign in to an existing account</PressableText>
                    </>
                )}
            </Formik>
        </KeyboardAvoidingContainer>
    </MainContainer>
)}

export default Signup;