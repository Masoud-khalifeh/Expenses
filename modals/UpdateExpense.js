import { TextInput, Text, View, StyleSheet, Modal, Pressable } from "react-native";
import ButtonExpense from "../components/ButtonExpense";
import { colors } from "../data/Colors";
import { useState, useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import { useEffect } from "react";
import DatePicker from "./DatePicker";
import ErrorMessage from "../components/ErrorMessage";


export default function UpdateExpense() {
    const [item, setItem] = useState({
        name: "", date: new Date(), price: ""
    });
    const [error, setError] = useState({ name: "", price: "" })
    const sharedData = useContext(ExpenseContextModule);

    //get the initial amount for update
    useEffect(() => { 
        setItem({ name: sharedData.updatedExpense.name, date: sharedData.updatedExpense.date, price: sharedData.updatedExpense.price })
    }, [])

    function changeHandler(itemName, value) {
        setError({ name: "", price: "" }); //by changing the input, the error messages will vanish
        setItem({ ...item, [itemName]: value }) //by changing the input, the state will update
    }

    function updateDate(date) {
        setItem({ ...item, date: date }) // by confirming the date picker, the state will be updated
    }

    function updateHandler() {
        if (item.name && item.price) { //check if the inputes are empty or not
            sharedData.addExpense(item,false); //with argument false we do update
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
                    <Pressable onPress={() => sharedData.toggleModal(4)}>
                        <Text style={styles.date}>{item.date.toDateString()} </Text>
                        {sharedData.modal.showDate && <DatePicker updateDate={updateDate} />}
                    </Pressable>
                    <TextInput style={styles.price} placeholder="Price" value={item.price} onChangeText={(value) => changeHandler("price", value)} keyboardType="numeric" />
                </View>
                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(2)}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={updateHandler}>Update</ButtonExpense>
                </View>
                <View style={styles.errorArea}>
                    {error.name && <ErrorMessage>{error.name}</ErrorMessage>}
                    {error.price && <ErrorMessage>{error.price}</ErrorMessage>}
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
        borderWidth:2,
        borderColor:"black",
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
        height: 200,
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    itemName: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        color: colors.primary,
        padding: "5%"
    },
    date: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%"
    },
    price: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%"
    },

    buttonArea: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "center"
    },
    errorArea: {
        width: "80%",
        marginTop: "10%"
    },
})