import { useState } from 'react';
import { View, StyleSheet, Text, Alert, Image } from "react-native";
import ButtonExpense from "./ButtonExpense";
import { colors } from '../data/Colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { getMapPreview, getAddress } from '../utility/Location';
import { useEffect } from 'react';


function LocationPicker(props) {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const [address, setAddress] = useState()


    async function verifyPermission() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionRequest = await requestPermission();
            return permissionRequest.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permission!", "You need to grant permission to use this feature.");
            return false;
        }
        return true;
    };


    async function currentLocatinHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({ lat: location.coords.latitude, lon: location.coords.longitude });

        // props.updateLocation({lat:location.coords.latitude,lon:location.coords.longitude})
    }

    useEffect(() => {
        if (pickedLocation) {
            async function fetchAddress() {
                const gotAddress = await getAddress(pickedLocation.lat, pickedLocation.lon);
                setAddress(gotAddress);
            };
            fetchAddress();
        }

    }, [pickedLocation])

    useEffect(() => {
        if (address) {
            props.updateLocation({...pickedLocation},address)
        }
    }, [address])

    function mapLocatinHandler() {

    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {pickedLocation ? <Image source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lon) }} style={styles.image} /> : <Text style={styles.text}>No Location taken yet.</Text>}

            </View>
            <View style={styles.imageButton}>
                <ButtonExpense onPress={mapLocatinHandler} primary={false} icon={{ name: 'map', size: 20, color: colors.quaternary }} textSize={15} > Pick on Map</ButtonExpense>
                <ButtonExpense onPress={currentLocatinHandler} primary={true} icon={{ name: 'location', size: 20, color: colors.quaternary }}  textSize={15}> Locate User</ButtonExpense>
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