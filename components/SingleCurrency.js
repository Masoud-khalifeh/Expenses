import {View, Text, StyleSheet} from 'react-native'
import { colors } from '../data/Colors'

//a reusable component to show each currency
export default function SingleCurrency(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.currancy}>{props.currency}</Text>
            <Text style={styles.rate}>{props.rate}</Text>
        </View>
    )
}


const styles= StyleSheet.create({
container:{
backgroundColor:colors.tertiary,
borderRadius:5,
margin:"5%",
flexDirection:"row",
minHeight:"10%",
justifyContent:"space-between",
alignItems:"center",
paddingHorizontal:"5%",
flex:1
},
currancy:{
fontSize:20,
fontWeight:800,
color:colors.primary,

},
rate:{
fontSize:20,
color:colors.secondary
}
})