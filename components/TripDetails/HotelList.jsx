import { FlatList, Image, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
const UNSPLASH_ACCESS_KEY = 'yprdBxYGO-7BZmGUZoQKRDyMMrtg92lat8Vs65_qUOM';


export default function HotelList({hotelList}) {

  const [tripImages, setTripImages] = useState({});
  
    const fetchUnsplashImage = async (hotelName, key) => {
      if (!hotelName) return;
  
      console.log('Fetching image for hotel:', hotelName);
  
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(hotelName)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
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

    useEffect(()=>{
      hotelList.forEach((hotel, index) => {
        const hotelName = hotel?.hotelName;
        if(!tripImages[index]){
           fetchUnsplashImage(hotelName, index);
        }
       
        
      });

    },[hotelList]);



  return (
    <View style={{
        marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 17
      }}>🏨 Hotel Recommendation</Text>

      <FlatList 
      data={hotelList}
      style={{
        marginTop: 8
      }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={({item,index}) =>(
        
        <View style={{
          marginRight: 20,
          width: 180
        }}>
            
            <Image source={tripImages[index] ?
              { uri : tripImages[index]} :
              require('../../assets/images/placeholder.png')
            }
            style={{
                width:180,
                height:120,
                borderRadius:15
            }}/>
            <View>
                <Text style={{
                  fontFamily: 'outfit-medium',
                  fontSize: 15
                }}>{item.hotelName}</Text>
              </View>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                  fontFamily: 'outfit'
              }}>⭐{item.rating}</Text>
              <Text style={{
                  fontFamily: 'outfit'
              }}>💰 ${item.pricePerNight}/night</Text>
              </View>
            
        </View>
      )}
      />
    </View>
  )
}