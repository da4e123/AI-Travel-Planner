import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.wrapper}>
      <Image
        source={require('../assets/images/login.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.container}>
        <Text style={styles.title}>AI Travel Planner</Text>

        <Text style={styles.subtitle}>
          Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/sign-in')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#DDF3F5',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: width * 1.2,
    height: height * 0.65,
    marginTop: 30,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: -30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    width: '100%',
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'outfit',
    fontSize: 16,
    textAlign: 'center',
  },
});
