import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../components/colors';
const { primary, secondary, white } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import RegularButton from '../components/Buttons/RegularButton';
import IconHeader from '../components/Icons/IconHeader';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
import MessageModal from '../components/Modals/MessageModal';

const EmailVerification = ({navigation}) => {
    // code input
    const MAX_CODE_LENGTH = 6;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    const [verifying, setVerifying] = useState(false);

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
            // move user to login if email verification was completed
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

    const handleEmailVerification = async () => {
        var _ud = await AsyncStorage.getItem('@MyApp_newUser');
        var ud = JSON.parse(_ud);
        var userId = ud._id;

        try {
            setVerifying(true);
            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/verifyemail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    code: code
                })
            });
            if (response.ok) {
                //console.log("That worked ", email);
                setVerifying(false);
                return showModal('success', 'All Good!', 'Your email has been verified.', 'Proceed');
            }
            else {
                //console.log("That didn't seem to work", email);
                setVerifying(false);
                return showModal('failed', 'Failed!', 'Please verify the code is correct.', 'Retry');
            }
        } catch (error) {
            setVerifying(false);
            return showModal('failed', 'Failed!', error.message, 'Retry');
        }
    }

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            <IconHeader name="lock-open" style={{marginBottom: 30}} />

            <RegularText style={{ textAlign: 'center' }}>
                Enter the 6-digit code sent to your email
            </RegularText>

            <StyledCodeInput code={code} setCode={setCode} maxLength={MAX_CODE_LENGTH} setPinReady={setPinReady} />

            {!verifying && pinReady && <RegularButton onPress={ handleEmailVerification }>Verify</RegularButton>}
            {!verifying && !pinReady && <RegularButton disabled={true} style={{backgroundColor: secondary}} textStyle={{color: white}} >Verify</RegularButton>}

                
                {verifying && (
                    <RegularButton disabled={ true }>
                    <ActivityIndicator size="small" color={ primary } />
                    </RegularButton>
                )}
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
    );
};

export default EmailVerification;