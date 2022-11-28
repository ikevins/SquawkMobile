import React from 'react';

import { colors } from '../components/colors';
import SearchBar from "react-native-dynamic-search-bar";
const { secondary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import SearchContainer from '../components/Containers/RowContainer';
import InfoCard from '../components/Cards/InfoCard';
import RegularButton from '../components/Buttons/RegularButton';

// styled components
import styled from 'styled-components/native';
import { ScreenHeight } from '../components/shared';

const TopBg = styled.View`
    background-color: ${ secondary };
    width: 100%;
    height: ${ ScreenHeight * 0.3 }px;
    border-radius: 30px;
    position: absolute;
    top: -30px;
`;

const Dashboard = () => {
    var businessList;
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
            var result = await response.json();
            businessList = result.businesses.map(function(business) {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const test = yelpFusion();

    return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}  >
       {/*<TopBg />*/}
       <MainContainer style= {{ backgroundColor: 'transparent' }}>
            <RegularButton onPress={console.log(test)} style={{ marginBottom: 20 }}>Yelp Fusion</RegularButton>
                <SearchBar
                    style={{
                        width: '100%',
                        marginTop: -10,
                        marginBottom: 10,
                    }}
                    placeholder="Search here"
                    onPress={() => alert("onPress")}
                    onChangeText={(text) => console.log(text)}
                />
                <SearchBar
                    style={{
                        width: '100%',
                        marginBottom: 10,
                    }}
                    placeholder="Location here"
                    onPress={() => alert("onPress")}
                    onChangeText={(text) => console.log(text)}
                />

                <InfoCard 
                image_url='chart-timeline-variant' 
                name='Starbucks' 
                rating='3.5 Stars - '
                review_count='29 Reviews' 
                price='$ ~ '
                address1='4000 Central Blvd' 
                city='Orlando '
                state="FL, "
                zip_code='32816 '
                title='Coffee & Tea' 
                style={{marginBottom: 10}} 
                />
                <InfoCard 
                image_url='chart-timeline-variant' 
                name='Starbucks' 
                rating='3.5 Stars - '
                review_count='29 Reviews' 
                price='$ ~ '
                address1='4000 Central Blvd' 
                city='Orlando '
                state="FL, "
                zip_code='32816 '
                title='Coffee & Tea' 
                style={{marginBottom: 10}} 
                />
       </MainContainer>
    </MainContainer>
    );
};

export default Dashboard;