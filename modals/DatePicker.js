import { useState, useContext } from 'react';
import { Modal, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from '../data/Colors';
import ButtonExpense from "../components/ButtonExpense";
import { ExpenseContextModule } from '../store/ExpenseContext';


//define a reusable component for getting the Date from user
export default function DatePicker(props) {
  const [date, setDate] = useState(new Date());
  const sharedData = useContext(ExpenseContextModule);
  const currentDate=new Date()

  function submitHandler() {
    sharedData.toggleModal(4); //closes the DatePicker Modal
    props.updateDate(date)
  }

  return (
    <Modal transparent={true} animationType='slide'>
      <View style={styles.container}>
        <DateTimePicker
          mode="date"
          // minimumDate={new Date(currentDate.getTime()- 92*24*60*60*1000)} //by activating this part we can limit the minimum of selected date
          maximumDate={currentDate}
          textColor={colors.quaternary}
          display="spinner"
          open={true}
          value={date}
          onChange={(event, selectedDate)=>{
            setDate(selectedDate)
          }}
          onCancel={() => {
            sharedData.toggleModal(4);
          }}
        />
        <View style={styles.buttonArea}>
          <ButtonExpense primary={false} onPress={() => sharedData.toggleModal(4)}>Cancel</ButtonExpense>
          <ButtonExpense primary={true} onPress={submitHandler}>Confirm</ButtonExpense>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "50%",
    marginTop: "15%",
    alignItems: "center"
  },
  buttonArea: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "center"
  },
});
