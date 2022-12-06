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
import MessageModal from '../components/Modals/MessageModal';

const ChangePassword = ({navigation}) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const handleOnSubmit = async (credentials, setSubmitting) => {
        var _ud = await AsyncStorage.getItem('@MyApp_user');
        var ud = JSON.parse(_ud);
        var userId = ud._id;
        try {
            setMessage(null);
            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/changepassword', {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    oldPassword: sha256.hash(credentials.oldPassword),
                    newPassword: sha256.hash(credentials.newPassword)
                })
            });
            if (response.ok) {
                setSubmitting(false);
                return showModal('success', 'All Good!', 'Your password has been changed.', 'Proceed');
            }
            else {
                setSubmitting(false);
                return showModal('failed', 'Failed!', 'Please verify your current password is correct.', 'Retry');
            }

        } catch (error) {
            setSubmitting(false);
            return showModal('failed', 'Failed!', error.message, 'Close');
        }
    };

    const buttonHandler = () => {
        if (modalMessageType === 'success') {
            // move user to login if email verification was completed
            moveTo('Dashboard');
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


    return (
    <MainContainer>
        <KeyboardAvoidingContainer>

            <Formik 
                initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                onSubmit={(values, {setSubmitting}) => {
                    if(values.oldPassword == '' || values.newPassword == '' || values.confirmNewPassword == '') {
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
                            onChangeText={ handleChange('oldPassword') }
                            onBlur={ handleBlur('oldPassword') }
                            value={ values.oldPassword }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="New Password" 
                            icon="lock" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('newPassword') }
                            onBlur={ handleBlur('newPassword') }
                            value={ values.newPassword }
                            isPassword={true}
                            style={{marginBottom: 15}}
                        />

                        <StyledTextInput 
                            label="Confirm New Password" 
                            icon="lock" 
                            placeholder="Enter password"
                            onChangeText={ handleChange('confirmNewPassword') }
                            onBlur={ handleBlur('confirmNewPassword') }
                            value={ values.confirmNewPassword }
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
                    </>
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

export default ChangePassword;