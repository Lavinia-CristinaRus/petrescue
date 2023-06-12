import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getReceivedConfirmations} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from '../components/Report.jsx'
import { SearchBar } from 'react-native-elements';
//for sent requests, the requests can be retrieved using find({owner:userId}) and reports info filled using populate
//for received requests, the reports will be retrieved using find({owner:userId}) and for each report the requests will be retrieved using find({report:reportId})
const ReceivedConfirmaionRequests = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const reports = useSelector(state => state.confirmation.receivedreports);
    const confirmations = useSelector(state => state.confirmation.receivedconfirmations);
    const { message, error } = useSelector(state => state.report);
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
    }, [alert, error, message, dispatch]);

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
      dispatch(getReceivedConfirmations());
    }, []);

    return (
      <View>
      <View>
      <SearchBar
        placeholder="Search through stray pets you reported..."
        value={""}
        containerStyle={{backgroundColor: "#759"}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
      />
      </View>
      <ScrollView style={{height:'90%'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%', height:47}}>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("sentconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW SENT{'\n'}CONFIRMATION REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("reports")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW STRAY{'\n'}PET REPORTS</Text>
          </TouchableOpacity>
        </View>
        {reports?.slice(0).reverse().map((data, index) => {

            return(
              <View key={index}>
                <View style={{height: 20}}></View>
                <Report
                  _id = {data._id}
                  name = {data.name}
                  description = {data.description}
                  characteristics = {data.characteristics}
                  avatar = {data.avatar.url}
                  location = {data.area.location}
                  ownerId = {data.owner._id}
                  ownerAvatar = {data.owner.avatar.url}
                  ownerName = {data.owner.name}
                  seen ={data.seen}
                  confirmations = {confirmations?confirmations[index]:[]}
                />
              </View>
            )
          })}
      </ScrollView>
      </View>
      
        
    )};
export default ReceivedConfirmaionRequests;