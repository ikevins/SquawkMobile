import React, {useState} from 'react';

import { View, Text, StyleSheet, ScrollView } from "react-native";

import { colors } from '../components/colors';
import SearchBar from "../components/Search/SearchBar";
const { secondary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import Info from '../components/Cards/Info';
import RegularButton from '../components/Buttons/RegularButton';
import SearchResults from "../components/Search/SearchResults";


const Dashboard = () => {
    const [term, setTerm] = useState("");
    const [searchApi, results] = SearchResults();
    var apiKey = 'ygXg7nrp2TH3X_CpYBzRw-x0QN1-D5owhXyg2h6kI80cxwG-gDh3SNjpxU3X4T55tj-7PyQL7WZ8U2_rT0hxrkRU5nBXZnZGBjFNAOyWWEJ8aPhP4W3J4FPXrZVQY3Yx';

    return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}  >
        <MainContainer style= {{ backgroundColor: 'transparent' }}>
            <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
            />
            <View>
                <Info
                results={results}
                title="Cost Effective"
                />
            </View>
            {/*<RegularButton onPress={} style={{ marginBottom: 20 }}>Yelp Fusion</RegularButton>*/}
       </MainContainer>
    </MainContainer>
    );
};

export default Dashboard;