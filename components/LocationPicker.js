import {useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import ButtonExpense from "./ButtonExpense";
import { colors } from '../data/Colors';

function LocationPicker(props) {
    const [pickedLocation, setPickedLocation]=useState()

    function currentLocatinHandler() {

    }

    function mapLocatinHandler() {

    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {pickedLocation ? <Image source={{ uri: pickedLocation }} style={styles.image} /> : <Text style={styles.text}>No Location taken yet.</Text>}

            </View>
            <View style={styles.imageButton}>
                <ButtonExpense onPress={mapLocatinHandler} primary={false} icon={{ name: 'map', size: 20, color: colors.quaternary }}> Pick on Map</ButtonExpense>
                <ButtonExpense onPress={currentLocatinHandler} primary={true} icon={{ name: 'location-arrow', size: 20, color: colors.quaternary }}> Locate User</ButtonExpense>
            </View>
        </View>
    )
}



export default LocationPicker;



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