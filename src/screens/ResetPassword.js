import React, { useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import sha256 from './sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../components/colors';
const { primary } = colors;

// custom components
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import IconHeader from '../components/Icons/IconHeader';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
import styled from 'styled-components/native';
import MessageModal from '../components/Modals/MessageModal';

const FormWrapper = styled.View`
    ${(props) => {
        return props.pinReady ? `opacity: 1` : `opacity: 0.3`;
    }}
`

const ResetPassword = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    // code input
    const MAX_CODE_LENGTH = 6;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const buttonHandler = () => {
        if (modalMessageType === 'success') {
            // do something
            moveTo('Login');
        }
        setModalVisible(false);
    }

    const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
    }

    const handleOnSubmit = async (credentials, setSubmitting) => {
        var _ud = await AsyncStorage.getItem('@MyApp_userForgotPassword');
        var ud = JSON.parse(_ud);
        var userId = ud._id;

        try {
            setMessage(null);
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/resetpassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    code: code,
                    newPassword: sha256.hash(credentials.newPassword)
                })
            });
            if (response.ok) {
                setSubmitting(false);
                return showModal('success', 'All Good!', 'Your password has been reset.', 'Proceed');
            }
            else {
                setSubmitting(false);
                return showModal('failed', 'Failed!', 'Please verify the code is correct.', 'Retry');
            }
        } catch (error) {
            setSubmitting(false);
            return showModal('failed', 'Failed!', error.message, 'Close');
        }
    };

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            <RegularText style={{ textAlign: 'center' }}>
                Enter the 6-digit code sent to your email
            </RegularText>

            <StyledCodeInput code={code} setCode={setCode} maxLength={MAX_CODE_LENGTH} setPinReady={setPinReady} />

            <Formik 
                initialValues={{ newPassword: '', confirmNewPassword: ''}}
                onSubmit={(values, { setSubmitting }) => {
                    if(values.newPassword == '' || values.confirmNewPassword == '') {
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
                    <FormWrapper pinReady={pinReady}>
                        <StyledTextInput 
                            label="New Password" 
                            icon="lock-open-variant" 
                            placeholder="Enter new password"
                            onChangeText={ handleChange('newPassword') }
                            onBlur={ handleBlur('newPassword') }
                            value={ values.newPassword }
                            isPassword={true}
                            style={{marginBottom: 25}}
                            editable={pinReady}
                        />

                        <StyledTextInput 
                            label="Confirm New Password" 
                            icon="lock-open-variant" 
                            placeholder="Confirm new password"
                            onChangeText={ handleChange('confirmNewPassword') }
                            onBlur={ handleBlur('confirmNewPassword') }
                            value={ values.confirmNewPassword }
                            isPassword={true}
                            style={{marginBottom: 25}}
                            editable={pinReady}
                        />

                        <MsgBox style={{marginBottom: 25}} success={isSuccessMessage}>
                            { message || ' '}
                        </MsgBox>
                        {!isSubmitting && <RegularButton disabled={ !pinReady } onPress={ handleSubmit }>Submit</RegularButton>}
                        {isSubmitting && (
                            <RegularButton disabled={ true }>
                            <ActivityIndicator size="small" color={ primary } />
                            </RegularButton>
                        )}
                    </FormWrapper>
                )}
            </Formik>
            <MessageModal 
                    modalVisible={modalVisible} 
                    buttonHandler={buttonHandler} 
                    type={modalMessageType} 
                    headerText={headerText}   
                    message={modalMessage}
                    buttonText={buttonText}
            />
        </KeyboardAvoidingContainer>
    </MainContainer>
)}

export default ResetPassword;