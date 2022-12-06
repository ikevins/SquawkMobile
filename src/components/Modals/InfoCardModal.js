import React from 'react';
import {Modal, ActivityIndicator, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { primary, tertiary, accent, secondary, white } = colors;
import RegularText from '../Texts/RegularText';
import RegularButton from '../Buttons/RegularButton';

import { ModalView, ModalPressableContainer } from './MessageModal'

const StyledView = styled.View`
`;

const InfoCardModal = ({result, modalVisible, hideModal }) => {

    return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}> 
            <ModalPressableContainer onPress={hideModal} >
                <ModalView>
                    <RegularText style={{fontSize: 24, color: white, marginBottom: 10}}>{result.name}</RegularText>
                    <RegularText style={{fontSize: 20, color: white}}>
                        {result.location.display_address[0]} {result.location.display_address[1]} {result.location.display_address[2]}
                    </RegularText>
                    <RegularText style={{fontSize: 20, color: white, marginVertical: 10}}>{result.display_phone}</RegularText>
                </ModalView>
            </ModalPressableContainer>
        </Modal>
    );
};

export default InfoCardModal;