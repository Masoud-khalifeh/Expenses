import { useEffect } from "react";
import { createContext, useState } from "react";
import uuid from 'react-native-uuid'

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children }) {
    const [expense, setExpense] = useState([]);
    const [deletedID, setDeletedID] = useState("");
    const [updatedExpense, setUpdatedExpense] = useState("");
    const [modal, setModal] = useState({ add: false, delete: false, update: false,showDate:false });
    const [showDate,setShowDate]=useState(true)

    useEffect(() => {
        sumPrices(false)
    }, [expense])

    function sumPrices(status) {
        let newSum = 0;
        if(status===true){
            expense.map(item => {
                newSum = newSum + parseInt(item.price);
    
            });
        }else{

        }
        
       
        return (newSum);
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


    function toggleModal(status,) {//o:add - 1:delete - 2:update - 3:combine 1 and 2 - 4:showDate

        if (status === 0) {
            setModal({ ...modal, add: !modal.add });
        } else if (status === 1) {
            setModal({ ...modal, delete: !modal.delete });
        } else if (status === 2) {
            setModal({ ...modal, update: !modal.update });
        } else if (status === 3) {
            setModal({ ...modal, delete: !modal.delete, update: !modal.update });
        }else {
            setModal({ ...modal, showDate: !modal.showDate });
        }



    }



    function deleteExpense() {
        setExpense(expense.filter(item => item.id !== deletedID));
        toggleModal(1)
    }


    return (
        <ExpenseContextModule.Provider value={{
            expense: expense, addExpense: addExpense, deleteExpense: deleteExpense, toggleModal: toggleModal, deletedID: deletedID, getDeletedId: getDeletedId,
             modal: modal, getUpdatedExpense: getUpdatedExpense, updatedExpense: updatedExpense,showDate:showDate,sumPrices:sumPrices
        }}>
            {children}
        </ExpenseContextModule.Provider>
    )

}