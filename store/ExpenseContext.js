import { createContext, useState } from "react";
import uuid from 'react-native-uuid'

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children  }) {
    const [expense, setExpense] = useState([]);
    const [addIsActive, setAddIsActive] = useState(false)

    function addExpense(item) {
        setExpense([...expense, { id: uuid.v4(), ...item }]);
        setAddIsActive(false);
        
    }


    function toggleAddModel() {
        setAddIsActive(!addIsActive)
    }

    function removeExpense(deleteID) {
        setExpense(expense.filter(item => item.id !== deleteID))
    }


    return (
        <ExpenseContextModule.Provider value={{ expense: expense, addExpense: addExpense, removeExpense: removeExpense,toggleAddModel:toggleAddModel,addIsActive:addIsActive }}>
            {children }
        </ExpenseContextModule.Provider>
    )

}