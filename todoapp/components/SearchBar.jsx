import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { setSearchResults } from './redux/searchResultsSlice';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const searchResults = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  const handleCharacteristicsSelection = (characteristic) => {
    if (selectedCharacteristics.includes(characteristic)) {
      setSelectedCharacteristics(selectedCharacteristics.filter((c) => c !== characteristic));
    } else {
      setSelectedCharacteristics([...selectedCharacteristics, characteristic]);
    }
  };

  const handleSearch = async () => {
    // Set up the URL and query parameters
    const url = 'http://your-backend-url.com/search';
    const params = {
      q: searchQuery,
      characteristics: selectedCharacteristics.join(',')
    };

    try {
      // Fetch the data from the backend
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      const data = await response.json();

      // Update the search results in the Redux store
      // dispatch(setSearchResults(data.results));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search by name"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={['Characteristic 1', 'Characteristic 2', 'Characteristic 3']}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCharacteristicsSelection(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <FlatList
              data={item.characteristics}
              renderItem={({ item }) => <Text>{item}</Text>}
              keyExtractor={(item) => item}
              horizontal
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchBar;