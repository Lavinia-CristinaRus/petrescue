import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {getAllReports} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from './../components/Report.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {seenPet, unseenPet} from '../redux/action';

const Reports = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const reports = useSelector(state => state.report.report);
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
      dispatch(getAllReports());
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
              onPress={() => navigation.navigate("sentconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548',}}>VIEW SENT{'\n'}CONFIRMATION REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548',}}>VIEW CONFIRMATION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {reports?.slice(0).reverse().map((data, index) => {

            const handleSeen = async (id) => {
              await dispatch(seenPet(id));
              dispatch(getAllReports());
            }
            const handleUnseen = async (id) => {
              await dispatch(unseenPet(id));
              dispatch(getAllReports());
            }
            const pickUpHandler = async () => {
              navigation.navigate("addconfirmation",{reportId:data._id});
            }

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
                  handleSeen = {handleSeen}
                  handleUnseen = {handleUnseen}
                  pickUpHandler = {pickUpHandler}
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
export default Reports;