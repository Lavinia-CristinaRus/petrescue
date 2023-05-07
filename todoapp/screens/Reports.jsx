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
import {View} from 'react-native';
import {getAllReports} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from './../components/Report.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';


const Reports = ({ navigation, route}) => {
    const dispatch = useDispatch();

    const reports = useSelector(state => state.report)

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
        {reports.report?.slice(0).reverse().map((data, index) => {
          // const isLiked = isPostLiked(data._id);
          return(
            <View key={index}>
              <Report
                 _id = {data._id}
                 name = {data.name}
                 characteristics = {data.characteristics}
                 avatar = {data.avatar}
                 area= {data.area}
                 owner = {data.owner}
                 seen ={data.seen}
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
        <Icon name="plus-circle" size={40} color="#759" onPress={() => navigation.navigate("addreport")}/>
      </View>
      </View>
      
        
    )};
export default Reports;