import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../data/Colors";
import Icon from './Icon'


//define a pressable area as a reusable Button
export default function ButtonExpense({ children, primary, onPress, icon, textSize = 17 }) {

    //set Icon in the button if there is a prop of {icon}
    //this props is an object containing name, size and color
    const iconShow = () => {
        return (
            <View style={styles.icon} >
                <Icon name={icon.name} size={icon.size} color={icon.color} />
            </View>
        )
    }

    return (
        <Pressable style={[styles.container, { backgroundColor: primary ? colors.secondary : colors.primary }]} onPress={onPress}>
            {icon && iconShow()}
            <Text style={[styles.text, { fontSize: textSize }]}>{children}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        height: 50,
        justifyContent: "center",
        borderRadius: 5,
        alignItems: "center"
    },
    text: {
        color: colors.quaternary,
        textAlign: "center",
        fontSize: 17,
        fontWeight: 600,
    },
    icon: {
        width: "100%",
        height: "40%",
        alignItems: "center",
        justifyContent: "center"
    }
})