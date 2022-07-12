import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ username }) {
  const [image, setImage] = useState(null);

  const imagePicker = async () => {
    try {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setImage(result.uri);
        }
        console.log(result);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.profileItem}>
        <TouchableOpacity style={{alignItems: "center"}} onPress={imagePicker}>
          {image ? <Image source={{ uri: image }} style={styles.avatar} /> : <Image source={require("../assets/Profile_avatar.png")} style={styles.avatar} /> }
          <Text >Cambiar Foto</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemText}>Nombre perfil: {username} </Text>
      <Text style={styles.itemText}>Correo: </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "aquamarine",
  },
  profileItem: {
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  itemText: {
    color: "black",
    fontWeight: "bold",
  },
});
