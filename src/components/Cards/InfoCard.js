import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// styled components
import styled from 'styled-components/native';
import { ScreenHeight } from '../shared';
import { colors } from '../colors';

import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import BigText from '../Texts/BigText';

const { primary, secondary, black, accent, lightGray, tertiary } = colors;

const CardView = styled.View`
    flex-direction: row;
    height: ${ ScreenHeight * 0.17 }px;
    background-color: ${ primary };
    border-width: 2px;
    border-color: ${ secondary };
    padding: 10px;
    overflow: hidden;
    elevation: 20;
    shadow-color: ${black};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    border-left-width: 0px; 
    border-right-width: 0px;
    border-color: rgba(253,145,52,0.7);
    margin-top: 10px;

`;

const CardSection = styled.View`
    justify-content: space-between;
    align-items: flex-start;
    marginRight: 25px;

`

const InfoCard = ({result, ...props}) => {

    return ( 
        <CardView style={{ ...props?.style }}>
            <CardSection style={{width: '35%'}}>
            {/*image*/}
            </CardSection>
            <CardSection style={{width: '65%'}}>
                <BigText style={{fontSize: 16, fontWeight: 'bold'}}>{result.name}</BigText>
                <RegularText style={{fontSize: 16, color: tertiary}}>{result.rating + result.review_count}</RegularText>
                <RegularText style={{fontSize: 16}}>${result.price + result.title}</RegularText>
                <SmallText style={{fontSize: 13, color: lightGray}}>{result.address1}</SmallText>
                <SmallText style={{fontSize: 13, color: lightGray}}>{result.city + result.state + result.zip_code}</SmallText>
            </CardSection>
        </CardView>
    )
};

export default InfoCard;