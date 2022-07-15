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
  setUserId,
  setRefreshData,
}) {
  const navigation = useNavigation();
  const [displayMessageStatus, setDisplayMessageStatus] = useState();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleError = (status, message) => {
    if (status) {
      setDisplayMessageStatus(
        <Text style={styles.displayMessageSyleError}>{message}</Text>
      );
    }
    if (status === false) {
      setDisplayMessageStatus(
        <Text style={styles.displayMessageSyleSuccess}>{message}</Text>
      );
    }
  };

  const passwordValidation = async (pass, dataPassword) => {
    try {
      if (await bcrypt.compare(pass, dataPassword)) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("Contraseña vacía");
      return false;
    }
  };

  const validateUser = async (user, pass) => {
    try {
      const res = await fetch(Constants.urlGetAllUsers + user);
      const resData = await res.json();

      if (user === "" || pass === "") {
        handleError(true, "Error: Please fill all fields.");
        return;
      }
      if (resData.message === "User is not found") {
        handleError(true, resData.message);
        return;
      }

      if (!(await passwordValidation(pass, resData.data.password))) {
        console.log("Contraseña incorrecta tete");
        handleError(true, "Error: Password Incorrect");
        return;
      }

      handleError(false, "Login success, navigating to Home");
      setUserId(resData.data.id);
      setRefreshData(true);
      return navigation.navigate("TabsBottom", { screen: "Home" });
    } catch (error) {
      console.log(error);
    }
  };

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
    color: "darkred",
    marginHorizontal: 10,
    backgroundColor: "crimson",
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    marginTop: 10,
  },
  displayMessageSyleSuccess: {
    color: "chartreuse",
    marginHorizontal: 10,
    backgroundColor: "green",
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    marginTop: 10,
  },
});
