
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { ExpenseContextModule } from '../store/ExpenseContext';
import { colors } from '../data/Colors';
import ButtonExpense from '../components/ButtonExpense';
import { useContext, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';


export default function Login({ navigation }) {
    const sharedData = useContext(ExpenseContextModule);
    const [user, setUser] = useState({ email: '', passWord: '', repeatPassWord: '', name: '' });
    const [error, setError] = useState([]);

    function changeHandler(name, value) {
        setError([])
        if(name==="email"){
            setUser({ ...user, [name]:value.toLowerCase()})
        }else if (name==="name"){
            setUser({ ...user, [name]:value.charAt(0).toUpperCase() + value.slice(1) })
        }else{
            setUser({ ...user, [name]:value })
        }
    }

    function submitHandler() {
        const error = []
        if (user.email && user.passWord && user.name) {
            if (user.passWord !== user.repeatPassWord) {
                error.push("PassWord does not Match !")
            } else {                
                if(sharedData.SignUp(user)){
                    navigation.navigate("AllExpenses")
                }else{
                    error.push("The Email Already Exists !")
                }
                setUser({ email: '', passWord: '' })                
            }
        } else {
            if (!user.passWord) {
                error.push("Please Fill the PassWord")
            }
            if (!user.name) {
                error.push("Please Fill the Name")
            }
            if (!user.email) {
                error.push("Please Fill the Email")
            }
        }
        setError(error)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.errorMessage,{display:(error.length)? "flex" : "none"}]}>
                <FlatList data={error} renderItem={({ item }) => (
                    <ErrorMessage>{item}</ErrorMessage>
                )} />
            </View>
            <View style={styles.inputArea}>
                <TextInput placeholder="Email" placeholderTextColor={colors.secondary} style={styles.input} name="email" value={user.email} onChangeText={(value) => changeHandler("email", value)} />
                <TextInput placeholder="Name" placeholderTextColor={colors.secondary} style={styles.input} name="name" value={user.name} onChangeText={(value) => changeHandler("name", value)} />
                <TextInput secureTextEntry={true} placeholder="PassWord" placeholderTextColor={colors.secondary} style={styles.input} name="passWord" value={user.passWord} onChangeText={(value) => changeHandler("passWord", value)} />
                <TextInput secureTextEntry={true} placeholder="Repeat PassWord" placeholderTextColor={colors.secondary} style={styles.input} name="repeatPassWord" value={user.repeatPassWord} onChangeText={(value) => changeHandler("repeatPassWord", value)} />
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
    errorMessage: {
        maxHeight: "18%",
        paddingTop: "5%",
        justifyContent: "flex-end"
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
        marginVertical: "3%",
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
        height: "30%",
        padding: "5%",
        justifyContent: "center",
        alignItems: "center"

    }
})


