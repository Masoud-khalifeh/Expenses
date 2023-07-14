import { Pressable, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';

//define a reusable component for icons
export default function IconNative({ onPress, name = "star", size = 24, color = "black" }) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Icon name={name} size={size} color={color} />
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