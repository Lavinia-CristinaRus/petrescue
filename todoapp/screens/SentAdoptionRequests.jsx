import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getSentAdoptionRequests} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from '../components/Pet.jsx'
import { SearchBar } from 'react-native-elements';
//for sent requests, the requests can be retrieved using find({owner:userId}) and reports info filled using populate

const SentAdoptionRequests = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const requests = useSelector(state => state.adoption.request);
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
      dispatch(getSentAdoptionRequests(keyword));
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
              onPress={() => navigation.navigate("pets")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW ADOPTION{'\n'}ANNOUNCEMENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedadoptionrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW ADOPTION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {requests?.slice(0).reverse().map((data, index) => {
          var reqs = [];
          var req = {_id: data._id,
            createdAt: data.createdAt,
            message: data.message,
            owner: data.owner,
            valid: data.valid,
            accepted: data.accepted
          };
          reqs.push(req);

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
                  requests = {reqs}
                  keyword = {keyword}
                />
              </View>
            )
          })}
          
      </ScrollView>
      </View>
      
        
    )};
export default SentAdoptionRequests;