import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/Colors'

export default function FlightInfo({flightData}) {
  return (
    <View style={{
      marginTop:20,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY,
      borderRadius: 15,
      padding: 10
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>✈️ Flights</Text>

      <TouchableOpacity style={{
        backgroundColor: Colors.PRIMARY,
        padding: 5,
        borderRadius: 7,
        width: 100,
        marginTop: 7
      }}>
        <Text style={{
          color: Colors.WHITE,
          fontFamily: 'outfit',
          textAlign: 'center'
        }}>Book Here</Text>
      </TouchableOpacity>

      </View>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 7
      }}>Airline: {flightData[0]?.airline}</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17
      }}>Price: {flightData[0]?.approximatePrice}</Text>


    </View>
  )
}