import { TextInput, Text, View, StyleSheet, Modal, Pressable } from "react-native";
import ButtonExpense from "../components/ButtonExpense";
import { colors } from "../data/Colors";
import { useState, useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import { useEffect } from "react";
import DatePicker from "./DatePicker";
import ErrorMessage from "../components/ErrorMessage";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from '../components/LocationPicker'


export default function UpdateExpense() {
    const [item, setItem] = useState({
        name: "", date: new Date(), price: "", imageURI: "", location: "",
    });
    const [error, setError] = useState({ name: "", price: "", location: "" })
    const sharedData = useContext(ExpenseContextModule);

    useEffect(() => {
        sharedData.toogleLocation(false)

    }, []);

    useEffect(() => {
        setError({ name: "", price: "", location: "" })
    }, [sharedData.locationLoading]);



    //get the initial amount for update
    useEffect(() => {
        setItem({
            name: sharedData.updatedExpense.name, date: sharedData.updatedExpense.date, price: sharedData.updatedExpense.price,
            imageURI: sharedData.updatedExpense.imageURI, location: sharedData.updatedExpense.location
        })
    }, [])

    function changeHandler(itemName, value) {
        setError({ name: "", price: "" }); //by changing the input, the error messages will vanish
        setItem({ ...item, [itemName]: value }) //by changing the input, the state will update
    }

    function updateDate(date) {
        setItem({ ...item, date: date }) // by confirming the date picker, the state will be updated
    }

    function updateImage(uri) {
        setItem({ ...item, imageURI: uri })
    }

    function updateLocation(loc, address) {
        setItem({ ...item, location: loc, address: address })
    }


    function updateHandler() {
        if (item.name && item.price) { //check if the inputes are empty or not
            if (sharedData.locationLoading) {
                setError({ ...error, location: "Location has not been yet loaded !" });
            } else {
                sharedData.addExpense(item, false); //with argument false we do update
            }
        } else {
            if (!item.name && !item.price) {
                setError({ name: "Please, Fill the Name !", price: "Please, Fill the Price !" })
            } else if (!item.name) {
                setError({ ...error, name: "Please, Fill the Name !" })
            } else if (!item.price) {
                setError({ ...error, price: "Please, Fill the Price !" })
            }
        }
    }

    return (
        <Modal transparent={true} animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Update Expense</Text>
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.itemName} placeholder="Expense Name" value={item.name} onChangeText={(value) => changeHandler("name", value)} />
                    <ErrorMessage>{error.name}</ErrorMessage>
                    <Pressable onPress={() => sharedData.toggleModal(4)}>
                        <Text style={styles.date}>{item.date.toDateString()} </Text>
                        {sharedData.modal.showDate && <DatePicker updateDate={updateDate} />}
                    </Pressable>
                    <ErrorMessage></ErrorMessage>
                    <TextInput style={styles.price} placeholder="Price" value={item.price} onChangeText={(value) => changeHandler("price", value)} keyboardType="numeric" />
                    <ErrorMessage>{error.price}</ErrorMessage>
                </View>
                <View style={styles.image}>
                    <ImagePicker updateImage={updateImage} oldImageURL={item.imageURI} />
                </View>
                <View style={styles.location}>
                    <LocationPicker updateLocation={updateLocation} oldLocationURL={item.location} />
                    <ErrorMessage>{error.location}</ErrorMessage>
                </View>
                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(2)}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={updateHandler}>Update</ButtonExpense>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        marginTop: "13%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        alignItems: "center",
        overflow: "hidden"
    },
    header: {
        width: "100%",
        height: "5%",
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: colors.quaternary,
        fontWeight: 800,
        fontSize: 18
    },
    input: {
        width: "80%",
        height: "27%",
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    itemName: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        color: colors.primary,
        padding: "5%",
        fontSize: 15,
        fontWeight: 500,
    },
    date: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%",
        fontSize: 15,
        fontWeight: 500,
        color: colors.primary
    },
    price: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%",
        fontSize: 15,
        fontWeight: 500,
    },
    buttonArea: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonArea: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "center"
    },
    image:{
        height:"25%"
    },
    location:{
        height:"23%",
        marginBottom:"5%"
    }
})