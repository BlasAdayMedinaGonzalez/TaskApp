import React, {useEffect, useState} from 'react'
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Constants from '../constants/constants';
import {getUsers} from "../services/services"

export default function HomeScreen () {
  const [users, setusers]  = useState([]);

  useEffect( () => {
    // fetch(Constants.urlGetAllUsers)
    // .then(response => response.json())
    // .then(data => setusers(data.data))
    // .catch(error =>console.log(error));
    getUsers()
    .then(
      res=> setusers(res.data.data)
    )
    .catch(error => console.log(error))
  },[])

  return (
    <View>
      <FlatList
        data={users}
        renderItem={(user) => {
          return (
            <View style={styles.root}>
              <View style={styles.item}>
                <Text>{user.item.name}</Text>
                <Text>{user.item.email}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"pink",
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10
  },
  item: {
    padding: 10,
    backgroundColor:"green"
  },
})