import React from 'react';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { white } = colors;

const StyledText = styled.Text`
    font-size: 30px;
    color: ${ white };
    text-align: left;
`;

const BigText = (props) => {
    return <StyledText { ...props }>{ props.children }</StyledText>
};

export default BigText;