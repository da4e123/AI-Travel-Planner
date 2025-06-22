import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import { use } from 'react';
import {Colors} from './../../../constants/Colors'
import { Button } from 'react-native-web';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet} from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function SignIn() {
    const navigation = useNavigation();
    const router = useRouter();

    const[email, setEmail] = useState();
    const[password, setPassword] = useState();

    useEffect(() => {

        navigation.setOptions({
            headerShown: false,
        })
    },[])

    const onSignIn = () =>{

      if(!email && !password){
        ToastAndroid.show('Please enter Email & Password!', ToastAndroid.LONG);
        return ;
      }
          signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User signed in successfully:');
        console.log('Redirecting to /mytrip...');
        router.replace('/mytrip');
        console.log('Redirection triggered.');
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message; 
        console.log(errorMessage);
  });
    }
  return (
    <View style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: '100%',
    }}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 30
      }}>Let's Sign You Sign In</Text>
        <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: Colors.GRAY,
        marginTop: 20
      }}>Welcome Back</Text>
        <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: Colors.GRAY,
        marginTop: 10
      }}>You've been missed</Text>

    {/* Email */}
      <View style={{
        marginTop: 50
      }}>
        <Text style={{
            fontFamily: 'outfit',
        }}>Email</Text>
        <TextInput style={styles.input} 
          onChangeText={(value) => setEmail(value)}
        placeholder='Enter Email' />

        {/* Password */}
      </View>
      <View style={{
        marginTop: 20
      }}>
        <Text style={{
            fontFamily: 'outfit',
        }}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} 
        onChangeText={(value) => setPassword(value)}
        placeholder='Enter Password' />
      </View>


        {/* Sign In Button */}
      <TouchableOpacity onPress={onSignIn} style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 50
      }}>

        <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
        }}>Sign In</Text>

      </TouchableOpacity>

      
        {/* Create Account Button */}
        <TouchableOpacity 

        onPress={()=> router.replace('auth/sign-up')}
        
        style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
      }}>

        <Text style={{
            color: Colors.PRIMARY,
            textAlign: 'center',
        }}>Create Account</Text>

      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  input:{
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit',

  }
})

