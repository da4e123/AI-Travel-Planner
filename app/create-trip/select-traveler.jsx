import { Link, useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { SelectTravelesList } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectTraveler() {

    const navigation = useNavigation();

    const [selectedTraveler, setSelectedTraveler] = useState();

    const {tripData, setTripData} = useContext(CreateTripContext);

    

    useEffect(() =>{
    navigation.setOptions({
        headerShow: true,
        headerTransparent: true,
        headerTitle: ''
    })
    }, [])

    useEffect(() => {
      if(selectedTraveler){
        setTripData({...tripData,
        traveler: selectedTraveler
        
      });
       
      
      }

    },[selectedTraveler]);

    useEffect(() => {
      console.log(tripData);
    },[tripData]);

   

    
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}>
      <Text style={{
        fontSize:35,
        fontFamily: 'outfit-bold',
        marginTop: 20
      }}>Who's travelling</Text>

      <View style={{
        marginTop: 20
      }}>
       <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 23
       }}>
        Choose your traveles
       </Text>
       
       
      <FlatList
        data={SelectTravelesList}
        // keyExtractor={(item, index) => index.toString()} // ✅ ADD THIS
        renderItem={({ item, index }) => (
          <TouchableOpacity 
          onPress={() =>setSelectedTraveler(item)}
          style={{
            marginVertical: 10
          }}>
            <OptionCard option={item} selectedOption={selectedTraveler} />
          </TouchableOpacity>
        )}
      />


      </View>

      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        padding: 15,
        marginTop: 20
      }}>
        <Link href={'/create-trip/select-dates'}
        style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            fontSize: 20
            
          }}>Continue</Text>
        </Link>
      </TouchableOpacity>
    </View>

  )
}