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

const ChangePassword = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/verifyemail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    oldPassword: oldPassword.value,
                    newPassword: hashedNew
                })
            });

            setSubmitting(false);
            return showModal('success', 'All Good!', 'Your password has been reset.', 'Proceed');
        } catch (error) {
            setSubmitting(false);
            return showModal('failed', 'Failed!', error.message, 'Close');
        }
    };


    return (
    <MainContainer>
        <KeyboardAvoidingContainer>

            <Formik 
                initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                onSubmit={(values, {setSubmitting}) => {
                    if(values.oldPassword == '' || values.newPassword == "" || values.confirmNewPassword == "") {
                        setMessage('Please fill in all fields');
                        setSubmitting(false);
                    } 
                    else if(values.newPassword !== values.confirmNewPassword) {
                        setMessage('Passwords do not match');
                        setSubmitting(false);
                    } else {
                        handleOnSubmit(values, setSubmitting);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <>

                        <StyledTextInput 
                            label="Current Password" 
                            icon="lock-open" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('password') }
                            onBlur={ handleBlur('password') }
                            value={ values.password }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="New Password" 
                            icon="lock" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('confirmPassword') }
                            onBlur={ handleBlur('confirmPassword') }
                            value={ values.confirmPassword }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Confirm New Password" 
                            icon="lock" 
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
                        {!isSubmitting && <RegularButton onPress={ handleSubmit }>Submit</RegularButton>}
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

export default ChangePassword;