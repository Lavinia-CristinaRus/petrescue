import React, { useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { sendPhoto, requestPhoto, getMyFormerPets, getAdoptedPets } from '../redux/action';
import { useDispatch, useSelector} from 'react-redux';
import { Button } from 'react-native-paper';
import mime from 'mime';

const RequestedPhotos = ({ownerId, petId, isPhotoRequested, requestedPhotos, handleImage, image, petImageId}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const [requested, setRequested] = useState(isPhotoRequested);
  const [petImage, setPetImage] = useState("");

  useEffect(() => {
    if(petImageId==petId){
        setPetImage(image);
    }
    else {
        setPetImage("");
    }
  }, [image])


  const sendPhotoHandler = async () => {
    setRequested(false);
    const myForm = new FormData();
    myForm.append("petId", petId);
    myForm.append("petImage", {
        uri: petImage,
        type: mime.getType(petImage),
        name: petImage.split("/").pop()
    })
    await dispatch(sendPhoto(myForm));
    await dispatch(getAdoptedPets());
  }

  const requestPhotoHandler = async () => {
    setRequested(true);
    await dispatch(requestPhoto(petId));
    await dispatch(getMyFormerPets());
  }
  

  return (
    <View style={styles.customView}>
      <View style={{height: 10}}></View>
      {requestedPhotos?
        (requestedPhotos.slice(0).map((data, index) => {
          return(
            <View>
                <View style={{height: 15}}></View>
                <View style={stylesChoosePhoto.container}>
                    <Image
                        source={{uri:data.url}}
                        style={stylesChoosePhoto.image}
                    />
                    
                </View>
            </View>
          )
        })):<></>
      }
      <View style={{height: 15}}></View>
      {(ownerId == user.user._id && !requested)?<Button
            style={styles.btn}
            onPress={requestPhotoHandler}>
            <Text style={{ color: "#fff" }}>Request photo</Text>
            </Button>: (ownerId == user.user._id && requested)?
            <Text style={{fontWeight: 'bold', fontSize: 16, color:'#759', alignSelf:'center'}}>Photo was requested</Text> :
            requested?
            <View style={styles.customView}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>{handleImage(petId)}}>
                    <View style={stylesChoosePhoto.container}>
                        <Image style={stylesChoosePhoto.image} source={{ uri: petImage ? petImage : null}}/>
                        {!petImage &&
                        <>
                        <Image style={stylesChoosePhoto.icon} source={require('../assets/uploadPetImage.jpg')}/>
                        <Text style={values.h2Style}>Choose a Photo</Text>
                        </>}
                    </View>
                </TouchableOpacity>
                <View style={{height: 15}}></View>
                <Button
                style={styles.btn}
                onPress={sendPhotoHandler}>
                <Text style={{ color: "#fff" }}>Send photo</Text>
                </Button>
            </View>
            :<></>
        }
    </View>
  );
};

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
        width: 180,
        height: 200,
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
        height: 200,
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

export default RequestedPhotos;