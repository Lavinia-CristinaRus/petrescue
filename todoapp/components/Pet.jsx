import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Allpets, getAllPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const Pet = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const {pets} = useSelector(state => state.pets);
  // const [PetImage, setPetImage] = useState(pets[1].image);
  // const [petDescription, setPetDescription] = useState(pets[1].description);
  // useEffect(() => {
  //   dispatch(AllPets());
  // }, []);
  // const test = () => {
  //     console.log(pets);
  // }

  const petInfo = [
    // {
    //   petTitle: {name},
    //   petPersonImage: {avatar},
    //   petImage: require('../assets/pet2.jpg'),
    //   description: 'Apartament de vanzare',
    //   likes: 765,
    //   isLiked: false,
    // },
    {
      petTitle: 'Lavinia',
      petPersonImage: require('../assets/userProfile.jpg'),
      petImage: require('../assets/pet2.jpg'),
      description: 'Apartament de vanzare',
      likes: 345,
      isLiked: false,
    },
    {
      petTitle: 'Ana',
      petPersonImage: require('../assets/userProfile.jpg'),
      petImage: require('../assets/pet3.jpg'),
      description: 'S-a renovat fatada blocului',
      likes: 734,
      isLiked: false,
    },
    {
      petTitle: 'Daniel',
      petPersonImage: require('../assets/userProfile.jpg'),
      petImage: require('../assets/pet4.jpg'),
      description: 'Caut chirias',
      likes: 875,
      isLiked: false,
    },
  ];

  return (
    <View>
      {petInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
        return (
          <View
            key={index}
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
                  source={data.petPersonImage}
                  style={{width: 40, height: 40, borderRadius: 100}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {data.petTitle}
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
                source={data.petImage}
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
                <TouchableOpacity onPress={() => setLike(!like)}>
                  <AntDesign
                    name={like ? 'heart' : 'hearto'}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: like ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text>
                Wanted by {like ? 'you and' : ''}{' '}
                {like ? data.likes + 1 : data.likes} others
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                {data.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Pet;