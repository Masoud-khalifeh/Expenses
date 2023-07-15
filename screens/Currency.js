import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "../data/Colors"
import { useContext, } from "react";
import { currencyContextModule } from "../store/CurrencyContext";
import uuid from 'react-native-uuid';
import SingleCurrency from "../components/SingleCurrency";

//this screen shows the list of currencies
export default function Currency({ }) {

    const sharedData = useContext(currencyContextModule);
    const newArray=Object.keys(sharedData.selectedRates);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Rates Based on USD</Text>
            <Text style={styles.updateText}>Updated Time : {Date()}</Text>
            <FlatList key={uuid.v4()} data={newArray} renderItem={({ item }) => (
                <SingleCurrency currency={sharedData.curencyNames[item]} rate={sharedData.selectedRates[item]} />
            )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        alignItems: "center",
        width:"100%"
    },
    text:{
        height:"10%",
        color:colors.quaternary,
        fontSize:25,
        fontWeight:800,
        marginTop:"10%"
    },
    updateText:{
        color:colors.quaternary
    }

})