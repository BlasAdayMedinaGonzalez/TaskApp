import { View, Text, Image, Pressable, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Back from '../assets/back.png'

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.root}>
          <Pressable style={{ alignSelf: 'flex-start' }} onPress={() => navigation.navigate('Wellcome')}>
            <Image source={Back} style={{ width: 25, height: 25 }} />
          </Pressable>
    
          <View style={styles.input}>
            <TextInput
              placeholder='User'
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder='Password'
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabsBottom', {screen: "Home"})}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', marginTop: 20, alignSelf: 'flex-start'}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Register</Text>
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
