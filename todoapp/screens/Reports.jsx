import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Report from '../components/Report';

const Reports = ({ navigation }) => {
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
        <Icon name="plus-square" style={{fontSize: 24}} onPress={() => navigation.navigate("addReport")}/>
        <Icon name="location-arrow" style={{fontSize: 24}} />
      </View>

      <ScrollView>
        <Report />
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Icon
            name="redo"
            style={{fontSize: 60, opacity: 0.2}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Reports;