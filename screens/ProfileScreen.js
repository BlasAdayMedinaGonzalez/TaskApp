import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native';

export default function ProfileScreen ({username}) {

  return (
    <View style={styles.root}>
      <View style={styles.item}>
        <Text style={styles.itemText}>Nombre perfil: {username}</Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: 'black',
  }
})