import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../data/Colors";

//define a pressable area as a reusable Button
export default function ButtonExpense({ children,primary,onPress }) {

    return (
        <Pressable style={[styles.container,{backgroundColor:primary?colors.secondary:colors.primary}]} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        flex: 1,
        height:50,
        justifyContent:"center",
        borderRadius:5
    },
    text: {
        color: colors.quaternary,
        padding:"5%",
        textAlign:"center",
        fontSize:17,
        fontWeight:600
    }
})