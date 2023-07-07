import { createContext, useState } from "react";
import uuid from 'react-native-uuid'

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children }) {
    const [expense, setExpense] = useState([]);
    const [addIsActive, setAddIsActive] = useState(false);
    const [deleteIsActive, setDeleteIsActive] = useState(false);
    const [deletedID, setDeletedID] = useState("")


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
            expense: expense, addExpense: addExpense, deleteExpense: deleteExpense, toggleAddModel: toggleAddModel, deletedID: deletedID,getDeletedId:getDeletedId,
            addIsActive: addIsActive, deleteIsActive: deleteIsActive, toggleDeleteModel: toggleDeleteModel
        }}>
            {children}
        </ExpenseContextModule.Provider>
    )

}