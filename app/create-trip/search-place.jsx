import { useNavigation, useRouter } from 'expo-router';
import debounce from 'lodash.debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SearchPlace() {
  const navigation = useNavigation();
  const {tripData, setTripData} = useContext(CreateTripContext);

  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchPlaces = async (searchText) => {
    if (!searchText) {
      setResults([]);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchText
      )}&format=json&addressdetails=1&limit=5`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MyReactNativeApp/1.0 (my@email.com)',
        },
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // debounce to limit API calls
  const debouncedFetch = useCallback(debounce(fetchPlaces, 500), []);

  const handleChange = (text) => {
    setQuery(text);
    debouncedFetch(text);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    console.log('Selected place:', place.description);
    console.log('Latitude:', place.lat);
    console.log('Longitude:', place.lon);
  
    const selectedPlaceData = {
    name: place.display_name,
    latitude: place.lat,
    longitude: place.lon,
    osm_id: place.osm_id,
    osm_type: place.osm_type,
  };

  setTripData((prev) => ({
    ...prev,
    destination: selectedPlaceData, 
  }));

  console.log('Selected place:', selectedPlaceData);
  router.push("/create-trip/select-traveler");
  };

  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  },[tripData])

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <View style={styles.container}>
      <TextInput
        placeholder="Search for a place..."
        value={query}
        onChangeText={handleChange}
        style={styles.input}
      />

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.resultItem}>
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.resultsList}
        />
      )}
    </View>
      
     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  resultsList: {
    maxHeight: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
})
