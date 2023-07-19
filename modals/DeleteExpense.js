import { Text, View, StyleSheet, Modal, } from "react-native";
import ButtonExpense from "../components/ButtonExpense";
import { colors } from "../data/Colors";
import { useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import Icon from "../components/Icon";

export default function DeleteExpense() {
    const sharedData = useContext(ExpenseContextModule);

    function UpdateHandler() {
        sharedData.getUpdatedExpense();// call the function to delete 
        sharedData.toggleModal(3); //closes the Delete or update Modal
    }

    return (
        <Modal transparent={true} animationType="slide">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Delete or Update Expense</Text>
                </View>

                <View style={styles.buttonArea}>
                    <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(1)}>Cancel</ButtonExpense>
                    <ButtonExpense primary={true} onPress={UpdateHandler}>Update</ButtonExpense>
                </View>
                <View style={styles.deleteArea}>
                    <Icon onPress={sharedData.deleteExpense} color={"red"} size={40} name="delete" />
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
        justifyContent: "center",
        marginVertical: "5%"
    },
    deleteArea: {
        width: "80%",
        flex: 1,
        borderColor: colors.quaternary,
        borderTopWidth: "3%",
        padding: "3%"
    }
})