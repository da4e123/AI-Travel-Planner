import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Login from '../../components/Login';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import UserTripList from '../../components/MyTrips/UserTripList';
import { auth, db } from '../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  // Wait for Firebase auth to check user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthChecked(true);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
    if (user) {
      GetMyTrips();
    }
  }, [user]);

  const GetMyTrips = async () => {
    setUserTrips([]);
    setLoading(true);

    const q = query(
      collection(db, 'UserTrips'),
      where('userEmail', '==', user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        setUserTrips((prev) => [...prev, data]);
      }
    });

    setLoading(false);
  };

  if (!isAuthChecked) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
          }}
        >
          My Trip
        </Text>
        <Ionicons name="add-circle" size={50} color="black" />
      </View>

      {loading && (
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
      )}

      {!loading &&
        (userTrips.length === 0 ? (
          <StartNewTripCard />
        ) : (
          <UserTripList userTrips={userTrips} />
        ))}
    </ScrollView>
  );
}
