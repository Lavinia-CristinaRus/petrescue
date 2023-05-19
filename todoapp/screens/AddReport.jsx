import { StyleSheet, Text, View, Image , ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { Button } from 'react-native-paper'
import { addReport, loadUser } from '../redux/action'
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
//to add characteristics
const AddReport = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth)
    const [reportName, setReportName] = useState("");
    const [reportDescription, setReportDescription] = useState("");
    const [reportImage, setReportImage] = useState("");
    const { loading, message, error } = useSelector(state => state.message)
    Location.setGoogleApiKey("AIzaSyAUqWMPfAQS19hQYWNffvRAqm0aHqja9IY");
    const [location, setLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
        return;
      }

      // Get current location
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.002,
      };
      setLocation(initialRegion);
      setMarkerPosition(initialRegion);
    })();
  }, []);

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };


    const dispatch = useDispatch()

    const handleImage = () => {
        navigation.navigate("camera", {
            addReport: true
        })
    };

    useEffect(() => {

        if (route.params) {
            if (route.params.image) {
                setReportImage(route.params.image)
            }
        }

    }, [route])

    const addReportHandler = async () => {
        await dispatch(addReport(reportName,reportImage,reportDescription,markerPosition))
        dispatch(loadUser())
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: "clearError" });
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message)
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch])

    return (
        <ScrollView style={styles.containerBig}>
        <View style={{justifyContent: 'center'}}>
        <View style={styles.horizontalPaddingView}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: user.avatar.url}}/>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={values.h1Style}>Hello, {user.name}</Text>
                    <Text style={values.pStyle}>Tell us about the stray pet you saw</Text>
                </View>
            </View>
            <View style={{height: 40}}></View>
        </View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleImage}>
            <View style={stylesChoosePhoto.container}>
                <Image style={stylesChoosePhoto.image} source={{ uri: reportImage ? reportImage : null}}/>
                {!reportImage &&
                <>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/uploadImage.jpg')}/>
                <Text style={values.h2Style}>Choose a Photo</Text>
                </>}
            </View>
        </TouchableOpacity>
        <View style={{height: 20}}></View>
        <View style={{alignItems: "center"}}>
        <View style={{ width: "75%"}}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={reportName}
                onChangeText={setReportName}
            />
        </View>
        <View style={{ width: "75%"}}>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={reportDescription}
                onChangeText={setReportDescription}
            />
        </View>
        <View style={{height: 20}}></View>
        <View style={styles.mapContainer}>
        {location && (
            <MapView
            provider = {PROVIDER_GOOGLE} 
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
            >
            {markerPosition && (
                <Marker
                coordinate={markerPosition}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
                />
            )}
            </MapView>
        )}
        </View>
        <View style={{height: 20}}></View>
        <Button
            style={styles.btn}
            onPress={addReportHandler}>
            <Text style={{ color: "#fff" }}>Report</Text>
        </Button>
        </View>
        </View>
        <View style={{height: 80}}></View>
        </ScrollView>
    );
};

export default AddReport;

const stylesChoosePhoto = StyleSheet.create({
    container: {
        width: '75%',
        height: 200,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    icon: {
        width: 150,
        height: 150,
        marginTop: -200
    }
    
})

const values = {
    horizontalPadding: 25,
    verticalPadding: 20,
    h1Style: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2Style: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    pStyle: {
        color: 'grey',
        fontSize: 12,
    },
    pWhiteStyle: {
        color: 'white',
        fontSize: 12,
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    containerBig: {
        flex: 1,
        paddingTop: values.verticalPadding + 40,
        backgroundColor: 'white'
    },
    horizontalPaddingView: {
        paddingHorizontal: values.horizontalPadding,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 15,
        marginVertical: 15,
        fontSize: 15,
    },
    btn: {
        backgroundColor: "#759",
        padding: 5,
        width: "70%",
    },
    map: {
        width: '98%',
        height: '98%',
    },
    mapContainer: {
        width: '75%',
        height: 150,
        borderColor: 'black',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

