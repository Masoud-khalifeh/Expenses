import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ButtonExpense from "../components/BottunExpense";
import { StyleSheet } from "react-native";
import { Modal } from "react-native";
import { colors } from "../data/Colors";
import { useState, useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";

export default function AddExpense() {
    const [item, setItem] = useState({
        name: "", date: "", price: ""
    });

    const sharedData = useContext(ExpenseContextModule);

    function changeHandler(itemName, value) {

        setItem({...item,[itemName]:value})
       

    }




    function submitHandler() {
        sharedData.addExpense(item);
     
    }

    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Expense</Text>
                </View>
                <View style={styles.input}>
                    <TextInput style={styles.itemName} placeholder="Expense Name" value={item.name} onChangeText={(value) => changeHandler("name", value)} />
                    <TextInput style={styles.date} placeholder="Date" value={item.date} onChangeText={(value) => changeHandler("date", value)} />
                    <TextInput style={styles.price} placeholder="Price" value={item.price} onChangeText={(value) => changeHandler("price", value)} keyboardType="numeric"/>
                </View>
                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={sharedData.toggleAddModel}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={submitHandler}>Add</ButtonExpense>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        marginTop: 80,
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
})