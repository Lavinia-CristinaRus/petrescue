import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllReports} from '../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Map = ({navigation}) => {
  Location.setGoogleApiKey("AIzaSyAUqWMPfAQS19hQYWNffvRAqm0aHqja9IY");
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const reports = useSelector(state => state.report.report);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [aggression, setAggression] = useState("");
  const [seenBy, setSeenBy] = useState(0);
  // const { message, error } = useSelector(state => state.report);


  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    };
    getPermissions();
    getCurrentLocation();
    dispatch(getAllReports("", "", "", "", "", ""));
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.004,
        });
      }
    } catch (error) {
      console.log('Error retrieving location:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#759" />
      </View>
    );
  }

  return (

    <View style={styles.container}>
      {location && <MapView 
        provider = {PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion = {location}
        showsUserLocation = {true}>
          {reports?.slice(0).map((data, index) => {
              return (
                <Marker
                  coordinate={data.area}
                  key = {index}
                  pinColor = {(data.characteristics[3] ==="low"?'#396':(data.characteristics[3] ==="medium"?'orange':(data.characteristics[3] ==="high"?'red':'purple')))}
                  onPress = {()=>{setDescription(data.description); setTitle(data.name); setAvatar(data.avatar.url); setSeenBy(data.seen.length);setAggression(data.characteristics[3])}}
                >
                </Marker>
              )
          })}
        
        </MapView>}
        {(title!="" && description!="") && <View style={styles.customView}>
            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-end',right:15, top:5}}>
            <Icon name="times-circle" size={25} color="#759" onPress={()=>{setTitle("");setDescription("")}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', paddingHorizontal:15, top:5}}>
              <Image
                source={{uri:avatar}}
                style={{width: 125, height: 125, borderRadius: 20}}
              />
              <View style={{marginLeft:15, width:180}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{title}</Text>
                <View style={{height: 5}}></View>
                <Text style={{fontSize: 14}}>{description}</Text>
                <Text style={{fontSize: 14}}>Aggression level: {aggression}</Text>
                <Text style={{fontSize: 14}}>Seen by {seenBy}</Text>
              </View>
            </View>
            <View style={{height: 20}}></View>
          </View>}
    </View>
  );
}
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customView: {
    backgroundColor: "#ffff",
    borderRadius: 50,
    padding: 5,
    width: '90%',
    content: 'fill',
    position: "absolute",
    bottom:10,
    alignSelf:'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});