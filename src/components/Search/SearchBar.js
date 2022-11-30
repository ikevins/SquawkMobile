import React, {useState} from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { opaqueWhite, white, secondary, primary, lightGray } = colors;

import styled from 'styled-components/native';
import SmallText from '../Texts/SmallText';

const InputField = styled.TextInput`
    background-color: ${ primary };
    padding-left: 65px;
    padding-right: 55px;
    border-radius: 10px;
    font-size: 16px;
    height: 40px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${ white }
    border-color: ${ secondary };
    border-width: 2px;
`;

const LeftIcon = styled.View`
    position: absolute;
    top: 8px;
    left: 15px;
    z-index: 1;
    border-right-width: 2px;
    border-color: ${ secondary };
    padding-right: 10px;
`;


const SearchBar = ({ label, icon, term, onTermChange, onTermSubmit, placeholder, ...props }) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);

  const customOnBlur = () => {
      props?.onBlur;
      setInputBackgroundColor(primary);
  }
  
  const customOnFocus = () => {
      props?.onFocus;
      setInputBackgroundColor(opaqueWhite);
  }
  
  
  return (
    <View>
        <LeftIcon>
            <MaterialCommunityIcons name={ icon } size={ 30 } color={ secondary } />
        </LeftIcon>
      <InputField
        { ...props }
        placeholderTextColor={ lightGray }
        style={{ backgroundColor: inputBackgroundColor, ...props?.style }}
        onBlur={ customOnBlur }
        onFocus={ customOnFocus }
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

export default SearchBar;