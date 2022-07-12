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
  setUserId,
  setRefreshData,
}) {
  const navigation = useNavigation();
  const [confirmedError, setConfirmedError] = useState();

  const passwordValidation = async (pass, data) => {
    try {
      console.log("pasa por aquí",);
      if (await bcrypt.compare(pass, data.password)) {
        console.log("pasa por aquí",);
        setUserId(data.id);
        setRefreshData(true);
        setConfirmedError(undefined);
        return navigation.navigate("TabsBottom", { screen: "Home" });
      }
    } catch (error) {
      console.log("Incorrecto");
      setConfirmedError(true);
    }
  };

  const validateUser = async(user, pass) => {
    try {
      const res = await fetch(Constants.urlGetAllUsers + user)
      const resObject = await res.json();
      if (user === "" || pass === "") {
        setConfirmedError(true);
        console.log("Na nai otra vex");
      } else {
        setConfirmedError(false);
        passwordValidation(pass, resObject.data);
      }
    } catch (error) {
      setConfirmedError(true)
      console.log(error);
    }
    
  };

  let displayMessageStatus;
  if (confirmedError) {
    displayMessageStatus = (
      <Text style={styles.displayMessageSyleError}>
        Error logging in, please try again.
      </Text>
    );
  } else if (confirmedError === false) {
    displayMessageStatus = (
      <Text style={styles.displayMessageSyleSuccess}>
        Login success, redirecting to Home...
      </Text>
    );
  }

  return (
    <View style={styles.root}>
      {displayMessageStatus}
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
  displayMessageSyleError: {
    color: "black",
    marginHorizontal: 10,
    backgroundColor: "red",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    borderRadius: 10,
  },
  displayMessageSyleSuccess: {
    color: "black",
    marginHorizontal: 10,
    backgroundColor: "green",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    borderRadius: 10,
  },
});
