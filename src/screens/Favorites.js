import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../components/colors'
import styled from 'styled-components/native';
const { primary} = colors;

const FavoritesView = styled.View`
    flex: 1;
    justify-content: 'center'; 
    align-items: 'center';
    background-color: primary;   
`;

const Favorites = () => {
    return (
        <View style= {{
            flex: 1, 
            justifyContent:'center', 
            alignItems:'center', 
            backgroundColor: primary}}>
            <Text> Screen</Text>
        </View>
    )
}

export default Favorites;