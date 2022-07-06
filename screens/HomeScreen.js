import React, {useEffect, useState} from 'react'
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

export default function HomeScreen ({homeData}) {

  return (
    <View>
      <View style={{flexDirection: "row",justifyContent: "center", padding: 10}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Press")}
          >
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={homeData}
        renderItem={(user) => {
          return (
            <View style={styles.list}>
              <View style={styles.item}>
                <Text>{user.item.tittle}</Text>
                <Text>{user.item.description}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'chartreuse',
    elevation: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 25
  },
  list: {
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
    padding: 10
  },
})