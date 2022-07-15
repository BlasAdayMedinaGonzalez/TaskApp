import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

import ModalProfile from "../components/ModalProfile";

export default function ProfileScreen({ profileData, setRefreshData }) {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const imagePicker = async () => {
    try {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={imagePicker}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../assets/Profile_avatar.png")}
              style={styles.avatar}
            />
          )}
          <Text>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileCase}>
        <Text style={styles.itemTittle}>Name </Text>
        <Text style={styles.itemText}>{profileData.name}</Text>
        <Text style={styles.itemTittle}>Email</Text>
        <Text style={styles.itemText}>{profileData.email}</Text>
      </View>
      <ModalProfile
        profileData={profileData}
        setRefreshData={setRefreshData}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <View style={styles.buttonEdit}>
        <TouchableOpacity
          style={{ backgroundColor: "yellow", padding: 15, borderRadius: 10 }}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="create-outline" size={25} />
        </TouchableOpacity>
      </View>
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
  profileCase: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  itemTittle: {
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  itemText: {
    color: "black",
  },
  buttonEdit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
