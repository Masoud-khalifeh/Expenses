import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import { colors } from '../data/Colors'

export default function SingleExpense(props) {
    return (
        <Pressable style={styles.container}>
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
       alignItems:"center",
       justifyContent:"center"
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
        width:100,
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5%",
        color: colors.primary,
        fontWeight: 800,
        fontSize: 18,
        overflow: "hidden",
    }
})