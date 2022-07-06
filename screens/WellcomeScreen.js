import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {useNavigation} from '@react-navigation/native';


export default function WellcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
        <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
          <Text style={{marginBottom: 15, fontWeight: "bold"}}>Wellcome to the Task app</Text>
          <Image source={require('../assets/tarea.png')} style={{width: 200, height: 200}} />
        </View>
        <View style={styles.centeredButtons}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText1}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText2}>Register</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    backgroundColor: "aqua"
  },
  centeredButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 22,
    
  },
  button1: {
    padding: 10,
    width: 120,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 15,
  },
  button2: {
    padding: 10,
    width: 120,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    justifyContent: 'center',
    shadowOpacity: 1.5,
    elevation: 15,
  },
  buttonText1: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  buttonText2: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  }
});