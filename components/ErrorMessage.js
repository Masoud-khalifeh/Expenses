import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { colors } from "../data/Colors";

export default function ErrorMessage({ children }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        backgroundColor: "yellow",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"5%",
        marginVertical:"2%"

    },
    text: {
        color: colors.prime,
        padding:"5%",
        fontSize:15,
        fontWeight:700
    }
})