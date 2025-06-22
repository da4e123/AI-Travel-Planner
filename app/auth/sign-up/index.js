import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {Colors} from './../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { useState } from 'react';

export default function SignUp() {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();


    useEffect(() => {   
        navigation.setOptions({
            headerShown: false,
        })
    },[])


    const OnCreateAccount = () => {
        

      if(!email && !password && !fullName){
        ToastAndroid.show('Please enter all details!', ToastAndroid.BOTTOM);
        return ;
      }
      console.log(email.trim(), password.trim())
      createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
        console.log('Redirecting to /mytrip...');
        router.replace("/mytrip");
        console.log('Redirection triggered.');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
          if(errorCode == 'auth/invalid-email'){
            ToastAndroid.show('Invalid email!', ToastAndroid.BOTTOM);
            return ;
          }
    // ..
  });
        // Create Account Logic
    }
  return (
    <View style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height: '100%',
    }}>

        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 30,
        marginTop: 30
      }}>Create New Account</Text>

      
      {/* User Full Name */}
      <View style={{
              marginTop: 50
            }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Full Name</Text>
              <TextInput style={styles.input} 
              placeholder='Enter Full Name'
              value={fullName}
              onChangeText={(value) => setFullName(value)} />
              </View>

      {/* Email */}
            <View style={{
              marginTop: 20
            }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Email</Text>
              <TextInput style={styles.input} 
              placeholder='Enter Email'
              value={email}
               onChangeText={(value) => setEmail(value)} />
      
            
            </View>

            {/* Password */}
            <View style={{
              marginTop: 20
            }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Password</Text>
              <TextInput secureTextEntry={true} 
              style={styles.input} 
              placeholder='Enter Password'
              value={password}
               onChangeText={(value) => setPassword(value)} />
            </View>


                    {/* Create Account Button */}
                  <TouchableOpacity
                  onPress={OnCreateAccount} style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 50
                  }}>
            
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                    }}>Create Account</Text>
            
                  </TouchableOpacity>
            
                  
                    {/* Sign In Button */}
                    <TouchableOpacity
            
                    onPress={()=> router.replace('/auth/sign-in')}
                    
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
                    }}>Sign In</Text>
            
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
