// import React from 'react';
// import {View, Text, StatusBar, ScrollView} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Pet from '../components/Pet';
// import SearchBar from '../components/SearchBar';

// const Pets = ({ navigation }) => {
//   return (
//     <View style={{backgroundColor: 'white', height: '100%', paddingTop: 10}}>
//       <SearchBar/>
//       <StatusBar
//         backgroundColor="white"
//         barStyle="dark-content"
//         animated={true}
//       />
//       <View
//         style={{
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           paddingHorizontal: 15,
//           paddingTop: 20,
//           alignItems: 'center',
//         }}>
//         <Icon name="plus-square" style={{fontSize: 24}} onPress={() => navigation.navigate("addPet")}/>
//         <Icon name="location-arrow" style={{fontSize: 24}} />
//       </View>

//       <ScrollView>
//         <Pet />
//         <View
//           style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
//           <Icon name="redo"
//             style={{fontSize: 60, opacity: 0.2}}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Pets;

import React, { useState, useEffect} from 'react';
import {View} from 'react-native';
import {getAllPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from './../components/Pet.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';


const Pets = ({ navigation, route}) => {
    const dispatch = useDispatch();

    const pets = useSelector(state => state.pet)

    useEffect(() => {
      dispatch(getAllPets());
    }, []);
    return (
      <View>
      <View>
        {pets.pet?.slice(0).reverse().map((data, index) => {
          return(
            <View key={index}>
              <Pet
                 _id = {data._id}
                 name = {data.name}
                 characteristics = {data.characteristics}
                 avatar = {data.avatar}
                 area= {data.area}
                 owner = {data.owner}
                 savedPets ={user.savedPets}
              />
            </View>
          )
        })}
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 25,
          paddingTop: 30,
          alignItems: 'center',
        }}>
        <Icon name="plus-circle" size={40} color="#759" onPress={() => navigation.navigate("addpet")}/>
      </View>
      </View>
      
        
    )};
export default Pets;