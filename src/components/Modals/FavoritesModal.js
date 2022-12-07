import React, {useState} from 'react';
import {Modal, ActivityIndicator, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { primary, tertiary, accent, secondary, white } = colors;
import RegularText from '../Texts/RegularText';
import RegularButton from '../Buttons/RegularButton';
import { Switch, View, Text } from 'react-native';

import { ModalView, ModalPressableContainer } from './MessageModal'

const StyledView = styled.View`
`;

const FavoritesModal = ({result, modalVisible, hideModal }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    
    const toggleSwitch = async () => {
        var _ud = await AsyncStorage.getItem('@MyApp_user');
        var ud = JSON.parse(_ud);
        var userId = ud._id;
        setIsEnabled(previousState => !previousState);
        if (isEnabled == false) {
            try {
                // call backend
                const response = await fetch('https://cop4331-1738.herokuapp.com/api/addfavorite', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: userId,
                        businessID: result.id
                    })
                });
            } catch (error) {
                console.log(error.message);
            }
        }
        else if (isEnabled == true) {
            try {
                // call backend
                const response = await fetch('https://cop4331-1738.herokuapp.com/api/removefavorite', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: userId,
                        businessID: result.id
                    })
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}> 
            <ModalPressableContainer onPress={hideModal} >
                <ModalView>
                    <RegularText style={{fontSize: 24, color: white, marginBottom: 10}}>{result.name}</RegularText>
                    <RegularText style={{fontSize: 20, color: white}}>
                        {result.location.display_address[0]} {result.location.display_address[1]} {result.location.display_address[2]}
                    </RegularText>
                    <RegularText style={{fontSize: 20, color: white, marginVertical: 10}}>{result.display_phone}</RegularText>
                    <RegularText style={{fontSize: 20, color: white, marginBottom: -10}}>Add to favorites</RegularText>
                    <Switch
                        trackColor={{ false: '#fd9134', true: {primary} }}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </ModalView>
            </ModalPressableContainer>
        </Modal>
    );
};

export default FavoritesModal;