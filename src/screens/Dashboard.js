import React, {useState, View} from 'react';

import { colors } from '../components/colors';
import SearchBar from "react-native-dynamic-search-bar";
const { secondary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import SearchContainer from '../components/Containers/RowContainer';
import InfoCard from '../components/Cards/InfoCard';
import RegularButton from '../components/Buttons/RegularButton';
import useResults from "../components/Results/useResults";


const Dashboard = () => {
    const [term, setTerm] = useState("");
    const [searchApi, results, errorMessage] = useResults();
    var apiKey = 'ygXg7nrp2TH3X_CpYBzRw-x0QN1-D5owhXyg2h6kI80cxwG-gDh3SNjpxU3X4T55tj-7PyQL7WZ8U2_rT0hxrkRU5nBXZnZGBjFNAOyWWEJ8aPhP4W3J4FPXrZVQY3Yx';

    const yelpFusion = async () => {
        try {
            const response = await fetch('https://api.yelp.com/v3/businesses/search?term=starbucks&location=orlando', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + apiKey
                },
            });

            // handle response 
            var results = await response.json();
            var searchResults = results.businesses.map(business => {
                <InfoCard key={business.id} business={business}/>
            })
            return (
                <View>
                {searchResults}
                </View>
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}  >
       <MainContainer style= {{ backgroundColor: 'transparent' }}>
            <RegularButton onPress={yelpFusion} style={{ marginBottom: 20 }}>Yelp Fusion</RegularButton>
       </MainContainer>
    </MainContainer>
    );
};

export default Dashboard;