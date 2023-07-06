import { Text } from "react-native";
import { View } from "react-native";
import SingleExpense from "../components/SingleExpense";
import { StyleSheet } from "react-native";
import { colors } from "../data/Colors"
import { useContext, useLayoutEffect } from "react";
import AddExpense from "../modals/AddExpense";
import { ExpenseContextModule } from "../store/ExpenseContext";
import Icon from "../components/Icon";
import { FlatList } from "react-native";

export default function AllExpenses({ navigation }) {

    const sharedData = useContext(ExpenseContextModule);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Icon onPress={sharedData.toggleAddModel} color={colors.quaternary} size={30} name="add" />
                )
            }
        })
    }, [])







    return (
        <View style={styles.container}>
            {sharedData.addIsActive && <AddExpense />}
            <View style={styles.priceShow}>
                <Text style={styles.priceShowLeft}>Last 7 days</Text>
                <Text style={styles.priceShowRight}>&67.6</Text>
            </View>
            <View style={styles.expensesShow}>
                {sharedData.expense.length ?
                    <FlatList data={sharedData.expense} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                        <SingleExpense name={item.name} date={item.date} price={item.price} />

                    )} />
                    : null
                }


            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        alignItems: "center"
    },
    priceShow: {
        backgroundColor: colors.quaternary,
        marginTop: "5%",
        width: "90%",
        paddingVertical: "4%",
        borderRadius: 5,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "3%"
    },
    priceShowLeft: {
        color: colors.primary,
        fontWeight: 600

    },
    priceShowRight: {
        color: colors.primary,
        fontWeight: 800,
        fontSize: 18


    },
    expensesShow: {
        width: "90%",
        height: "90%"
    }
})