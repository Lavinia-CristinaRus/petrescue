import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getAllPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from './../components/Pet.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {savePet, unsavePet} from '../redux/action';

const Pets = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const pets = useSelector(state => state.pet.pet);
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
      dispatch(getAllPets());
    }, []);
  
    return (
      <View>
      <View>
      <SearchBar
        placeholder="Search through pets for adoption..."
        value={""}
        containerStyle={{backgroundColor: "#759"}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
      />
      </View>
      <ScrollView style={{height:'90%'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%', height:47}}>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("sentadoptionrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW SENT{'\n'}ADOPTION REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedadoptionrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW ADOPTION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {pets?.slice(0).reverse().map((data, index) => {
            const handleSave = async (id) => {
              await dispatch(savePet(id));
              dispatch(getAllPets());
            }
            const handleUnsave = async (id) => {
              await dispatch(unsavePet(id));
              dispatch(getAllPets());
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
                  saved ={user.user.savedPets?.includes(data._id)}
                  handleSave = {handleSave}
                  handleUnsave = {handleUnsave}
                  adoptHandler = {adoptHandler}
                />
              </View>
            )
          })}
          
      </ScrollView>
      <View
        style={{
          paddingTop: 10,
          alignItems: 'center',
          width:70,
          height:80,
          borderRadius:80,
          backgroundColor:"#ffff",
          alignSelf:'flex-end',
          position: 'absolute',
          bottom: -25, zIndex: 1
        }}>
        <Icon name="plus-circle" size={45} color="#759" onPress={() => navigation.navigate("addpet")}/>
      </View>
      </View>
      
        
    )};
export default Pets;