import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { colors } from '../data/Colors';
import ButtonExpense from '../components/ButtonExpense';
import { ExpenseContextModule } from '../store/ExpenseContext';
import { useContext, useState, } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { LoginUser } from '../utility/http';
import Spinner from 'react-native-loading-spinner-overlay';




export default function Login({ navigation }) {
    const sharedData = useContext(ExpenseContextModule);
    const [user, setUser] = useState({ email: '', passWord: '' });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);


    function changeHandler(name, value) {
        setError({ email: "", password: "", general: "" })
        setUser({ ...user, [name]: name === "email" ? value.toLowerCase() : value })
    }

    async function submitHandler() {


        let error = {}
        if (user.email && user.passWord && isValidEmail(user.email) && !loading) {
            setLoading(true);
            const loggedUser = await LoginUser(user.email, user.passWord);
            if (loggedUser) {
                sharedData.SignUp(loggedUser);
                sharedData.loadExpenses(loggedUser.id);
                navigation.navigate('AllExpenses');
            } else {
                error = { ...error, general: "Wrong Email or Password!" }
            }
            setUser({ email: '', passWord: '' });
            setLoading(false);
        }
        if (!user.passWord) {
            error = { ...error, password: "Please Fill the Password." }
        }
        if (!user.email) {
            error = { ...error, email: "Please Fill the Email." }
        } else if (!isValidEmail(user.email)) {
            error = { ...error, email: "Email is not correct !" }
        }
        if (!user.email && !user.passWord) {
            error = { ...error, email: "Please Fill the Email.", password: "Please Fill the Password" }
        }
        setError(error);

    }

    //to validate email
    const isValidEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };




    return (
        <View style={styles.container}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
            <View style={styles.error}>
                <ErrorMessage>{error.general}</ErrorMessage>
            </View>
            <View style={styles.inputArea}>
                <TextInput placeholder="Email" keyboardType="email-address" placeholderTextColor={colors.secondary} style={styles.input} name="email" value={user.email} onChangeText={(value) => changeHandler("email", value)} />
                <ErrorMessage>{error.email}</ErrorMessage>
                <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor={colors.secondary} style={styles.input} name="passWord" value={user.passWord} onChangeText={(value) => changeHandler("passWord", value)} />
                <ErrorMessage>{error.password}</ErrorMessage>
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
    inputArea: {
        width: "80%",
        justifyContent: 'center',
        marginTop: "5%",
        borderRadius: 5,
        alignItems: 'center',
    },
    input: {
        backgroundColor: colors.tertiary,
        width: "100%",
        marginTop: "5%",
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
        height: "25%",
        padding: "5%",
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        marginTop: "10%",
    }
})