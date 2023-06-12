import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getSentConfirmationRequests} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from '../components/Report.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {seenPet, unseenPet} from '../redux/action';
//for sent requests, the requests can be retrieved using find({owner:userId}) and reports info filled using populate
//for received requests, the reports will be retrieved using find({owner:userId}) and for each report the requests will be retrieved using find({report:reportId})
const SentConfirmaionRequests = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const reports = useSelector(state => state.confirmation.confirmation);
    const { message, error } = useSelector(state => state.report);
    const { messageConf, errorConf } = useSelector(state => state.confirmation);
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
      dispatch(getSentConfirmationRequests());
    }, []);

    return (
      <View>
      <View>
      <SearchBar
        placeholder="Search through stray pets reports..."
        value={""}
        containerStyle={{backgroundColor: "#759"}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
      />
      </View>
      <ScrollView style={{height:'90%'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%', height:47}}>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("reports")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW STRAY{'\n'}PET REPORTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW CONFIRMATION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {reports?.slice(0).reverse().map((data, index) => {
          var confirms = [];
          var conf = {_id: data._id,
            createdAt: data.createdAt,
            avatar: data.avatar,
            description: data.description,
            owner: data.owner,
            valid: data.valid,
            accepted: data.accepted
          };
          confirms.push(conf);

            return(
              <View key={index}>
                <View style={{height: 20}}></View>
                <Report
                  _id = {data.report._id}
                  name = {data.report.name}
                  description = {data.report.description}
                  characteristics = {data.report.characteristics}
                  avatar = {data.report.avatar.url}
                  location = {data.report.area.location}
                  ownerId = {data.report.owner._id}
                  ownerAvatar = {data.report.owner.avatar.url}
                  ownerName = {data.report.owner.name}
                  seen ={data.report.seen}
                  confirmations = {confirms}
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
        <Icon name="plus-circle" size={45} color="#759" onPress={() => navigation.navigate("addreport")}/>
      </View>
      </View>
      
        
    )};
export default SentConfirmaionRequests;