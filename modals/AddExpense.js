import { TextInput, Text, View, StyleSheet, Modal, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import ButtonExpense from "../components/ButtonExpense";
import { colors } from "../data/Colors";
import { useState, useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker from "./DatePicker";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from '../components/LocationPicker'
import { useEffect } from "react";
import { addExpense, getIdExpense } from "../utility/http";
import Spinner from 'react-native-loading-spinner-overlay';



export default function AddExpense(props) {
    const [item, setItem] = useState({
        name: "", date: new Date(), price: "", imageURI: "", location: "", address: ""
    });
    const [error, setError] = useState({ name: "", price: "", location: "" });
    const [loading, setLoading] = useState(false);
    const sharedData = useContext(ExpenseContextModule);

    useEffect(() => {
        sharedData.toogleLocation(false)

    }, [])

    useEffect(() => {
        setError({ name: "", price: "", location: "" })
    }, [sharedData.locationLoading])

    function changeHandler(itemName, value) {
        setError({ name: "", price: "", location: "" }); //by changing the input, the error messages will vanish
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

    async function submitHandler() {
        if (item.name && item.price && !loading) { //check if the inputes are empty or not
            if (sharedData.locationLoading) {
                setError({ ...error, location: "Location has not yet been loaded !" });
            } else {
                setLoading(true);
                if (await addExpense({ userID: sharedData.user.id, ...item }) === 1) {
                    sharedData.addExpense({ id: await getIdExpense(item.name, item.date), userID: sharedData.user.id, ...item }, true); //with argument true we do add not update
                    setLoading(false);
                    if (props.redirect) { //if the addExpense is called from RecentExpenses, it will redirect it to AllExpenses
                        props.redirect()
                    }
                } else {
                    alert("Error in recording information");
                }

                setLoading(false);
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
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
            <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Expense</Text>
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.itemName} placeholder="Expense Name" value={item.name} onChangeText={(value) => changeHandler("name", value)} />
                    <ErrorMessage>{error.name}</ErrorMessage>
                    <Pressable onPress={() => sharedData.toggleModal(4)}>
                        <Text style={styles.date}>{item.date.toDateString()} </Text>
                        {sharedData.modal.showDate && <DatePicker updateDate={updateDate} />}
                    </Pressable>
                    <ErrorMessage></ErrorMessage>
                    <TextInput style={styles.price} placeholder="Price" value={item.price} onChangeText={(value) => changeHandler("price", value)} keyboardType="number-pad" />
                    <ErrorMessage>{error.price}</ErrorMessage>
                </View>
                <View style={styles.image}>
                    <ImagePicker updateImage={updateImage} oldImageURL={null} />
                </View>
                <View style={styles.location}>
                    <LocationPicker updateLocation={updateLocation} />
                    <ErrorMessage>{error.location}</ErrorMessage>
                </View>
                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(0)}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={submitHandler}>Add</ButtonExpense>
                </View>
            </View>
            </TouchableWithoutFeedback>
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
    image: {
        height: "25%"
    },
    location: {
        height: "23%",
        marginBottom: "5%"
    }
})