import React, { useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../components/colors';
const { primary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import IconHeader from '../components/Icons/IconHeader';

const ForgotPassword = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            setMessage(null);

            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/sendrecoveryemail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email
                })
            });
            if (response.ok) {
                // Store user info
                var res = JSON.parse(await response.text());
                const userForgotPassword = {
                    _id:res._id,
                }
                await AsyncStorage.setItem('@MyApp_userForgotPassword', JSON.stringify(userForgotPassword));
                // move to next page
                moveTo('ResetPassword');
                setSubmitting(false);
            }
            else {

                setVerifying(false);
                setMessage('Hmm... It seems that we cant find that email address :(');
            }
        } catch (error) {
            ('Request failed: ' + error.message);
            setSubmitting(false);
        }
    }

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            <IconHeader name="key" style={{marginBottom: 30}} />
            <RegularText style={{ marginBottom: 25, textAlign: 'center' }}>Please enter the email address associated with your account</RegularText>
            <Formik 
                initialValues={{ email: '' }}
                onSubmit={(values, {setSubmitting}) => {
                    if(values.email == '') {
                        setMessage('Please fill in all fields');
                        setSubmitting(false);
                    } else {
                        handleOnSubmit(values, setSubmitting);
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
                            style={{marginBottom: 25}}
                        />

                        <MsgBox style={{marginBottom: 25}} success={isSuccessMessage}>
                            { message || ' '}
                        </MsgBox>
                        {!isSubmitting && <RegularButton onPress={ handleSubmit }>Submit</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={ true }>
                            <ActivityIndicator size="small" color={ primary } />
                            </RegularButton>
                        )}
                    </>
                )}
            </Formik>
        </KeyboardAvoidingContainer>
    </MainContainer>
)}

export default ForgotPassword;