import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getMyFormerPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from '../components/Pet.jsx'

const MyFormerPets = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pet.formerpets);
    const { message, error } = useSelector(state => state.pet);
    const user = useSelector(state => state.auth);

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
      dispatch(getMyFormerPets());
    }, []);

    return (
        
      <View>
      <View style={{ alignItems: 'center', width:'100%', height:66,backgroundColor:"#759",justifyContent: 'center'}}>
        <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#eee',marginLeft:20}}>MY FORMER PETS</Text>
      </View>
      <ScrollView style={{height:'90%'}}>
        {pets?.slice(0).reverse().map((data, index) => {
            return(
              <View key={index}>
                <View style={{height: 20}}></View>
                <Pet
                  _id = {data._id}
                  name = {data.name}
                  description = {data.description}
                  characteristics = {data.characteristics}
                  avatar = {data.avatar.url}
                  location = {data.area}
                  ownerId = {data.owner._id}
                  ownerAvatar = {data.owner.avatar.url}
                  ownerName = {data.owner.name}
                  isPhotoRequested = {data.isPhotoRequested}
                  requestedPhotos = {data.requestedPhotos}
                  solved = {data.solved}
                />
              </View>
            )
          })}
          
      </ScrollView>
      </View>
      
        
    )};
export default MyFormerPets;