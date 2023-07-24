import { StyleSheet,  View, Text } from "react-native";
import { colors } from "../data/Colors";

export default function ErrorMessage({ children }) {

    //define a reusable error component to show error messages
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        justifyContent:"flex-start",
        marginTop:0,
        alignItems:"flex-start",
        borderRadius:"5%",
    },
    text: {
        color: colors.prime,
        padding:"2%",
        fontSize:15,
        fontWeight:700,
        textAlign:"center",
        color:"yellow"
    }
})