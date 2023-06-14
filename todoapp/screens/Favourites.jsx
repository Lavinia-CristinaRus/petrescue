import React, {useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {getFavourites, loadUser} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from './../components/Pet.jsx'
import {savePet, unsavePet} from '../redux/action';

const Favourites = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const pets = useSelector(state => state.pet.favourites);
    const { message, error } = useSelector(state => state.pet);
    const user = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getFavourites());
      }, []);
  
    return (
      <View>
      <View>
      <View style={{ alignItems: 'center', width:'100%', height:66,backgroundColor:"#759",justifyContent: 'center'}}>
      <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#eee',marginLeft:20}}>FAVOURITES</Text>
      </View>
      </View>
      <ScrollView style={{height:'90%'}}>
        {pets?.slice(0).reverse().map((data, index) => {
            const handleSave = async () => {
              await dispatch(savePet(data._id));
              await dispatch(loadUser());
            }
            const handleUnsave = async () => {
              await dispatch(unsavePet(data._id));
              await dispatch(loadUser());
            }
            const adoptHandler = async () => {
            navigation.navigate("addrequest",{pet:data._id});
            }

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
                  saved ={true}
                  handleSave = {handleSave}
                  handleUnsave = {handleUnsave}
                  adoptHandler = {adoptHandler}
                  solved = {data.solved}
                />
              </View>
            )
          })}
          
      </ScrollView>
      </View>
      
        
    )};
export default Favourites;