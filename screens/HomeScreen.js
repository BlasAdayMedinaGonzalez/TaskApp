import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Constants from "../constants/constants";

export default function HomeScreen({ homeData, setRefreshData }) {
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
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => console.log("Press")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={homeData}
        renderItem={(task) => {
          return (
            <View style={styles.list}>
              <View style={styles.item}>
                <Text>Tittle: {task.item.tittle}</Text>
                <Text>Description: {task.item.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => deleteTask(task.item.task_id)}
              >
                <Icon name="trash" size={25} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  buttonText: {
    color: "white",
    fontSize: 25,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "pink",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
  },
  item: {
    padding: 10,
  },
});
