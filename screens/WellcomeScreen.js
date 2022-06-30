import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {useNavigation} from '@react-navigation/native';

export default function WellcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
        <View style={styles.centered}>
        <Pressable
            style={styles.button1}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.buttonText1}>Login</Text>
        </Pressable>
        <Pressable
            style={styles.button2}
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={styles.buttonText2}>Register</Text>
        </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    centered: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 22,
      marginTop: 22,
    },
    viewText: {
      marginBottom: 20,
      borderWidth: 2,
      borderRadius: 5,
      padding: 2,
    },
    button1: {
      padding: 10,
      width: 100,
      backgroundColor: "white",
      borderRadius: 5
    },
    button2: {
        padding: 10,
        width: 100,
        backgroundColor: "#2196F3",
        borderRadius: 5,
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