import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../components/colors'
import BigText from '../components/Texts/BigText';
import SmallText from '../components/Texts/SmallText';
import RegularText from '../components/Texts/RegularText';
import RegularButton from '../components/Buttons/RegularButton';
const { primary, secondary} = colors;

// location
import * as Location from 'expo-location';

const Profile = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();

    const getName = async () => {
        var _ud = await AsyncStorage.getItem('@MyApp_user');
        var ud = JSON.parse(_ud);
        setFirstName(ud.firstName);
        setLastName(ud.lastName);
        setEmail(ud.email);
    }

    useEffect(() => {
        getName();
      }, []);

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

    const moveTo = (screen, payLoad) => {
        navigation.navigate(screen, {...payLoad});
    }

    const onLogout = async () => {
        // clear local storage
        AsyncStorage.clear();

        // move to login
        moveTo('Login');
    }

    const changePassword = async () => {
        // move to login
        moveTo('ChangePassword');
    }

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: primary}}>
        <View>
          <View style={{flexDirection: 'row', marginTop: 15, justifyContent:'center'}}>
            <Image 
              source={require('../../assets/squawkicon.png')}
              style={{
                height: 250, 
                width: 300, 
            }}
            />

          </View>
          <BigText style ={{textAlign: 'center', marginTop: -15, marginBottom: 15,}}>{firstName} {lastName}</BigText>

        </View>

        <View style={{alignItems:'center'}}>
          <View style={{flexDirection: 'row'}} >
            <Icon name="map-marker-radius" color="#fff" size={20}/>
            <SmallText style={{ marginLeft: 10, marginBottom: 10}}>{location}</SmallText>
          </View>
          
          <View  style={{flexDirection: 'row'}}>
            <Icon name="email" color="#fff" size={20}/>
            <SmallText style={{marginLeft: 10 }}>{email}</SmallText>
          </View>
        </View>

  
        <View style = {{marginLeft: 30, paddingVertical: 75}}>
          
          <TouchableOpacity onPress={() => {moveTo('Favorites')}}>
            <View  style = {{flexDirection: 'row', paddingBottom: 20}}>
              <Icon name="heart" color={secondary} size={30}/>
              <RegularText> Your Favorites</RegularText>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ changePassword }>
            <View style = {{flexDirection: 'row', paddingBottom: 20}}>
              <Icon name="lock" color={secondary} size={30}/>
              <RegularText> Change Password</RegularText>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ onLogout }>
            <View style = {{flexDirection: 'row'}}>
              <Icon name="logout" color={secondary} size={30}/>
              <RegularText> Logout</RegularText>
            </View>
          </TouchableOpacity>
        
        </View>
      </SafeAreaView>
    );
  };

export default Profile;