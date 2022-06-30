import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import Back from '../assets/back.png'

export default function RegisterScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
          <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => navigation.navigate('Wellcome')}>
            <Image source={Back} style={{width: 25, height: 25}}/>
          </TouchableOpacity>
          
          <View style={styles.input}>
            <TextInput
              placeholder='User'
              onChangeText={"(username) => {setUsername(username)}"}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder='Email'
              onChangeText={"(email) => setEmail(email)"}
            />
          </View>
          <View style={styles.input}>
            <TextInput
            secureTextEntry
              placeholder='Password'
              onChangeText={"(passwords) => setPasswords(passwords)"}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabsBottom', {screen: "Home"})}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', marginTop: 20, alignSelf: 'flex-start'}}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
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