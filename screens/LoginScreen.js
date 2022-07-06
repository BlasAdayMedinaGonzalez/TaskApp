import { View, Text, Image, Pressable, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const bcrypt = require("bcryptjs")

import Constants from '../constants/constants';
import Back from '../assets/back.png'

export default function LoginScreen({username,setUsername,password,setPassword}) {
    const navigation = useNavigation();

    const validateUser = async(user, pass) => {
      fetch(Constants.urlGetAllUsers + user)
        .then(res => res.json())
        .then(res => {
          if (user === "" && password === "") {
            navigation.navigate("Login");
          } else if (bcrypt.compare(pass, res.data.password)) {
            navigation.navigate('TabsBottom', {screen: "Home"});
          }
          
        })
        .catch(error =>console.log("Usuario o contraseña incorrecto" + error));
    }

    return (
        <View style={styles.root}>
          
          <View style={styles.loginCase}>
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => navigation.navigate('Wellcome')}>
              <Image source={Back} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>

            <View style={{alignItems: "center"}}>
              <Text style={styles.tittle}>LOGIN</Text>
            </View>
      
            <View style={styles.input}>
              <TextInput
                placeholder='User'
                onChangeText={(textWritting) => {setUsername(textWritting)}}
                rules={{ required: 'Usuario incorrecto.' }}
              />
            </View>
            <View style={styles.input}>
              <TextInput
              secureTextEntry
                placeholder='Password'
                onChangeText={(textWritting) => {setPassword(textWritting)}}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => validateUser(username, password)}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', marginTop: 20, alignSelf: 'flex-start'}}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.link}>Register</Text>
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
    title: { 
      marginBottom: 20,
      fontSize: 17,
      color: 'red'
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    link: {
        color: "blue",
        marginLeft: 5
    }
})
