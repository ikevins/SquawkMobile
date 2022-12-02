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

const InfoCardModal = ({modalVisible, hideModal }) => {
    return <Modal animationType='slide' visible={modalVisible} transparent={true}> 
        <ModalPressableContainer onPress={hideModal} >
            <ModalView>
                <BigText style={{fontSize: 25, color: white, marginVertical: 10}}>modal test</BigText>
            </ModalView>
        </ModalPressableContainer>
    </Modal>
};

export default InfoCardModal;