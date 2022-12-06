import React from 'react';
import {Modal, ActivityIndicator, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { primary, tertiary, accent, secondary, white } = colors;
import BigText from '../Texts/BigText';
import RegularButton from '../Buttons/RegularButton';

import { ModalView, ModalPressableContainer } from './MessageModal'

const StyledView = styled.View`
    background-color: ${ primary };
    flex-direction: column;
    height: 80px;
    width: 80px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-color: ${secondary};
`;

const ProfileModal = ({modalVisible, buttonHandler, headerText, loggingOut, hideModal, buttonHandler_2, buttonHandler_3}) => {
    return <Modal animationType='slide' visible={modalVisible} transparent={true}> 
        <ModalPressableContainer onPress={hideModal} >
            <ModalView>
                <StyledView>
                    <Image 
                        source={require('../../../assets/squawkicon.png')} 
                        style={{
                            height: 120, 
                            width: 120, 
                            resizeMode: 'contain', 
                            borderRadius: 50, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            alignSelf: 'center',
                        }}
                    />
                </StyledView>
                <BigText style={{fontSize: 25, color: white, marginVertical: 10}}>{headerText}</BigText>
                {/*<RegularButton onPress={buttonHandler} style={{ marginBottom: 10 }}>Account Details</RegularButton>*/}
                <RegularButton onPress={buttonHandler_2} style={{ marginBottom: 10 }}>Change Password</RegularButton>
                {!loggingOut && <RegularButton onPress={buttonHandler_3}>Logout</RegularButton>}
                {loggingOut && <RegularButton disabled={true}><ActivityIndicator size='small' color={primary} /></RegularButton>}
            </ModalView>
        </ModalPressableContainer>
    </Modal>
};

export default ProfileModal;