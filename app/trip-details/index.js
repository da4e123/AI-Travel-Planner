import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { Colors } from '../../constants/Colors';


export default function TripDetailsScreen() {
  const { trip, imageUri } = useLocalSearchParams();
  const [parsedTrip, setParsedTrip] = useState(null);

  useEffect(() => {
    if (trip) {
      try {
        const parsed = typeof trip === 'string' ? JSON.parse(trip) : trip;
        setParsedTrip(parsed);
        console.log('✅ Parsed trip:', parsed);
        // console.log('Price:', parsed?.tripPlan?.flights?.approximatePrice);
        console.log("Flights:", parsed?.tripPlan?.flights);
        console.log("Hotels:", parsed?.tripPlan?.hotels);
        console.log("Itinerary:", parsed?.tripPlan?.itinerary);

      } catch (err) {
        console.error("Failed to parse trip JSON", err);
      }
    }
  }, [trip]);

  if (!parsedTrip) return <Text>Loading...</Text>;




  return (
    <ScrollView style={{ padding: 20 }}>
      <Image
        source={imageUri ? { uri: imageUri } : require('../../assets/images/placeholder.png')}
        style={{
          width: '100%',
          height: 330,
          // borderRadius: 15,
        }}
      />
      <View style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        width: '100%',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}>
        <Text style={{ 
        fontSize: 15, 
        fontFamily: 'outfit-bold'
         }}>
        {parsedTrip.tripData?.destination?.name}
      </Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 5
      }}>
      <Text style={{ 
        fontFamily: 'outfit', 
        fontSize: 17, 
        color: Colors.GRAY }}>
        {moment(parsedTrip?.tripData?.startDate).format('DD MMM yyyy')}
      </Text>
      <Text style={{ 
        fontFamily: 'outfit', 
        fontSize: 17, 
        color: Colors.GRAY }}>
        - {moment(parsedTrip?.tripData?.endDate).format('DD MMM yyyy')}
      </Text>
      </View>

      <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
              🚌 {parsedTrip?.tripData?.traveler?.title}
      </Text>

      {/* Flight Info */}
      
        
      <FlightInfo flightData={parsedTrip?.tripPlan?.flights}/>
        
      {/* Hotel List Info */}
      <HotelList hotelList={parsedTrip?.tripPlan?.hotels}/>

      <PlannedTrip details={parsedTrip?.tripPlan?.itinerary}/>

      </View>

      

      
    </ScrollView>
  );
}
