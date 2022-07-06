import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import Constants from '../constants/constants';
import Back from '../assets/back.png'

export default function RegisterScreen({username, setUsername}) {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSignUpPressed = () => {
      const submitUser = {
        name: username,
        email,
        password
      }
      fetch(Constants.urlGetAllUsers, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(submitUser),
      })
      .then(res => res.json())
      .then(response => {
          if (response.message === 'Bad request. Please fill all fields.') {
            navigation.navigate("Register")
          } else {
            navigation.navigate('TabsBottom', {screen: "Home"})
          }
          
        }
        
      )
      .catch(error => console.error('Error:', error))
    }

    return (
        <View style={styles.root}>

          <View style={styles.loginCase}>

            <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => navigation.navigate('Wellcome')}>
              <Image source={Back} style={{width: 25, height: 25}}/>
            </TouchableOpacity>

            <View style={{alignItems: "center"}}>
              <Text style={styles.tittle}>REGISTER</Text>
            </View>

            <View style={styles.input}>
              <TextInput
                placeholder='User'
                onChangeText={(textWritting) => setUsername(textWritting)}
              />
            </View>

            <View style={styles.input}>
              <TextInput
                placeholder='Email'
                onChangeText={(textWritting) => setEmail(textWritting)}
              />
            </View>

            <View style={styles.input}>
              <TextInput
              secureTextEntry
                placeholder='Password'
                onChangeText={(textWritting) => setPassword(textWritting)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => onSignUpPressed()}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', marginTop: 20, alignSelf: 'flex-start'}}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    loginCase:{
      paddingVertical: 80, 
      paddingHorizontal: 40,
      marginBottom: 90,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    },
    tittle: {
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      height: 30,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
      justifyContent: 'center',
      color: 'black'
    },
    button: {
      width: '100%',
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 5, 
  
      backgroundColor: '#35AAF2'
    },
    text: {
      fontWeight: 'bold',
      color: 'white',
    },
    link: {
      color: "blue",
      marginLeft: 5
    }
})