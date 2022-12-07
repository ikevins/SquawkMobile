import React, {useState,  useEffect} from 'react';

import { Platform, View, RefreshControl, FlatList } from "react-native";

import { colors } from '../components/colors';
import SearchBar from "../components/Search/SearchBar";
const { secondary } = colors;

import AsyncStorage from '@react-native-async-storage/async-storage';

// customer components
import MainContainer from '../components/Containers/MainContainer';
import Info from '../components/Cards/Info';
import RegularButton from '../components/Buttons/RegularButton';
import SearchResults from "../components/Search/SearchResults";
import InfoCard from '../components/Cards/InfoCard';

// location
import * as Location from 'expo-location';

const Dashboard = () => {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState(null);
    const [searchApi, results] = SearchResults();
    const [Refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let currentLocation = await Location.getCurrentPositionAsync({});
          let address = await Location.reverseGeocodeAsync(currentLocation.coords);
          setLocation(address[0].city + ', ' + address[0].region);
        })();
      }, []);

      const onRefreshing = () => {
        setRefresh(true);
        setRefresh(false);
        searchApi('', location);
      }


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
            <FlatList
              refreshControl={
                <RefreshControl 
                  refreshing={Refresh} 
                  onRefresh={onRefreshing}
                />
              }
              vertical
              data={results}
              showsVerticalScrollIndicator={false}
              keyExtractor={(result) => result.id}
              renderItem={({ item }) => {
              return (
                <View>
                  <InfoCard result={ item } />
                </View>
              );
              }}
            />
       </MainContainer>
    </MainContainer>
    );
};

export default Dashboard;