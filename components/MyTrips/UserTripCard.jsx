import moment from 'moment';
import { Image, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function UserTripCard({ trip, imageUri }) {
  const formatData = (data) => {
    let tripData = data.tripData;
    if (typeof tripData === 'string') {
      try {
        tripData = JSON.parse(tripData);
      } catch (e) {
        console.warn('Failed to parse tripData JSON', e);
        tripData = {};
      }
    }
    return {
      ...data,
      tripData,
    };
  };

  const formattedTrip = formatData(trip.tripData);

  return (
    <View
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../assets/images/placeholder.png')
        }
        style={{
          height: 50,
          width: 50,
          borderRadius: 15,
        }}
      />

      <View>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 13,
          }}
        >
          {trip?.tripData?.destination?.name}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 10,
            color: Colors.GRAY,
          }}
        >
          {moment(formattedTrip.startDate).format('DD MMM yyyy')}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 10,
            color: Colors.GRAY,
          }}
        >
          Travelling: {formattedTrip.traveler?.title}
        </Text>
      </View>
    </View>
  );
}
