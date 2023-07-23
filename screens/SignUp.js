
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { ExpenseContextModule } from '../store/ExpenseContext';
import { colors } from '../data/Colors';
import ButtonExpense from '../components/ButtonExpense';
import { useContext, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import postUser, { checkEmail, getID } from '../utility/http';
import Spinner from 'react-native-loading-spinner-overlay';



export default function Login({ navigation }) {
    const sharedData = useContext(ExpenseContextModule);
    const [user, setUser] = useState({ email: '', passWord: '', repeatPassWord: '', name: '' });
    const [error, setError] = useState({ email: "", name: "", password: "", repeatPassword: "" });
    const [loading, setLoading] = useState(false);




    function changeHandler(name, value) {
        setError({ email: "", name: "", password: "", repeatPassword: "" });
        if (name === "email") {
            setUser({ ...user, [name]: value.toLowerCase(), passWord: "", repeatPassWord: "" })
        } else if (name === "name") {
            setUser({ ...user, [name]: value.charAt(0).toUpperCase() + value.slice(1), passWord: "", repeatPassWord: "" })
        } else {
            setUser({ ...user, [name]: value })
        }
    }

    async function submitHandler() {


        let error = {}

        if (!user.email) {
            error = { ...error, email: "Please Fill the Email." }
        } else if (!isValidEmail(user.email)) {
            error = { ...error, email: "Email is not correct !" }
        }
        if (!user.name) {
            error = { ...error, name: "Please Fill the Name." }
        }
        if (!user.passWord) {
            error = { ...error, password: "Please Fill the PassWord." }
        } else if (!isValidPassword(user.passWord)) {
            error = { ...error, password: "Password must be at least 8 character, combination of small letters, capital letters, and numbers." }
        } else if (user.passWord !== user.repeatPassWord) {
            error = { ...error, repeatPassword: "PassWord does not Match !" }
        }



        if (user.email && user.passWord && user.name && isValidEmail(user.email) && user.passWord === user.repeatPassWord && isValidPassword(user.passWord) && !loading) {
            setLoading(true);
            const status = await checkEmail(user.email);
            if (status === 1) {
                error = { ...error, email: "This email has already exists." }
            } else if (status === 0) {
                if (await postUser(user.email, user.name, user.passWord) === 1) {
                    alert("Welcome! You registered successfully.");
                    setUser({ email: '', passWord: '', repeatPassWord: '', name: '' });
                    sharedData.SignUp({ id: await getID(user.email), ...user });
                    navigation.navigate('AllExpenses');
                }
            } else {
                alert("Error in recording information")
            }
            setLoading(false);
        }
        setError(error);
    };


    //to validate email
    const isValidEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    //to validate password
    const isValidPassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        // const hasSpecialChar = /[@#$%^&+=]/.test(password);

        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber
            // hasSpecialChar
        );
    };


    return (
        <View style={styles.container}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
            <View style={styles.inputArea}>
                <TextInput placeholder="Email" keyboardType="email-address" placeholderTextColor={colors.secondary} style={styles.input} name="email" value={user.email} onChangeText={(value) => changeHandler("email", value)} />
                <ErrorMessage>{error.email}</ErrorMessage>
                <TextInput placeholder="Name" placeholderTextColor={colors.secondary} style={styles.input} name="name" value={user.name} onChangeText={(value) => changeHandler("name", value)} />
                <ErrorMessage>{error.name}</ErrorMessage>
                <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor={colors.secondary} style={styles.input} name="passWord" value={user.passWord} onChangeText={(value) => changeHandler("passWord", value)} />
                <ErrorMessage>{error.password}</ErrorMessage>
                <TextInput secureTextEntry={true} placeholder="Repeat Password" placeholderTextColor={colors.secondary} style={styles.input} name="repeatPassWord" value={user.repeatPassWord} onChangeText={(value) => changeHandler("repeatPassWord", value)} />
                <ErrorMessage>{error.repeatPassword}</ErrorMessage>
            </View>
            <View style={styles.buttonView}>
                <ButtonExpense primary={true} onPress={submitHandler}>Sign Up</ButtonExpense>
                <ButtonExpense primary={false} onPress={() => navigation.navigate('Login')}><Text style={styles.topText}> Already Have an Account? <Text style={styles.bottomText}>Login</Text> </Text></ButtonExpense>
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
        alignItems: 'center'
    },
    inputArea: {
        marginTop: "3%",
        width: "80%",
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
    },
    input: {
        backgroundColor: colors.tertiary,
        width: "100%",
        marginTop: "3%",
        fontSize: 20,
        padding: "5%",
        borderRadius: 5
    },

    topText: {
        fontSize: 15,
        fontWeight: 800

    },
    bottomText: {
        fontSize: 17,
        fontWeight: 800
    },
    buttonView: {
        width: "70%",
        height: "20%",
        paddingHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center"

    }
})


