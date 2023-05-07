import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch} from 'react-redux';
import {seenPet, unseenPet} from '../redux/action';

const Report = (_id,name, characteristics, avatar, area, owner, createdAt, solved, valid, seen) => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const isPetSeen = id => seen?.includes(id);
  const isSeen = isPetSeen(user._id);
  const [seenByUser, setSeen] = useState(isSeen);
  const handleSeen = (id) => {
    dispatch(seenPet(id));
    setSeen(usersSeen => [...usersSeen, id]);
  }

  const handleUnseen = (id) => {
      dispatch(unseenPet(id));
      setSeen(usersSeen => usersSeen.filter(userId => userId !== id));
  }
  return (
          <View
            key={_id}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={owner.avatar.url}
                  style={{width: 40, height: 40, borderRadius: 100}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {name}
                  </Text>
                </View>
              </View>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={avatar.url}
                style={{width: '90%', height: 300, borderRadius: 25}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => seenByUser ? handleUnseen(user._id) : handleSeen(user._id)}>
                  <AntDesign
                    name={seenByUser ? 'eye' : 'eyeo'}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: seenByUser ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text>
                Seen by {seenByUser ? 'you and' : ''}{' '}
                {seenByUser ? seen + 1 : seen} others
              </Text>
              <Text>
                {area}
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                {characteristics}
              </Text>
            </View>
          </View>
  );
};

export default Report;