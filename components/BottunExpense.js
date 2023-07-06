import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../data/Colors";

export default function ButtonExpense({ children,primary,onPress }) {

    return (
        <Pressable style={[styles.container,{backgroundColor:primary?colors.secondary:colors.primary}]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:50,
        justifyContent:"center",
        borderRadius:5
    },
    text: {
        color: colors.quaternary,
        padding:"5%",
        textAlign:"center",
        fontSize:15,
        fontWeight:500
    }
})