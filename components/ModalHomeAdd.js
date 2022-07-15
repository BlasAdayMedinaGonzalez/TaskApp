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

const ModalHomeAdd = ({
  homeData,
  setModalVisible,
  modalVisible,
  setRefreshData,
  userId,
}) => {
  const [tittle, setTittle] = useState();
  const [description, setDescription] = useState();

  const addTask = (tittle, description) => {
    if (!description || !tittle) {
      return;
    }
    const submitNewData = {
      tittle,
      description,
    };
    fetch(Constants.urlGetTasks + userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitNewData),
    })
      .then((res) => res.json())
      .then((res) => console.log(res.message))
      .catch((err) => console.error(err));

    setRefreshData(true);
    setModalVisible(!modalVisible);
    setDescription("");
    setTittle("");
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
          <View style={{flex: 4, justifyContent: 'center'}}>
            <Text style={styles.modalText}>Add {"\n"} A {"\n"} New Task! </Text>
            <View style={{alignItems: 'center'}}>
              <TextInput
                style={styles.input}
                placeholder="Tittle"
                onChangeText={(textWritting) => {
                  setTittle(textWritting);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                multiline={true}
                blurOnSubmit={true}
                onChangeText={(textWritting) => {
                  setDescription(textWritting);
                }}
              />
            </View>
          </View>
          <View style={styles.buttonsCase}>
            <TouchableOpacity
              style={styles.buttonApply}
              onPress={() => addTask(tittle, description)}
            >
              <Text style={styles.textStyle}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
                setDescription("");
                setTittle("");
              }}
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
    fontSize:30,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 110,
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
    fontSize: 40,
    color: "blue",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalHomeAdd;
