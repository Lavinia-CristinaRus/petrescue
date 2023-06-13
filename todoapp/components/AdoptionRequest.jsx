import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector} from 'react-redux';
import {retractAdoptionRequest, acceptAdoptionRequest, rejectAdoptionRequest,
  getSentAdoptionRequests, getReceivedRequests, getAllPets} from '../redux/action';
import { Button } from 'react-native-paper';

const AdoptionRequest = ({_id, description, ownerId, ownerAvatar, ownerName, valid, accepted,keyword}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const retractRequestHandler = async () => {
    await dispatch(retractAdoptionRequest(_id));
    dispatch(getSentAdoptionRequests(keyword));
  }
  const acceptRequestHandler = async () => {
    await dispatch(acceptAdoptionRequest(_id));
    dispatch(getReceivedRequests(keyword));
    dispatch(getAllPets("", "", "", "", "", ""));
  }
  const rejectRequestHandler = async () => {
    await dispatch(rejectAdoptionRequest(_id));
    dispatch(getReceivedRequests(keyword));
  }

  return (
    <View style={styles.customView}
      key={_id}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
        >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri:ownerAvatar}}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
          <View style={{paddingLeft: 5}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {ownerName}
            </Text>
          </View>
        </View>
      </View>
    <View style={{alignItems:'center', width:'100%'}}>
        <Text style={{fontSize: 14}}>{description}</Text>
    </View>
      <View style={{height: 20}}></View>
      {((!valid)? <Text style={{ color: "#759", alignSelf:'center',fontWeight:'bold' }}>Request retracted</Text> : (accepted==true?<Text style={{ color: "#099", alignSelf:'center',fontWeight:'bold' }}>Request accepted</Text>:(accepted==false?<Text style={{ color: "#900", alignSelf:'center',fontWeight:'bold' }}>Request rejected</Text>:((ownerId == user.user._id)?
        <Button
            style={[styles.btn, {backgroundColor: "#759"}]}
            onPress={retractRequestHandler}>
            <Text style={{ color: "#fff" }}>Retract request!</Text>
        </Button>
        :<View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '50%'}}>
                <Button
                    style={[styles.btn, {backgroundColor: "#075"}]}
                    onPress={acceptRequestHandler}>
                    <Text style={{ color: "#fff" }}>Accept</Text>
                </Button>
            </View>
            <View style={{width: '50%'}}>
                <Button
                    style={[styles.btn, {backgroundColor: "#933"}]}
                    onPress={rejectRequestHandler}>
                    <Text style={{ color: "#fff" }}>Reject</Text>
                </Button>
            </View>
        </View>
      ))))}
      <View style={{height: 15}}></View>
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
    width: "70%",
    padding:0,
    alignSelf:'center',
    borderRadius: 50
  },
})

export default AdoptionRequest;