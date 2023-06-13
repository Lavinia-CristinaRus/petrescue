import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {getAllReports} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Report from './../components/Report.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {seenPet, unseenPet} from '../redux/action';
import { Dropdown } from 'react-native-element-dropdown';

const Reports = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const reports = useSelector(state => state.report.report);
    const { message, error } = useSelector(state => state.report);
    const { messageConf, errorConf } = useSelector(state => state.confirmation);
    const user = useSelector(state => state.auth);
    const [filters, setFilters] = useState(false);
    const [animal, setAnimal] = useState("");
    const [size, setSize] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [aggressionLevel, setAggressionLevel] = useState("");
    const [health, setHealth] = useState("");

    const animals = [
        { label: 'Dog', value: "dog" },
        { label: 'Cat', value: "cat" },
        { label: 'Other', value: "other" },
    ];

    const sizes = [
        { label: 'Small', value: "small" },
        { label: 'Medium', value: "medium" },
        { label: 'Large', value: "large" },
        { label: 'Giant', value: "giant" },
    ];

    const ageCategories = [
        { label: 'Young', value: "young" },
        { label: 'Mature', value: "mature" },
        { label: 'Senior', value: "senior" },
    ];

    const aggressionLevels = [
        { label: 'Low', value: "low" },
        { label: 'Medium', value: "medium" },
        { label: 'High', value: "high" },
        { label: 'Unknown', value: "unknown" },
    ];

    const healthStates = [
        { label: 'Sick', value: "sick" },
        { label: 'Healthy', value: "healthy" },
    ];


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
      dispatch(getAllReports(keyword, animal, ageCategory, aggressionLevel, size, health));
    }, [keyword, animal, ageCategory, aggressionLevel, size, health]);

    const clearFiltersHandler = () => {
      setAnimal("");
      setAgeCategory("");
      setAggressionLevel("");
      setSize("");
      setHealth("");
    }

    return (
      <View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%'}}>
        <SearchBar
          placeholder="Search through stray pets reports..."
          value={keyword}
          onChangeText = {setKeyword}
          containerStyle={{backgroundColor: "#759", width:"90%"}}
          inputContainerStyle={{borderRadius: 50, backgroundColor: '#648'}}
        />
        <View
          style={{
            alignItems: 'center',
            width:"10%",
            height:66,
            backgroundColor:"#759",
            alignSelf:'flex-end',
            justifyContent: 'center'
          }}>
          <Icon name="filter" size={20} color="#eee" onPress={()=>{setFilters(true)}}/>
        </View>
      </View>
      
      <ScrollView style={{height:'90%'}}>
       <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%', height:47}}>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("sentconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548',}}>VIEW SENT{'\n'}CONFIRMATION REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedconfirmationrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548',}}>VIEW CONFIRMATION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {reports?.slice(0).reverse().map((data, index) => {

            const handleSeen = async (id) => {
              await dispatch(seenPet(id));
              dispatch(getAllReports(keyword, animal, ageCategory, aggressionLevel, size, health));
            }
            const handleUnseen = async (id) => {
              await dispatch(unseenPet(id));
              dispatch(getAllReports(keyword, animal, ageCategory, aggressionLevel, size, health));
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
      {filters && <View>
        <View style={{position: "absolute", width:500, height:800, backgroundColor: 'rgba(128, 128, 128, 0.5)', bottom:0}}>
          <TouchableOpacity style={{width:'100%', height:'100%'}}>
          </TouchableOpacity>
        </View>
        
        <View style={styles.customView}>
            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-end',right:15, top:5}}>
            <Icon name="times-circle" size={25} color="#759" onPress={()=>{setFilters(false)}}/>
            </TouchableOpacity>
            <View style={{paddingHorizontal:20, top:20}}>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#548',}}>FITER RESULTS</Text>
              <View style={{height: 20}}></View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={animals}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Animal"
                value={animal}
                onChange={item => {
                    setAnimal(item.value);
                }}
              />
              <View style={{height: 20}}></View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={sizes}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Size"
                value={size}
                onChange={item => {
                    setSize(item.value);
                }}
              />
              <View style={{height: 20}}></View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={ageCategories}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Age category"
                value={ageCategory}
                onChange={item => {
                    setAgeCategory(item.value);
                }}
              />
              <View style={{height: 20}}></View>
              <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.dropdownPlaceholder}
                  data={aggressionLevels}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Aggression level"
                  value={aggressionLevel}
                  onChange={item => {
                      setAggressionLevel(item.value);
                  }}
              />
              <View style={{height: 20}}></View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={healthStates}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Health"
                value={health}
                onChange={item => {
                    setHealth(item.value);
                }}
              />
              <View style ={{height:20}}></View>
              <Button
                color='purple'
                onPress={clearFiltersHandler}
              >
                Clear all filters
              </Button>
            </View>
            <View style={{height: 40}}></View>
          </View></View>}
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
        <Icon name="plus-circle" size={45} color="#759" onPress={() => {if(!filters) {navigation.navigate("addreport")}}}/>
      </View>
      </View>
      
        
    )};
export default Reports;

const styles = StyleSheet.create({
  customView: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    width: '90%',
    content: 'fill',
    position: "absolute",
    bottom:100,
    alignSelf:'center',
  },
  dropdown: {
    borderBottomWidth : 1.0,
    borderBottomColor: 'grey',
    padding: 0,
    justifyContent: "center",
    alignItems: "center"
},
dropdownPlaceholder:{
    color: "#b5b5b5",
},
});