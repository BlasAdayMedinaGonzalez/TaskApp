import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

export default function RegisterScreen({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const navigation = useNavigation();
  const [confirmedError, setConfirmedError] = useState(false);

  const onSignUpPressed = () => {
    const submitUser = {
      name: username,
      email,
      password,
    };
    fetch(Constants.urlGetAllUsers, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(submitUser),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Bad request. Please fill all fields.") {
          setConfirmedError(true)
          console.log("Bad request. Please fill all fields.");
        } else if (response.message === "User was already registered") {
          console.log("User was already registered");
          setConfirmedError(true)
          setUsername("");
          setPassword("");
          setEmail("");
        } else {
          setConfirmedError(false)
          return navigation.navigate("TabsBottom", { screen: "Home" });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  let isErrorConfirmed;
  if (confirmedError) {
    isErrorConfirmed= (
      <Text style={{color:"red", textAlign:"center", fontWeight:"bold", marginTop:10}}>Error Founded, Please try again</Text>
    )
  }

  return (
    <View style={styles.root}>
      {isErrorConfirmed}
      <View style={styles.loginCase}>
        <View style={styles.input}>
          <TextInput
            placeholder="User"
            value={username}
            onChangeText={(textWritting) => setUsername(textWritting)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(textWritting) => setEmail(textWritting)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            secureTextEntry
            value={password}
            placeholder="Password"
            onChangeText={(textWritting) => setPassword(textWritting)}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onSignUpPressed()}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "aqua",
  },
  loginCase: {
    paddingHorizontal: 10,
    borderColor: "black",
  },
  tittle: {
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 15,
    justifyContent: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#35AAF2",
    elevation: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  link: {
    color: "blue",
    marginLeft: 5,
  },
});
