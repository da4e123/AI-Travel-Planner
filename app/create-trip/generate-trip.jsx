import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { chatSession } from '../../configs/AiModel';
import { auth, db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import { AI_PROMPT } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';



export default function GenerateTrip() {

  const {tripData, setTripData} = useContext(CreateTripContext);

  const [loading,setLoading] = useState(false);

  const router = useRouter();

  const user = auth.currentUser;

  useEffect(() => {
  if (tripData) {
    GenerateAiTrip();
  }
}, [JSON.stringify(tripData)]);

  const GenerateAiTrip = async () => {
  setLoading(true);

  
  try {

    if (!auth.currentUser) {
      console.log("User not authenticated.");
      router.replace("../auth/sign-in"); 
      return; 
    }
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.destination?.name)
      .replace('{totalDays}', tripData?.totalNoOfDays)
      .replace('{totalNights}', tripData?.totalNoOfDays - 1)
      .replace('{traveler}', tripData?.traveler?.title)
      .replace('{budget}', tripData?.budget);

    console.log("PROMPT:", FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const resultText = result.response.text();
    console.log("AI Response:", resultText);

    const tripResponse = JSON.parse(resultText);

    const docId = Date.now().toString();
    await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user?.email,
      tripPlan: tripResponse,
      tripData: JSON.stringify(tripData)
    });

    router.push("/(tabs)/mytrip");
  } catch (err) {
    console.error("Error during trip generation:", err);
  } finally {
    setLoading(false);
  }
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
        textAlign: 'center'
      }}>Please wait...</Text>
            <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
      }}>We are working to generate your dream trip</Text>

      <Image source={require('../../assets/images/animated_plane.gif')} 
      style={{
        width: '100%',
        height: 200,
        objectFit: 'contain'
      }}/>

      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 20,
        textAlign: 'center'
      }}>Do not Go back</Text>
    </View>
  )
}