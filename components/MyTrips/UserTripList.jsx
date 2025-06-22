import { useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';

const UNSPLASH_ACCESS_KEY = 'yprdBxYGO-7BZmGUZoQKRDyMMrtg92lat8Vs65_qUOM';

export default function UserTripList({ userTrips }) {
  const [tripImages, setTripImages] = useState({});
  const router = useRouter();

  // Parse tripData safely
  const parsedTrips = userTrips.map(trip => {
    let tripData = trip.tripData;
    if (typeof tripData === 'string') {
      try {
        tripData = JSON.parse(tripData);
      } catch (e) {
        console.warn('Failed to parse tripData JSON', e);
        tripData = {};
      }
    }
    return { ...trip, tripData };
  });

  // Fetch Unsplash image
  const fetchUnsplashImage = async (placeName, index) => {
    if (!placeName) return;

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.regular;
        setTripImages(prev => ({ ...prev, [index]: imageUrl }));
      } else {
        setTripImages(prev => ({ ...prev, [index]: null }));
      }
    } catch (error) {
      console.error('Unsplash fetch error:', error);
      setTripImages(prev => ({ ...prev, [index]: null }));
    }
  };

  // Fetch images when trips load
  useEffect(() => {
    parsedTrips.forEach((trip, index) => {
      const fullLocation = trip.tripData?.destination?.name;
      const placeName = fullLocation ? fullLocation.split(',')[0].trim() : '';
      fetchUnsplashImage(placeName, index);
    });
  }, [parsedTrips]);

  const latestTripIndex = parsedTrips.length - 1;
  const latestTrip = parsedTrips[latestTripIndex];

  return (
    <View style={{ marginTop: 20 }}>
      {latestTrip && (
        <>
          <Image
            source={
              tripImages[latestTripIndex]
                ? { uri: tripImages[latestTripIndex] }
                : require('../../assets/images/placeholder.png')
            }
            style={{
              width: '100%',
              height: 240,
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
              {latestTrip.tripData?.destination?.name}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
              {moment(latestTrip.tripData?.startDate).format('DD MMM yyyy')}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
              {latestTrip.tripData?.traveler?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(latestTrip),
                  imageUri: tripImages[latestTripIndex] || '',
                },
              })
            }
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit-medium',
                fontSize: 15,
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>
        </>
      )}

      {parsedTrips.map((trip, index) => (
        <View key={index} style={{ marginTop: 20 }}>
          <UserTripCard trip={trip} imageUri={tripImages[index]} />
        </View>
      ))}
    </View>
  );
}
