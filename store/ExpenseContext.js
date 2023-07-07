import { useEffect } from "react";
import { createContext, useState } from "react";
import uuid from 'react-native-uuid'

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children }) {
    const [expense, setExpense] = useState([]);
    const [addIsActive, setAddIsActive] = useState(false);
    const [deleteIsActive, setDeleteIsActive] = useState(false);
    const [deletedID, setDeletedID] = useState("");
    const [sum,setSum]=useState(0);

    useEffect(()=>{
        sumPrices(false)
    },[expense])

    function sumPrices(status){
        let newSum=0;
        expense.map(item=>{
           newSum= newSum + parseInt(item.price)  ;
           
        });
         setSum(newSum);
    }


    function addExpense(item) {
        setExpense([...expense, { id: uuid.v4(), ...item }]);
        setAddIsActive(false);

    }

    function getDeletedId(delID) {
        setDeletedID(delID)
    }


    function toggleAddModel() {
        setAddIsActive(!addIsActive)
    }

    function toggleDeleteModel() {
        setDeleteIsActive(!deleteIsActive)
    }
    function deleteExpense() {
        setExpense(expense.filter(item => item.id !== deletedID));
        toggleDeleteModel()
    }


    return (
        <ExpenseContextModule.Provider value={{
            expense: expense, addExpense: addExpense, deleteExpense: deleteExpense, toggleAddModel: toggleAddModel, deletedID: deletedID,getDeletedId:getDeletedId,sum:sum,
            addIsActive: addIsActive, deleteIsActive: deleteIsActive, toggleDeleteModel: toggleDeleteModel
        }}>
            {children}
        </ExpenseContextModule.Provider>
    )

}