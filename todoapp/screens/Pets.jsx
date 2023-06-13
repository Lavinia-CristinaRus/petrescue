import React, { useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {getAllPets} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Pet from './../components/Pet.jsx'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import {savePet, unsavePet} from '../redux/action';
import { Dropdown } from 'react-native-element-dropdown';

const Pets = ({ navigation, route}) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const pets = useSelector(state => state.pet.pet);
    const { message, error } = useSelector(state => state.pet);
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
  }, [alert, error, message, dispatch])

  const clearFiltersHandler = () => {
    setAnimal("");
    setAgeCategory("");
    setAggressionLevel("");
    setSize("");
    setHealth("");
  }

    useEffect(() => {
      dispatch(getAllPets(keyword, animal, ageCategory, aggressionLevel, size, health));
    }, [keyword, animal, ageCategory, aggressionLevel, size, health]);
  
    return (
      <View>
      <View>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%'}}>
        <SearchBar
          placeholder="Search through pets for adoption..."
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
      </View>
      <ScrollView style={{height:'90%'}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', width:'100%', height:47}}>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe',padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("sentadoptionrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW SENT{'\n'}ADOPTION REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{alignItems: 'center', width:200, height:47,backgroundColor:'#cbe', padding: 5, borderWidth:2, borderColor:'#dcf'}}
              onPress={() => navigation.navigate("receivedadoptionrequests")}
          >
            <Text style={{fontSize: 13, textAlign: 'center', fontWeight:'bold', color: '#548'}}>VIEW ADOPTION{'\n'}REQUESTS RECEIVED</Text>
          </TouchableOpacity>
        </View>
        {pets?.slice(0).reverse().map((data, index) => {
            const handleSave = async (id) => {
              await dispatch(savePet(id));
              dispatch(getAllPets(keyword, animal, ageCategory, aggressionLevel, size, health));
            }
            const handleUnsave = async (id) => {
              await dispatch(unsavePet(id));
              dispatch(getAllPets(keyword, animal, ageCategory, aggressionLevel, size, health));
            }
            const adoptHandler = async () => {
              navigation.navigate("addrequest",{pet:data._id});
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
                  adoptHandler = {adoptHandler}
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
        <Icon name="plus-circle" size={45} color="#759" onPress={() => navigation.navigate("addpet")}/>
      </View>
      </View>
      
        
    )};
export default Pets;

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