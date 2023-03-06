import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Pet from '../components/Pet';
import SearchBar from '../components/SearchBar';

const Pets = ({ navigation }) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%', paddingTop: 10}}>
      <SearchBar/>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingTop: 20,
          alignItems: 'center',
        }}>
        <Icon name="plus-square" style={{fontSize: 24}} onPress={() => navigation.navigate("addPet")}/>
        <Icon name="location-arrow" style={{fontSize: 24}} />
      </View>

      <ScrollView>
        <Pet />
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Icon name="redo"
            style={{fontSize: 60, opacity: 0.2}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Pets;