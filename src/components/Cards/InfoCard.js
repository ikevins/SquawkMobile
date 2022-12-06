import React, {useState} from 'react';
import { Image } from 'react-native';

// styled components
import styled from 'styled-components/native';
import { ScreenHeight } from '../shared';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import BigText from '../Texts/BigText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InfoCardModal from '../Modals/InfoCardModal';

const { primary, secondary, black, accent, lightGray, tertiary } = colors;

const CardView = styled.View`
    flex-direction: row;
    height: ${ ScreenHeight * 0.19 }px;
    background-color: ${ primary };
    border-width: 2px;
    border-color: ${ secondary };
    padding: 10px;
    overflow: hidden;
    border-left-width: 0px; 
    border-right-width: 0px;
    border-color: rgba(253,145,52,0.7);
    margin-top: 10px;

`;

const CardSection = styled.View`
    justify-content: space-between;
    align-items: flex-start;
    marginRight: 20px;
`
const FoodType = styled.View`
    backgroundColor: lightgray;
    padding: 2px;

`

const oneStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
    </>
)

const oneHalfStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star-half" size={16} color={secondary} />
    </>
)

const twoStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
    </>
)

const twoHalfStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star-half" size={16} color={secondary} />
    </>
)

const threeStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
    </>
)

const threeHalfStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star-half" size={16} color={secondary} />
    </>
)

const fourStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
    </>
)

const fourHalfStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star-half" size={16} color={secondary} />
    </>
)

const fiveStar = (
    <>
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
        <MaterialCommunityIcons name="star" size={16} color={secondary} />
    </>
)

const InfoCard = ({result, ...props}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [distance, setDistance] = useState('');

    if (result.rating==1) {
        result.rating=oneStar;
    }
    else if (result.rating==1.5){
        result.rating=oneHalfStar;
    }
    else if (result.rating==2){
        result.rating=twoStar;
    }
    else if (result.rating==2.5){
        result.rating=twoHalfStar;
    }
    else if (result.rating==3){
        result.rating=threeStar;
    }
    else if (result.rating==3.5){
        result.rating=threeHalfStar;
    }
    else if (result.rating==4){
        result.rating=fourStar;
    }
    else if (result.rating==4.5){
        result.rating=fourHalfStar;
    }
    else if (result.rating==5){
        result.rating=fiveStar;
    }

    if (result.price==undefined) {
        result.price='Unknown';
    }

    const showInfoCardModal = () => {
        setModalVisible(true);
      }
    
    const onInfoCardPress = async () => {
        showInfoCardModal();
    }
    
    const hideModal = () => {
        setModalVisible(false);
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onInfoCardPress}>
        <CardView style={{ ...props?.style }}>
            <CardSection style={{width: '35%'}}>
                <Image style ={{height: 130, width: 120, borderRadius: 10}} source={{ uri: result.image_url }}/>
            </CardSection>
            <CardSection style={{width: '65%'}}>
                <BigText style={{ marginTop: -5, fontSize: 18, fontWeight: 'bold'}}>{result.name}</BigText>
                <RegularText style={{ fontSize: 16 }}>{result.rating}({result.review_count} reviews)</RegularText>
                <RegularText style={{fontSize: 16}}>{result.categories[0].title} {result.price}</RegularText>
                <RegularText style={{fontSize: 16}}>Distance: {result.distance}</RegularText>
            </CardSection>
        </CardView>
        <InfoCardModal 
            modalVisible={modalVisible} 
            hideModal={hideModal} 
            result={result}/>
        </TouchableOpacity>
    )
};

export default InfoCard;