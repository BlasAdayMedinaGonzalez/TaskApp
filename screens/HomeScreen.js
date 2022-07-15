import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Constants from "../constants/constants";
import ModalHomeAdd from "../components/ModalHomeAdd";
import ModalHomeEdit from "../components/ModalHomeEdit";

export default function HomeScreen({ homeData, setRefreshData, userId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [taskItem, setTaskItem] = useState();

  const deleteTask = (taskId) => {
    fetch(Constants.urlGetTasks + taskId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    })
      .then((res) => res.json())
      .then((res) => console.log(res.message))
      .catch((err) => console.error(err));

    setRefreshData(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalHomeEdit taskItem={taskItem} modalVisibleEdit={modalVisibleEdit} setModalVisibleEdit={setModalVisibleEdit} setRefreshData={setRefreshData} />
      <FlatList
        data={homeData}
        keyExtractor={(item) => item.task_id}
        renderItem={(task) => {
          return (
            <View style={styles.Container}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={styles.items}>
                  <Text style={styles.titleText}>Tittle</Text>
                  <Text>{task.item.tittle}</Text>
                  <Text style={styles.titleText}>Description</Text>
                  <Text>{task.item.description}</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => {setModalVisibleEdit(true); setTaskItem(task.item)}}
                >
                  <Icon name="create-outline" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => deleteTask(task.item.task_id)}
                >
                  <Icon name="trash" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <ModalHomeAdd
        homeData={homeData}
        setRefreshData={setRefreshData}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        userId={userId}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 20
  },
  buttonAdd: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "chartreuse",
    elevation: 15,
  },
  buttonDelete: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "red",
    elevation: 15,
    margin: 5,
  },
  buttonEdit: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "yellow",
    elevation: 15,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
  },
  Container: {
    padding: 20,
    backgroundColor: "pink",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    //ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    //android
    elevation: 5,
  },
  items: {
    width: 125
  },
});
