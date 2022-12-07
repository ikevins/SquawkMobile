import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../components/colors'
const { primary} = colors;

const Profile = () => {
    return (
        <View 
            style= {{
                flex: 1, 
                justifyContent:'center', 
                alignItems:'center', 
                backgroundColor: primary}}>
            <Text> Profile Screen</Text>
        </View>
    )
}

export default Profile;