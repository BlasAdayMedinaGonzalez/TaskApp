import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function WellcomeScreen({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  setUserId,
  setRefreshData,
}) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.root}>
      <View style={styles.imageCase}>
        <Text style={{ marginBottom: 15, fontWeight: "bold" }}>
          Wellcome to the Task app
        </Text>
        <Image
          source={require("../assets/tarea.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View style={styles.centeredButtons}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => setIsLogin(true)}
        >
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => setIsLogin(false)}
        >
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
      </View>
      {isLogin ? (
        <LoginScreen
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUserId={setUserId}
          setRefreshData={setRefreshData}
        />
      ) : (
        <RegisterScreen
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUserId={setUserId}
          setRefreshData={setRefreshData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "aqua",
    paddingTop: 60,
  },
  imageCase: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredButtons: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  button1: {
    width: 160,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 2,
    elevation: 15,
  },
  button2: {
    padding: 10,
    width: 160,
    backgroundColor: "darkturquoise",
    borderRadius: 5,
    justifyContent: "center",
    shadowOpacity: 1.5,
    elevation: 15,
  },
  buttonText1: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  buttonText2: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
