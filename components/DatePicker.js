import {useState} from 'react'
import { Modal, View,StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from '../data/Colors';

export default function DatePicker() {
    const [date, setDate] = useState(new Date())


    return (
        <Modal transparent={true}>
            <View style={styles.container}>
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    open={true}
                    value={date}
                    onConfirm={(date) => {
                        // setItem({ ...item, date: date.toDateSring })
                    }}
                    onCancel={() => {
                        // setOpen(false)
                    }}
                />
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor:colors.primary,
        marginTop:"50%"
    },

})