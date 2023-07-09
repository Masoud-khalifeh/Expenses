import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ButtonExpense from "../components/BottunExpense";
import { StyleSheet } from "react-native";
import { Modal, Pressable } from "react-native";
import { colors } from "../data/Colors";
import { useState, useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker from "./DatePicker";

export default function AddExpense() {
    const [item, setItem] = useState({
        name: "", date: new Date().toDateString(), price: ""
    });
    const [error, setError] = useState({ name: "", price: "" })
    const [date, setDate] = useState(new Date());


    const sharedData = useContext(ExpenseContextModule);

    function changeHandler(itemName, value) {
        setError({ name: "", price: "" });

        setItem({ ...item, [itemName]: value })


    }



    function submitHandler() {
        if (item.name && item.price) {
            sharedData.addExpense(item, true);
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
                    <Text style={styles.headerText}>Add Expense</Text>
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.itemName} placeholder="Expense Name" value={item.name} onChangeText={(value) => changeHandler("name", value)} />

                    <Pressable onPress={()=>sharedData.toggleModal(4)}>
                        <Text style={styles.date}>{item.date} </Text>
                        {sharedData.modal.showDate && <DatePicker />}
                    </Pressable>

                    <TextInput style={styles.price} placeholder="Price" value={item.price} onChangeText={(value) => changeHandler("price", value)} keyboardType="numeric" />
                    
                </View>
                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(0)}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={submitHandler}>Add</ButtonExpense>
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
        height: 200,
        justifyContent: "space-between",
        marginVertical: "5%"
    },
    itemName: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        color: colors.primary,
        padding: "5%",
        fontSize:15,
        fontWeight:500,
    },
    date: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%",
        fontSize:15,
        fontWeight:500,
        color:colors.primary
    },
    price: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.quaternary,
        padding: "5%",
        fontSize:15,
        fontWeight:500,
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
    buttonArea: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "center"
    },
})