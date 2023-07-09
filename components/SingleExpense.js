import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import { colors } from '../data/Colors'
import { useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";

export default function SingleExpense(props) {
    const sharedData = useContext(ExpenseContextModule);


    function deleteHandler() {
        sharedData.getDeletedId(props.delId);
        sharedData.toggleModal(1);
    }

    return (
        <Pressable style={styles.container} onPress={deleteHandler}>
            <View style={styles.textView}>
                <Text style={styles.titleText}>{props.name}</Text>
                <Text style={styles.dateText}>{props.date}</Text>
            </View>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{props.price}</Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        padding: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "3%"
    },
    textView: {

    },
    priceView: {
        alignItems: "center",
        justifyContent: "center",
        width:"25%",
        height:"100%",
        marginHorizontal:"1%",
        backgroundColor: colors.quaternary,
        borderRadius: 5,
    },
    titleText: {
        color: colors.quaternary,
        fontWeight: 600,
        fontSize: 20,
        marginVertical: "5%"
    },
    dateText: {
        color: colors.tertiary,
        marginVertical: "5%"

    },
    priceText: {
        width: 100,
        padding: "5%",
        color: colors.primary,
        fontWeight: 800,
        fontSize: 18,
        textAlign:"center"
    }
})