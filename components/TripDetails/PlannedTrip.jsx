import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const UNSPLASH_ACCESS_KEY = 'yprdBxYGO-7BZmGUZoQKRDyMMrtg92lat8Vs65_qUOM';

export default function PlannedTrip({ details }) {
  const [tripImages, setTripImages] = useState({});

  const fetchUnsplashImage = async (placeName, key) => {
    if (!placeName) return;

    console.log('Fetching image for:', placeName);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.regular;
        setTripImages(prev => ({ ...prev, [key]: imageUrl }));
      } else {
        setTripImages(prev => ({ ...prev, [key]: null }));
      }
    } catch (error) {
      console.error('Unsplash fetch error:', error);
      setTripImages(prev => ({ ...prev, [key]: null }));
    }
  };

  // Trigger image fetching for all places
  useEffect(() => {
    Object.entries(details).forEach(([dayKey, dayDetails]) => {
      dayDetails?.placesToVisit?.forEach((place, index) => {
        const key = `${dayKey}-${index}`;
        if (!tripImages[key]) {
          fetchUnsplashImage(place?.placeName, key);
        }
      });
    });
  }, [details]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 17
      }}>🏕️ Plan Details</Text>

      {Object.entries(details)
      .sort(([a], [b]) => {
        // Extract the number part after "Day " and compare numerically
        const dayNumberA = parseInt(a.replace(/[^\d]/g, ''));
        const dayNumberB = parseInt(b.replace(/[^\d]/g, ''));
        return dayNumberA - dayNumberB;
      })
      
      .map(([dayKey, dayDetails]) => (
        <View key={dayKey}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            marginTop: 20
          }}>
            {dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}
          </Text>

          {dayDetails?.placesToVisit.map((place, index) => {
            const uniqueKey = `${dayKey}-${index}`;
            const imageUrl = tripImages[uniqueKey];

            return (
              <View
                key={uniqueKey}
                style={{
                  backgroundColor: Colors.LIGHT_BLUE,
                  padding: 10,
                  borderRadius: 15,
                  borderColor: Colors.GRAY,
                  marginTop: 20
                }}
              >
                <Image
                  source={
                    imageUrl
                      ? { uri: imageUrl }
                      : require('../../assets/images/placeholder.png')
                  }
                  style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 15
                  }}
                  resizeMode="cover"
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
                    {place?.placeName}
                  </Text>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 15,
                    color: Colors.GRAY
                  }}>{place?.placeDescription}</Text>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <View>
                    <Text
                      style={{
                        fontFamily: 'outfit',
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      🎟️ Ticket price:{' '}
                      <Text style={{ fontFamily: 'outfit-bold' }}>
                        {place?.ticketPricing === 'Free' ? 'Free' : `$${place?.ticketPricing}`}
                      </Text>
                    </Text>
                    

                      <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 15,
                        marginTop: 5
                      }}>
                        ⏱️ Travel time: <Text style={{ fontFamily: 'outfit-bold' }}>{place?.travelTime}</Text>
                      </Text>


                     <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 15,
                        marginTop: 5
                      }}>
                        🌤️ Best time of day: <Text style={{ fontFamily: 'outfit-bold' }}>{place?.bestTime}</Text>
                      </Text>
                    </View>
                    <TouchableOpacity style={{
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: 7,
                      padding: 8
                    }}>
                      <Ionicons name="navigate" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
