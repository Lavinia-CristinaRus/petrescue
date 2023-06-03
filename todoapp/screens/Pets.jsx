// import React from 'react';
// import {View, Text, StatusBar, ScrollView} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Pet from '../components/Pet';
// import { useDispatch, useSelector } from 'react-redux'

// const Pets = ({ navigation }) => {
//   const { user, loading } = useSelector(state => state.auth);
//   return (
//     <View style={{backgroundColor: 'white', height: '100%', paddingTop: 10}}>
//       {/* <SearchBar/> */}
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
//         <Pet _id="1" name="caine agresiv Complex" characteristics="aggressive" avatar = {user.avatar} area = "acasa" owner = "Lavinia" seen = {"1"} isSeen = {false}/>
//         <View
//           style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
//           <Icon
//             name="redo"
//             style={{fontSize: 60, opacity: 0.2}}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Pets;

import React, { useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {getAllPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from './../components/Pet.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {savePet, unsavePet} from '../redux/action';
//to add buton for confirmation for pets taken fromm the street and searchbar and filters

const Pets = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const pets = useSelector(state => state.pet.pet);
    const { message, error } = useSelector(state => state.pet);
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
  }, [alert, error, message, dispatch])

    useEffect(() => {
      dispatch(getAllPets());
    }, []);
  
    // const [liked, setLiked] = useState([]);
  
    // const handleSeen = (id) => {
    //     dispatch(likePost(id));
    //     setLiked(prevLikedPosts => [...prevLikedPosts, id]);
    //   }

    // const handleUnUnseen = (id) => {
    //     dispatch(unLikePost(id));
    //     setLiked(prevLikedPosts => prevLikedPosts.filter(postId => postId !== id));
    //   }
  
    // const isPostLiked = id => liked?.includes(id);
    return (
      <View>
      <View>
      <SearchBar
        placeholder="Search through pets for adoption..."
        value={""}
        containerStyle={{backgroundColor: "#759"}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
      />
      </View>
      <ScrollView style={{height:'90%'}}>
        {pets?.slice(0).reverse().map((data, index) => {
            // const isLiked = isPostLiked(data._id);
            // const [seens,setSeens] = useState(data.seen);

            const handleSave = (id) => {
              dispatch(savePet(id));
              console.log(user.user.savedPets);
              // setSeens(prevSeens => [...prevSeens,user.user._id]);
              // setSeen(true);
            }
            const handleUnsave = (id) => {
              dispatch(unsavePet(id));
              console.log(user.user.savedPets);
              // setSeens(prevSeens => prevSeens.filter(postId => postId !== user.user._id));
              // setSeen(false);
            }
            return(
              <View key={index}>
                <View style={{height: 20}}></View>
                <Pet
                  _id = {data._id}
                  name = {data.name}
                  description = {data.description}
                  characteristics = {data.characteristics}
                  avatar = {data.avatar.url}
                  location = {data.area}
                  ownerId = {data.owner._id}
                  ownerAvatar = {data.owner.avatar.url}
                  ownerName = {data.owner.name}
                  saved ={user.user.savedPets?.includes(data._id)}
                  handleSave = {handleSave}
                  handleUnsave = {handleUnsave}
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
        <Icon name="plus-circle" size={45} color="#759" onPress={() => navigation.navigate("addpet")}/>
      </View>
      </View>
      
        
    )};
export default Pets;