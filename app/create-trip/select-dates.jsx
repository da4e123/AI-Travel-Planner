import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
export default function SelectDates() {

    const navigation = useNavigation();

    const [startDate, setStartDate] = useState();

    const [endDate, setEndDate] = useState();

    const {tripData, setTripData} = useContext(CreateTripContext);

    const router = useRouter();


    useEffect(() =>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    },[])

const onDateChange = (date, type) => {
  console.log(date, type);
  if (type === 'START_DATE') {
    setStartDate(date); // store raw Date
    setEndDate(null);
  } else if (type === 'END_DATE') {
    setEndDate(date);
  }
};

const OnDateSelectionContinue = () => {
  if (!startDate && !endDate) {
    ToastAndroid.show('Please select Start and End dates', ToastAndroid.LONG);
    return;
  }

  const momentStart = moment(startDate);
  const momentEnd = moment(endDate);
  const totalNoOfDays = momentEnd.diff(momentStart, 'days');

  console.log(`Total number of days: ${totalNoOfDays + 1}`);

  setTripData({
    ...tripData,
    startDate: momentStart, // corrected key name
    endDate: momentEnd,
    totalNoOfDays: totalNoOfDays + 1,
  });

  router.push('/create-trip/select-budget');
};

    
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Travel Dates</Text>
    <View style={{
      marginTop: 30
    }}>
      <CalendarPicker 
      onDateChange={onDateChange}
      allowRangeSelection={true}
      minDate={new Date()} 
      maxRangeDuration={5}
      selectedRangeStyle={{
        backgroundColor: Colors.PRIMARY,

      }}
      selectedDayTextStyle={{
        color: Colors.WHITE
      }}
    
      />
    </View>
    <View>

      
    <TouchableOpacity 
    onPress={OnDateSelectionContinue}
    style={{
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        padding: 15,
        marginTop: 35
      }}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
          fontFamily: 'outfit-medium',
          fontSize: 20
          
        }}>Continue</Text>

      </TouchableOpacity>

    </View>



      
    </View>
  )
}