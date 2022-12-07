import React, {useState, useEffect} from 'react'
import { View, RefreshControl, FlatList } from 'react-native'
import { colors } from '../components/colors'
import styled from 'styled-components/native';
import RegularText from '../components/Texts/RegularText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegularButton from '../components/Buttons/RegularButton';
import Info from '../components/Cards/Info';
import MainContainer from '../components/Containers/MainContainer';
import InfoCard from '../components/Cards/InfoCard';
import FavoriteCard from '../components/Cards/FavoriteCard';
const { primary} = colors;

const FavoritesView = styled.View`
    flex: 1;
    justify-content: 'center'; 
    align-items: 'center';
    background-color: primary;   
`;

const Favorites = () => {
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState(null);
    const [results, setResults] = useState([]);
    const [Refresh, setRefresh] = useState(false);

    const getFavorites = async () => {
        var _ud = await AsyncStorage.getItem('@MyApp_user');
        var ud = JSON.parse(_ud);
        var userId = ud._id;
        try {
            // call backend
            const response = await fetch('https://cop4331-1738.herokuapp.com/api/getfavorites', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                })
            });
            var res = JSON.parse(await response.text());
            setResults(res);
        } catch (error) {
            console.log(error.message);
        }
      };

    useEffect(() => {
        getFavorites();
      }, []);

      const onRefreshing = () => {
        setRefresh(true);
        setRefresh(false)
        getFavorites();
      }

    return (
        <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}  >
            <MainContainer style= {{ backgroundColor: 'transparent' }}>
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
                    <FavoriteCard result={ item } />
                    </View>
                );
                }}
            />
            </MainContainer>
        </MainContainer>
    );
};

export default Favorites;