import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
//to see how to personalize this map

const Map = ({navigation}) => {
  Location.setGoogleApiKey("AIzaSyAUqWMPfAQS19hQYWNffvRAqm0aHqja9IY");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
    };
    getPermissions();
    getCurrentLocation();
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
    }
  };

  return (

    <View style={styles.container}>
      {location && <MapView provider = {PROVIDER_GOOGLE} style={styles.map} initialRegion = {location} showsUserLocation = {true}/>}
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
});