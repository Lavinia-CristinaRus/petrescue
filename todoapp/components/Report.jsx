import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector} from 'react-redux';
import { Button } from 'react-native-paper';
import ConfirmationRequest from './ConfirmationRequest';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Report = ({_id,name, description, characteristics, avatar, location, ownerId, ownerAvatar, ownerName, seen, solved, handleSeen, handleUnseen, pickUpHandler, confirmations, keyword, handleModify, handleDelete}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const isPetSeen = (id) => {return seen?.includes(id)};
  const [seenByUser, setSeen] = useState(isPetSeen(user.user._id));
  const [nrOfSeens, setNrOfSeens] = useState(seen.length);
  const [menu, setMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);

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
        {(ownerId == user.user._id && !solved)&& <TouchableOpacity onPress={()=>{setMenu(true)}}>
            <Feather name="more-vertical" style={{fontSize: 20}} />
          </TouchableOpacity>
        }
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
          <Text>
            {location}
          </Text>
      </View>
      {confirmations?<></>:
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {(ownerId!=user.user._id &&user.user.verified)&&<TouchableOpacity onPress={() => {if(seenByUser){ handleUnseen(); setNrOfSeens(nrOfSeens-1)} else {handleSeen(); setNrOfSeens(nrOfSeens+1)} setSeen(!seenByUser)}}>
            <AntDesign
              name={seenByUser ? 'eye' : 'eyeo'}
              style={{
                paddingRight: 10,
                fontSize: 20,
                color:'black',
              }}
            />
          </TouchableOpacity>}
          <Text>
            Seen by {(seenByUser || ownerId==user.user._id ) ? "you"+ ((nrOfSeens>0)? " and "+ nrOfSeens + " others" :""):nrOfSeens+1} 
          </Text>
        </View>
      </View>}
      <View style={{height: 10}}></View>
      {confirmations?
        (confirmations.slice(0).reverse().map((data, index) => {
          return(
            <View key={index}>
              <View style={{height: 20}}></View>
              <ConfirmationRequest
                _id = {data._id}
                avatar = {data.avatar.url}
                description = {data.description}
                ownerId = {data.owner._id}
                ownerAvatar = {data.owner.avatar.url}
                ownerName = {data.owner.name}
                valid = {data.valid}
                accepted = {data.accepted}
                keyword = {keyword}
              />
            </View>
          )
        }))
      :(ownerId != user.user._id?<Button
        style={styles.btn}
        onPress={pickUpHandler}>
        <Text style={{ color: "#fff" }}>Pick up!</Text>
        </Button>:<></>
      )}
      {(menu||deleteMenu) && <View>
        <View style={{position: "absolute", width:'93%', height:185, backgroundColor: 'rgba(128, 128, 128, 0.5)', bottom:95, borderRadius: 50, left:12}}>
          <TouchableOpacity style={{width:'100%', height:'100%'}}>
          </TouchableOpacity>
        </View>
        
        {menu&&<View style={styles.menuView}>
            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-end',right:15, top:5}}>
            <Icon name="times-circle" size={25} color="#759" onPress={()=>{setMenu(false)}}/>
            </TouchableOpacity>
            <View style={{paddingHorizontal:20, top:20}}>
            <Button
                color='purple'
                onPress={handleModify}
              >
                Modify report
              </Button>
              <View style ={{height:15}}></View>
              <Button
                color='purple'
                onPress={()=>{setMenu(false);setDeleteMenu(true)}}
              >
                Delete report
              </Button>
            </View>
            <View style={{height: 40}}></View>
          </View>}
          {deleteMenu&&<View style={styles.menuView}>
            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-end',right:15, top:5}}>
            <Icon name="times-circle" size={25} color="#759" onPress={()=>{setDeleteMenu(false)}}/>
            </TouchableOpacity>
            <View style={{paddingHorizontal:30, top:20}}>
              <Text style={{fontSize: 15}}>Are you sure you want to delete this report?</Text>
              <View style={{height: 20}}></View>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Button
                    color='purple'
                    onPress={()=>{handleDelete();setDeleteMenu(false)}}
                  >
                    Yes
                  </Button>
                  <View style={{width: 50}}></View>
                  <Button
                    color='purple'
                    onPress={()=>{setDeleteMenu(false)}}
                  >
                    No
                  </Button>
                </View>
            </View>
            <View style={{height: 40}}></View>
          </View>}
          </View>}
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
  menuView: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    width: '90%',
    content: 'fill',
    position: "absolute",
    bottom:100,
    height:175,
    alignSelf:'center',
  },
})

export default Report;