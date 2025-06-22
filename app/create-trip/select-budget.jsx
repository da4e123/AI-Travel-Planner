import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {

    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState();

    const {tripData, setTripData} = useContext(CreateTripContext);

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    },[]);

    useEffect(() =>{
        selectedOption&&setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption]);

    const onClickContinue = () =>{
        if(!selectedOption) {
            ToastAndroid.show("Select your budget", ToastAndroid.LONG);
            return ;
        }
        
        router.push('/create-trip/review-trip');
    }

    console.log(selectedOption);

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
        }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Select Budget</Text>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 18
        }}>Choose spending habits for your trip</Text>

        <FlatList 
        data={SelectBudgetOptions}
        renderItem={({item,index}) => (
            <TouchableOpacity style={{marginVertical: 10}}
            onPress={() => setSelectedOption(item)}>
                <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>

  )}
        />
      </View>
            <TouchableOpacity
            onPress={() => onClickContinue()} style={{
              backgroundColor: Colors.PRIMARY,
              borderRadius: 15,
              padding: 15,
              marginTop: 20
            }}>
              
                <Text style={{
                  color: Colors.WHITE,
                  textAlign: 'center',
                  fontFamily: 'outfit-medium',
                  fontSize: 20
                  
                }}>Continue</Text>
              
            </TouchableOpacity>
    </View>
  )
}