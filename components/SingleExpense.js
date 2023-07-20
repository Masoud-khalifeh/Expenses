import { Text, StyleSheet, Pressable, View, Image } from "react-native";
import { colors } from '../data/Colors'
import { useContext } from "react";
import { ExpenseContextModule } from "../store/ExpenseContext";
import { getMapPreview } from "../utility/Location";


//define a reusable component to show each expense
export default function SingleExpense(props) {
    const sharedData = useContext(ExpenseContextModule);


    function deleteHandler() {
        sharedData.getDeletedId(props.delId); //save the id of singleExpenseComponent for the update and delete
        sharedData.toggleModal(1); //by pressing each singleExpenseComponent, another modal will be open to delete or update
    }

    return (
        <Pressable style={styles.container} onPress={deleteHandler}>
            <View style={styles.top}>
                <View style={styles.textView}>
                    <Text style={styles.titleText}>{props.name}</Text>
                    <Text style={styles.dateText}>{props.date.toDateString()}</Text>
                    <Text style={styles.dateText}>{props.address}</Text>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.priceText}>{props.price}</Text>
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={styles.preview}>
                    {props.imageURI ? <Image source={{ uri: props.imageURI }} style={styles.image} /> : <Text style={styles.text}>Photo Not Available!</Text>}
                </View>
                <View style={styles.preview}>
                    {props.location ? <Image source={{ uri: getMapPreview(props.location.lat, props.location.lon) }} style={styles.image} /> : <Text style={styles.text}>Loction Not Available!</Text>}
                </View>
            </View>


        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 250,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        padding: "3%",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "3%"
    },
    top: {
        flexDirection: "row",
        height: "35%",
        width: "100%",
        justifyContent: "space-between"

    },
    textView: {
        justifyContent: "center",
        paddingVertical: "2%"
    },
    priceView: {
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
        height: "100%",
        marginHorizontal: "1%",
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
        marginVertical: "1%",
        fontSize: 12
    },
    priceText: {
        width: 100,
        padding: "5%",
        color: colors.primary,
        fontWeight: 800,
        fontSize: 18,
        textAlign: "center"
    },
    bottom: {
        flexDirection: "row",
        marginVertical: "3%",
        height: "59%",
        width: "100%",
        justifyContent: "space-between"

    },
    preview: {
        backgroundColor: colors.primary,
        width: "48%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        overflow:"hidden"

    },
    image:{
        height: "100%",
        width: "100%"
    },
    text:{
        color:colors.tertiary,
        fontSize:15
    }
    
})