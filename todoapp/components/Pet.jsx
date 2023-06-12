import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector} from 'react-redux';
import { Button } from 'react-native-paper';
import AdoptionRequest from './AdoptionRequest';

const Pet = ({_id,name, description, characteristics, avatar, location, ownerId, ownerAvatar, ownerName, saved, handleSave, handleUnsave, adoptHandler, requests}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const [savedByUser, setSaved] = useState(saved);

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
        {(ownerId == user.user._id)&&<Feather name="more-vertical" style={{fontSize: 20}} />}
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={{uri:avatar}}
            style={{width: 125, height: 150, borderRadius: 25}}
          />
        </View>
        <View style={{marginLeft:20, width:180}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
          <View style={{height: 5}}></View>
          <Text style={{fontSize: 14}}>{description}</Text>
          <View style={{height: 5}}></View>
          <Text style={{fontSize: 14}}>Animal: {characteristics?characteristics[0]:"unknown"}</Text>
          <Text style={{fontSize: 14}}>Size: {characteristics?characteristics[1]:"unknown"}</Text>
          <Text style={{fontSize: 14}}>Age category: {characteristics?characteristics[2]:"unknown"}</Text>
          <Text style={{fontSize: 14}}>Aggression level: {characteristics?characteristics[3]:"unknown"}</Text>
          <Text style={{fontSize: 14}}>Health: {characteristics?characteristics[4]:"unknown"}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingTop: 10,
        }}>
          <Text style={{fontSize: 14}}>{location}</Text>
      </View>
      {requests?<></>:<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {savedByUser ? handleUnsave(_id): handleSave(_id); setSaved(!savedByUser)}}>
            <AntDesign
              name={savedByUser ? 'heart' : 'hearto'}
              style={{
                paddingRight: 10,
                fontSize: 20,
                color:'purple',
              }}
            />
          </TouchableOpacity>
          <Text>
            Add pet to favourites!
          </Text>
        </View>
      </View>}
      <View style={{height: 10}}></View>
      {requests?
        (requests.slice(0).reverse().map((data, index) => {
          return(
            <View key={index}>
              <View style={{height: 20}}></View>
              <AdoptionRequest
                _id = {data._id}
                description = {data.message}
                ownerId = {data.owner._id}
                ownerAvatar = {data.owner.avatar.url}
                ownerName = {data.owner.name}
                valid = {data.valid}
                accepted = {data.accepted}
              />
            </View>
          )
        }))
      :(ownerId != user.user._id?
        <Button
            style={styles.btn}
            onPress={adoptHandler}>
            <Text style={{ color: "#fff" }}>Adopt!</Text>
        </Button>:<></>)
      }
      <View style={{height: 15}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  customView: {
    backgroundColor: "#ffff",
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    content: 'fill',
    alignSelf:'center',
    paddingBottom: 10
  },
  btn: {
    backgroundColor: "#759",
    width: "50%",
    padding:0,
    alignSelf:'center',
    borderRadius: 50
  },
})

export default Pet;