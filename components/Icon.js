import { Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

//define a reusable component for icons
export default function IconNative({ onPress, name = "star", size = 24, color = "black" }) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Ionicons name={name} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        marginHorizontal: "5%",
    },
})