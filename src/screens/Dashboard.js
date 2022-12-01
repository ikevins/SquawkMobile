import React, {useState,  useEffect} from 'react';

import { Platform, View, Text, StyleSheet, ScrollView } from "react-native";

import { colors } from '../components/colors';
import SearchBar from "../components/Search/SearchBar";
const { secondary } = colors;

// customer components
import MainContainer from '../components/Containers/MainContainer';
import Info from '../components/Cards/Info';
import RegularButton from '../components/Buttons/RegularButton';
import SearchResults from "../components/Search/SearchResults";

// location
import * as Location from 'expo-location';

const Dashboard = () => {
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState(null);
    const [searchApi, results] = SearchResults();
    var apiKey = 'ygXg7nrp2TH3X_CpYBzRw-x0QN1-D5owhXyg2h6kI80cxwG-gDh3SNjpxU3X4T55tj-7PyQL7WZ8U2_rT0hxrkRU5nBXZnZGBjFNAOyWWEJ8aPhP4W3J4FPXrZVQY3Yx';

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          let address = await Location.reverseGeocodeAsync(location.coords);
          setLocation(address[0].city + ', ' + address[0].region);
          console.log(address[0].city + ', ' + address[0].region);
        })();
      }, []);

    return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}  >
        <MainContainer style= {{ backgroundColor: 'transparent' }}>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term, location)}
                placeholder='Search term here'
                icon="magnify" 
            />
            <SearchBar
                term={location}
                onTermChange={setLocation}
                onTermSubmit={() => searchApi(term, location)}
                placeholder={location}
                isLocation={true}
                icon="map-marker"
                location={location}
            />
            <View>
                <Info
                results={results}
                />
            </View>
            {/*<RegularButton onPress={} style={{ marginBottom: 20 }}>Yelp Fusion</RegularButton>*/}
       </MainContainer>
    </MainContainer>
    );
};

export default Dashboard;