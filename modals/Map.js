import { useState, useContext } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ButtonExpense from '../components/ButtonExpense';
import { ExpenseContextModule } from '../store/ExpenseContext';
import { colors } from '../data/Colors';

function Map(props) {
    const [selectedLocation, setSelectedLocation] = useState();

    const sharedData = useContext(ExpenseContextModule)

    const region = {
        latitude: 48.573405,
        longitude: 13.454985,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lon = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ lat: lat, lon: lon });
    }

    async function confirmHandler() {
        sharedData.toggleModal(5);
        props.updateLocation(selectedLocation)

    }

    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={styles.confirmArea}>
                    <ButtonExpense onPress={confirmHandler} primary={true}>Confirm</ButtonExpense>
                </View>
                <View style={styles.mapArea}>
                    <MapView
                        style={styles.map}
                        initialRegion={region}
                        onPress={selectLocationHandler}
                    >
                        {selectedLocation && (
                            <Marker
                                title="Picked Location"
                                coordinate={{
                                    latitude: selectedLocation.lat,
                                    longitude: selectedLocation.lon,
                                }}
                            />
                        )}
                    </MapView>
                </View>
            </View>
        </Modal>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    confirmArea: {
        height: "15%",
        backgroundColor:colors.primary,
        paddingHorizontal:"25%",
        paddingTop:"15%",
        paddingBottom:"5%"
    },
    mapArea: {
        height: "85%"
    }
});