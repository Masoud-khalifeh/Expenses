import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { colors } from '../data/Colors';
import ButtonExpense from '../components/BottunExpense';
import { ExpenseContextModule } from '../store/ExpenseContext';
import { useContext, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';



export default function Login({ navigation }) {
    const sharedData = useContext(ExpenseContextModule);
    const [user, setUser] = useState({ email: '', passWord: '' });
    const [error, setError] = useState([])

    function changeHandler(name, value) {
        setError([])
        setUser({ ...user, [name]:name==="email"? value.toLowerCase() :value })
    }

    function submitHandler() {
        const error = []
        if (user.email && user.passWord) {
            setUser({ email: '', passWord: '' })
            if( sharedData.login(user)){
                navigation.navigate("AllExpenses")
            }else{
                error.push("The Wrong Email or PassWord  !")
            }
           
        } else if (user.passWord) {
            error.push("Please Fill the User Name")
        } else if (user.email) {
            error.push("Please Fill the PassWord")
        } else {
            error.push(...["Please Fill the User Name", "Please Fill the PassWord"])
        }
        setError(error)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.errorMessage,{display:(error.length)? "flex" : "none"}]}>
                <FlatList data={error}  renderItem={({ item }) => (
                    <ErrorMessage>{item}</ErrorMessage>
                )} />
            </View>

            <View style={styles.inputArea}>
                <TextInput placeholder="Email" placeholderTextColor={colors.secondary} style={styles.input} name="email" value={user.email} onChangeText={(value) => changeHandler("email", value)} />
                <TextInput secureTextEntry={true} placeholder="PassWord" placeholderTextColor={colors.secondary} style={styles.input} name="passWord" value={user.passWord} onChangeText={(value) => changeHandler("passWord", value)} />
            </View>
            <View style={styles.buttonView}>
                <ButtonExpense primary={true} onPress={submitHandler}>Login</ButtonExpense>
                <ButtonExpense primary={false} onPress={() => navigation.navigate('SignUp')}>new? Create an <Text style={styles.bottomText}>Account</Text> </ButtonExpense>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    errorMessage: {
        maxHeight: "15%",
        paddingTop: "5%",
        justifyContent: "flex-end"
    },
    inputArea: {
        width: "80%",
        justifyContent: 'center',
        marginTop:"10%",
        borderRadius: 5,
        alignItems: 'center',
    },
    input: {
        backgroundColor: colors.tertiary,
        width: "100%",
        marginVertical: "5%",
        fontSize: 20,
        padding: "5%",
        borderRadius: 5
    },

    topText: {
        fontSize: 25,
        fontWeight: 800

    },
    bottomText: {
        fontSize: 17,
        fontWeight: 800
    },
    buttonView: {
        width: "70%",
        height: "30%",
        padding: "5%",
        justifyContent: "center",
        alignItems: "center"

    }
})