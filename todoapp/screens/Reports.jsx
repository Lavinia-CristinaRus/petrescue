// import React from 'react';
// import {View, Text, StatusBar, ScrollView} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Report from '../components/Report';
// import { useDispatch, useSelector } from 'react-redux'

// const Reports = ({ navigation }) => {
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
//         <Icon name="plus-square" style={{fontSize: 24}} onPress={() => navigation.navigate("addReport")}/>
//         <Icon name="location-arrow" style={{fontSize: 24}} />
//       </View>

//       <ScrollView>
//         <Report _id="1" name="caine agresiv Complex" characteristics="aggressive" avatar = {user.avatar} area = "acasa" owner = "Lavinia" seen = {"1"} isSeen = {false}/>
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

// export default Reports;

import React, { useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {getAllReports} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from './../components/Report.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {seenPet, unseenPet} from '../redux/action';
//to add buton for confirmation for pets taken fromm the street and searchbar and filters

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
        placeholder="Search through stray pets reports..."
        value={""}
        containerStyle={{backgroundColor: "#759"}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
      />
      </View>
      <ScrollView style={{height:'90%'}}>
        {reports?.slice(0).reverse().map((data, index) => {
            // const isLiked = isPostLiked(data._id);
            // const [seens,setSeens] = useState(data.seen);

            const handleSeen = (id) => {
              dispatch(seenPet(id));
              // setSeens(prevSeens => [...prevSeens,user.user._id]);
              // setSeen(true);
            }
            const handleUnseen = (id) => {
              dispatch(unseenPet(id));
              // setSeens(prevSeens => prevSeens.filter(postId => postId !== user.user._id));
              // setSeen(false);
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