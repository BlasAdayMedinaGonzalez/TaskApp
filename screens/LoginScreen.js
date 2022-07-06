import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import bcrypt from "bcryptjs";

import Constants from "../constants/constants";

export default function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  setUserId
}) {
  const navigation = useNavigation();
  const [confirmedError, setConfirmedError] = useState(false);

  const passwordValidation = async (pass, res) => {
    try {
      if (await bcrypt.compare(pass, res.data.password)) {
        console.log(
          "pasa por aquí",
          pass,
          await bcrypt.compare(pass, res.data.password)
        );
        setUserId(res.data.id);
        return navigation.navigate("TabsBottom", { screen: "Home" });
      } else {
        console.log(
          "Incorrecto",
          pass,
          await bcrypt.compare(pass, res.data.password)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateUser = (user, pass) => {
    if (user === "" || pass === "") {
      setConfirmedError(true)
      console.log("Na nai otra vex");
    } else {
      fetch(Constants.urlGetAllUsers + user)
        .then((res) => res.json())
        .then((res) => {
          if (res.data.password === null) {
            console.log("Null password");
          } else {
            setConfirmedError(false)
            passwordValidation(pass, res);
          }
        })
        .catch(() =>
          setConfirmedError(true)
        );
    }
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
            onChangeText={(textWritting) => {
              setUsername(textWritting);
            }}
            rules={{ required: "Usuario incorrecto." }}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(textWritting) => {
              setPassword(textWritting);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => validateUser(username, password)}
        >
          <Text style={styles.text}>Login</Text>
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
    backgroundColor: "white",
    elevation: 15,
  },
  text: {
    fontWeight: "bold",
  },
  title: {
    marginBottom: 20,
    fontSize: 17,
    color: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "blue",
    marginLeft: 5,
  },
});
