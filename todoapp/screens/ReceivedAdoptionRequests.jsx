import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getReceivedRequests, getAllPets, deletePet} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from '../components/Pet.jsx'
import { SearchBar } from 'react-native-elements';
//for received requests, the pets will be retrieved using find({owner:userId}) and for each pet the requests will be retrieved using find({pet:petId})

const ReceivedAdoptionRequests = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const requests = useSelector(state => state.adoption.receivedrequests);
    const pets = useSelector(state => state.adoption.receivedpets);
    const { message, error } = useSelector(state => state.adoption);
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
      dispatch(getReceivedRequests(keyword));
    }, [keyword]);

    return (
      <View>
      <View>
      <SearchBar
        placeholder="Search through pets requested for adoption..."
        value={keyword}
        onChangeText = {setKeyword}
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
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("pets")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW ADOPTION{'\n'}ANNOUNCEMENTS</Text>
          </TouchableOpacity>
        </View>
        {pets?.slice(0).reverse().map((data, index) => {
          const handleDelete = async () => {
            await dispatch(deletePet(data._id));
            dispatch(getReceivedRequests(keyword));
            dispatch(getAllPets("", "", "", "", "", ""));
          }
          const handleModify = async () => {
            navigation.navigate("modifypet",{pet:data});
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
                  requests = {requests?requests[pets.length-index-1]:[]}
                  solved = {data.solved}
                  handleDelete = {handleDelete}
                  handleModify = {handleModify}
                  keyword = {keyword}
                />
              </View>
            )
          })}
          
      </ScrollView>
      </View>
      
        
    )};
export default ReceivedAdoptionRequests;