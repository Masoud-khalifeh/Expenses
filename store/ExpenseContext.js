import { useEffect } from "react";
import { createContext, useState } from "react";
import uuid from 'react-native-uuid'

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children }) {
    const [expense, setExpense] = useState([]);
    const [deletedID, setDeletedID] = useState("");
    const [updatedExpense, setUpdatedExpense] = useState("");
    const [sum, setSum] = useState(0);
    const [modal, setModal] = useState({ add: false, delete: false, update: false })

    useEffect(() => {
        sumPrices(false)
    }, [expense])

    function sumPrices(status) {
        let newSum = 0;
        expense.map(item => {
            newSum = newSum + parseInt(item.price);

        });
        setSum(newSum);
    }

    function getUpdatedExpense() {
        setUpdatedExpense(...expense.filter(item => item.id === deletedID))
    }


    function addExpense(item, add) {
        if (!add) {
            setExpense([...expense.filter(x => x.id !== deletedID), { id: deletedID, ...item }]);
            toggleModal(2);
        } else {
            setExpense([...expense, { id: uuid.v4(), ...item }]);
            toggleModal(0);
        }


    }

    function getDeletedId(delID) {
        setDeletedID(delID)
    }


    function toggleModal(status,) {//o:add - 1:delete - 2:update - 3:combine 1 and 2

        if (status === 0) {
            setModal({ ...modal, add: !modal.add });
        } else if (status === 1) {
            setModal({ ...modal, delete: !modal.delete });
        } else if (status === 2) {
            setModal({ ...modal, update: !modal.update });
        } else {
            setModal({ ...modal, delete: !modal.delete, update: !modal.update });
        }



    }



    function deleteExpense() {
        setExpense(expense.filter(item => item.id !== deletedID));
        toggleModal(1)
    }


    return (
        <ExpenseContextModule.Provider value={{
            expense: expense, addExpense: addExpense, deleteExpense: deleteExpense, toggleModal: toggleModal, deletedID: deletedID, getDeletedId: getDeletedId,
            sum: sum, modal: modal, getUpdatedExpense: getUpdatedExpense, updatedExpense: updatedExpense,
        }}>
            {children}
        </ExpenseContextModule.Provider>
    )

}