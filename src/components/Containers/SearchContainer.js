import React from 'react';

// styled components
import styled from 'styled-components/native';

const StyledView = styled.View`
`;

const SearchContainer = (props) => {
    return <StyledView { ...props }>{ props.children }</StyledView>
};

export default SearchContainer;