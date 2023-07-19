import { useState } from 'react';
import { View, Alert, Image, StyleSheet, Text } from 'react-native'
import ButtonExpense from './ButtonExpense';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { colors } from '../data/Colors';


function ImagePicker(props) {

  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionRequest = await requestPermission();
      return permissionRequest.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permission!", "You need to grant permission to use this feature.");
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage(image.assets[0].uri);
    props.updateImage(image.assets[0].uri);
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {pickedImage ? <Image source={{ uri: pickedImage }} style={styles.image} /> : <Text style={styles.text}>No image taken yet.</Text>}

      </View>
      <View style={styles.imageButton}>
        <ButtonExpense onPress={takeImageHandler} primary={true}>Take Image</ButtonExpense>
      </View>
    </View>
  )

}


export default ImagePicker;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    paddingBottom: "10%",
    flexDirection: "row"
  },
  preview: {
    backgroundColor: colors.quaternary,
    width: "70%",
    borderRadius: 5,
    marginRight: "5%",
    justifyContent: "center",
    overflow: "hidden"

  },
  image: {
    height: "100%",
    width: "100%"
  },
  text: {
    color: colors.primary,
    padding: "3%",
    fontSize: 25,
    textAlign: "center"
  },
  imageButton: {
    width: "25%"
  }
})