import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import Constants from "../constants/constants";

const ModalProfile = ({
  profileData,
  modalVisible,
  setModalVisible,
  setRefreshData,
}) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const updateData = (name, email) => {
    if (!name) {
      name = profileData.name;
    }
    if (!email) {
      email = profileData.email;
    }
    const submitNewData = {
      name,
      email,
    };
    fetch(Constants.urlGetAllUsers + profileData.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitNewData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.message);
      })
      .catch((err) => console.log(err));

    setRefreshData(true);
    console.log("data refrescada");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Profile</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              defaultValue={profileData.name}
              onChangeText={(textWritting) => {
                setUsername(textWritting);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              defaultValue={profileData.email}
              onChangeText={(textWritting) => {
                setEmail(textWritting);
              }}
            />
          </View>
          <View style={styles.buttonsCase}>
            <TouchableOpacity
              style={styles.buttonApply}
              onPress={() => updateData(username, email)}
            >
              <Text style={styles.textStyle}>APPLY CHANGES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "aqua",
    borderRadius: 20,
    padding: 35,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  input: {
    width: "75%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
  },
  buttonsCase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
  },
  buttonApply: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: "green",
  },
  buttonClose: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "yellow",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalProfile;
