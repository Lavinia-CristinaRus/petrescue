import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch} from 'react-redux';

const Pet = ({_id,name, characteristics, avatar, area, owner, ownerPicture, createdAt, solved, valid, otp_expiry}, isFavourite) => {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(isFavourite);
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
                  source={ownerPicture.url}
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
                source={avatar}
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
              <TouchableOpacity onPress={() => setFavourite(!favourite)}>
                  <AntDesign
                    name={favourite ? 'heart' : 'hearto'}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: favourite ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionic
                    name="ios-chatbubble-outline"
                    style={{fontSize: 20, paddingRight: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
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

export default Pet;