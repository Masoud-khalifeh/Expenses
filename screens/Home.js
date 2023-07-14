import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../data/Colors';
import ButtonExpense from '../components/BottunExpense';

export default function Home({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                    <Text style={styles.topText}>
                        Welcomme !
                    </Text>
                    <Text style={styles.bottomText}>
                        You must login First !!
                    </Text>
            </View>
            <View style={styles.buttonView}>
                <ButtonExpense primary={false} onPress={()=> navigation.navigate('SignUp')}>Sign UP</ButtonExpense>
                <ButtonExpense primary={true} onPress={()=> navigation.navigate('Login')}>Login</ButtonExpense>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        backgroundColor: colors.tertiary,
        width: "80%",
        height: "40%",
        padding:"10%",
        justifyContent: 'space-around',
        borderRadius: '5%',
        alignItems: 'center'
    },

    topText: {
        fontSize: 25,
        fontWeight: 800

    },
    bottomText: {
        fontSize: 20,
        fontWeight: 600
    },
    buttonView: {
        flexDirection: 'row',
        margin: "10%",
        width: "70%",
        marginTop: "10%",
        marginBottom:"60%"
    }
})