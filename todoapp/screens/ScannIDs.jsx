import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {scannIds} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import mime from 'mime';

const ScannIDs = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [adopterICImage, setAdopterICImage] = useState("");
    const [ownerICImage, setOwnerICImage] = useState("");
    const { message, error } = useSelector(state => state.pet);

    useEffect(() => {
      if (error) {
          alert(error);
          dispatch({ type: "clearError" });
      }
      if (message) {
          alert(message.message)
          dispatch({ type: "clearMessage" });
      }
  }, [alert, error, message, dispatch])


    const handleImage1 = () => {
        navigation.navigate("camera", {
            identityCard1: true,
            adopterImage: adopterICImage,
            ownerImage: ownerICImage
        })
    };
    const handleImage2 = () => {
        navigation.navigate("camera", {
            identityCard2: true,
            adopterImage: adopterICImage,
            ownerImage: ownerICImage
        })
    };
    const scannIdsHandler = async () => {
        const myForm = new FormData();
        myForm.append("ownerImage", {
        uri: ownerICImage,
        type: mime.getType(ownerICImage),
        name: ownerICImage.split("/").pop()
        })
        myForm.append("adopterImage", {
            uri: adopterICImage,
            type: mime.getType(adopterICImage),
            name: adopterICImage.split("/").pop()
            })
        await dispatch(scannIds(myForm));
        navigation.navigate("generatecontract");
    }

    useEffect(() => {
        if (route.params) {
            if (route.params.ownerImage||route.params.adopterImage) {
                setOwnerICImage(route.params.ownerImage)
                setAdopterICImage(route.params.adopterImage)
            }
        }
      }, [route])

    return (
      <View>
      <View style={{ alignItems: 'center', width:'100%', height:66,backgroundColor:"#759",justifyContent: 'center'}}>
        <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#eee',marginLeft:20}}>Scann IDs</Text>
      </View>
      <ScrollView style={{height:'90%'}}>
      <View style={styles.customView}>
      <View style={{height: 25}}></View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{handleImage1()}}>
            <View style={stylesChoosePhoto.container}>
                <Image style={stylesChoosePhoto.image} source={{ uri: ownerICImage ? ownerICImage : null}}/>
                {!ownerICImage &&
                <>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/identityCard.jpg')}/>
                <Text style={values.h2Style}>Upload owner identity card</Text>
                </>}
            </View>
        </TouchableOpacity>
        <View style={{height: 25}}></View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{handleImage2()}}>
            <View style={stylesChoosePhoto.container}>
                <Image style={stylesChoosePhoto.image} source={{ uri: adopterICImage ? adopterICImage : null}}/>
                {!adopterICImage &&
                <>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/identityCard.jpg')}/>
                <Text style={values.h2Style}>Upload adopter identity card</Text>
                </>}
            </View>
        </TouchableOpacity>
        <View style={{height: 35}}></View>
        <Button
        style={styles.btn}
        onPress={scannIdsHandler}>
        <Text style={{ color: "#fff" }}>Scann IDs</Text>
        </Button>
        </View>
          
      </ScrollView>
      </View>
      
        
    )};
export default ScannIDs;

const styles = StyleSheet.create({
    customView: {
      backgroundColor: "#eee",
      borderRadius: 50,
      paddingHorizontal: 10,
      width: '90%',
      content: 'fill',
      alignSelf:'center',
      paddingBottom: 10
    },
    btn: {
      backgroundColor: "#759",
      width: "80%",
      padding:0,
      alignSelf:'center',
      borderRadius: 50
    },
  })

const stylesChoosePhoto = StyleSheet.create({
    container: {
        width: 350,
        height: 220,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        backgroundColor:"#fff"
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 15,
    },
    icon: {
        width: 170,
        height: 170,
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