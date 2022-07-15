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

const ModalHomeEdit = ({
  taskItem,
  setModalVisibleEdit,
  modalVisibleEdit,
  setRefreshData
}) => {
  const [tittle, setTittle] = useState();
  const [description, setDescription] = useState();

  const editData = (tittle, description) => {
    if (!tittle) {
      tittle = taskItem.tittle;
    }
    if (!description) {
      description = taskItem.description;
    }
    const submitNewData = {
      tittle,
      description,
    };
    fetch(Constants.urlGetTasks + taskItem.task_id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitNewData),
    })
      .then((res) => res.json())
      .then((response) => console.log(response.message))
      .catch((err) => console.error(err));

    setRefreshData(true);
    setDescription("");
    setTittle("");
    setModalVisibleEdit(!modalVisibleEdit);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEdit}
        onRequestClose={() => {
          setModalVisibleEdit(!modalVisibleEdit);
        }}
      >
        <View style={styles.modalView}>
          <View style={{flex: 4, justifyContent: 'center'}}>
            <Text style={styles.modalText}>EDIT {"\n"} A {"\n"} Task! </Text>
            <View style={{alignItems: 'center'}}>
              <TextInput
                style={styles.input}
                placeholder="Tittle"
                defaultValue={taskItem?.tittle}
                onChangeText={(textWritting) => {
                  setTittle(textWritting);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                defaultValue={taskItem?.description}
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
              onPress={() => editData(tittle, description)}
            >
              <Text style={styles.textStyle}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                setModalVisibleEdit(!modalVisibleEdit);
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

export default ModalHomeEdit;
