import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getAdoptedPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from '../components/Pet.jsx'

const PhotoRequests = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.adoption.adoptedpets);
    const { message, error } = useSelector(state => state.adoption);
    const user = useSelector(state => state.auth);
    const [petImage, setPetImage] = useState("");
    const [petImageId, setPetImageId] = useState("");

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

    useEffect(() => {
      dispatch(getAdoptedPets());
    },[]);

    const handleImage = (petId) => {
        navigation.navigate("camera", {
            photoRequests: true,
            petId: petId
        })
    };

    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setPetImage(route.params.image)
                setPetImageId(route.params.petId)
            }
        }
      }, [route])

    return (
      <View>
      <View style={{ alignItems: 'center', width:'100%', height:66,backgroundColor:"#759",justifyContent: 'center'}}>
        <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#eee',marginLeft:20}}>PHOTO REQUESTS</Text>
      </View>
      <ScrollView style={{height:'90%'}}>
        {pets?.slice(0).reverse().map((data, index) => {
            return(
              <View key={index}>
                <View style={{height: 20}}></View>
                <Pet
                  _id = {data.pet._id}
                  name = {data.pet.name}
                  description = {data.pet.description}
                  characteristics = {data.pet.characteristics}
                  avatar = {data.pet.avatar.url}
                  location = {data.pet.area}
                  ownerId = {data.pet.owner._id}
                  ownerAvatar = {data.pet.owner.avatar.url}
                  ownerName = {data.pet.owner.name}
                  isPhotoRequested = {data.pet.isPhotoRequested}
                  requestedPhotos = {data.pet.requestedPhotos}
                  solved = {data.pet.solved}
                  handleImage = {handleImage}
                  image = {petImage}
                  petImageId = {petImageId}
                />
              </View>
            )
          })}
          
      </ScrollView>
      </View>
      
        
    )};
export default PhotoRequests;