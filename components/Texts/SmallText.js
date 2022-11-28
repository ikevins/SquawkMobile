import React from 'react';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { white } = colors;

const StyledText = styled.Text`
    font-size: 15px;
    color: ${ white };
    text-align: left;
`;

const SmallText = (props) => {
    return <StyledText { ...props }>{ props.children }</StyledText>
};

export default SmallText;