import React, {useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { primary, secondary, accent } = colors;
import ProfileModal from '../Modals/ProfileModal';

const StyledView = styled.TouchableOpacity`
    background-color: ${ primary };
    flex-direction: column;
    height: 45px;
    width: 45px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-color: ${secondary};
`;

const Avatar = (props) => {
    // modal
    const [modalVisible, setModalVisible] = useState(false);
    const [headerText, setHeaderText] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    const navigation = useNavigation();

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    };

    const accountDetails = async () => {
        console.log('ad');
    }

    const changePassword = async () => {
        setModalVisible(false);

        // move to login
        moveTo('ChangePassword');
    }

    const onLogout = async () => {
        setLoggingOut(true);

        // clear local storage
        AsyncStorage.clear();

        setLoggingOut(false);
        setModalVisible(false);

        // move to login
        moveTo('Login');
    }

    const showProfileModal = (user) => {
        setHeaderText(user);
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    const onAvatarPress = async () => {
        var _ud = await AsyncStorage.getItem('@MyApp_user');
        var ud = JSON.parse(_ud);
        var firstName = ud.firstName;
        var lastName = ud.lastName;
        showProfileModal(firstName + ' ' + lastName);
    }

    return ( 
        <>
            <StyledView onPress={onAvatarPress} style={props.imgContainerStyle}>
                <MaterialCommunityIcons name='account' size={35} color={secondary} />
            </StyledView>
            <ProfileModal 
                modalVisible={modalVisible} 
                headerText={headerText} 
                buttonHandler={accountDetails}
                buttonHandler_2={changePassword} 
                buttonHandler_3={onLogout}  
                loggingOut={loggingOut} 
                hideModal={hideModal}
            />
        </>
    );
};

export default Avatar;