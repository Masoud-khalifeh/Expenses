import { Text, View, StyleSheet, FlatList } from "react-native";
import SingleExpense from "../components/SingleExpense";
import { colors } from "../data/Colors"
import { useContext, useLayoutEffect, } from "react";
import AddExpense from "../modals/AddExpense";
import { ExpenseContextModule } from "../store/ExpenseContext";
import Icon from "../components/Icon";
import DeleteExpense from "../modals/DeleteExpense";
import UpdateExpense from "../modals/UpdateExpense";

export default function RecentExpenses({ navigation }) {

    const sharedData = useContext(ExpenseContextModule);

    //add (add icon) to the header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Icon onPress={() => sharedData.toggleModal(0)} color={colors.quaternary} size={25} name="add" />
                )
            },
            headerLeft: () => {
                return (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{sharedData.user.name}</Text>
                        <Icon onPress={() => { sharedData.signout(); navigation.navigate("Login") }} color={colors.quaternary} size={30} name="log-out-outline" />
                    </View>
                )
            }
        })
    }, [])

    //redirect to AllExpense when adding in recentExpense is done
    function redirectToAllexpenses() {
        navigation.navigate('AllExpensesTab');
    }

    return (
        <View style={styles.container}>
            {sharedData.modal.add && <AddExpense redirect={redirectToAllexpenses} />}
            {sharedData.modal.delete && <DeleteExpense />}
            {sharedData.modal.update && <UpdateExpense />}
            <View style={styles.priceShow}>
                <Text style={styles.priceShowLeft}>Last 7 Days</Text>
                <Text style={styles.priceShowRight}>${sharedData.sumPrices(false)}</Text>
            </View>
            <View style={styles.expensesShow}>
                {sharedData.shortlistExpense ?
                    <FlatList data={sharedData.shortlistExpense} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                        <SingleExpense name={item.name} date={item.date} price={item.price} delId={item.id} location={item.location} imageURI={item.imageURI} address={item.address} />
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
    },
    header:{
        flexDirection:"row",
        paddingHorizontal:"10%",
        alignItems:"center"
    },
    headerText:{
        color:colors.quaternary,
        maxWidth:"55%",
        fontSize:15
    }
})