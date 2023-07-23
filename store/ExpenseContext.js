import { useEffect } from "react";
import { createContext, useState } from "react";
import uuid from 'react-native-uuid';
import { allExpenses } from "../utility/http";

export const ExpenseContextModule = createContext();

export default function ExpenseContext({ children }) {
    const [expense, setExpense] = useState([]);
    const [deletedID, setDeletedID] = useState("");
    const [updatedExpense, setUpdatedExpense] = useState("");
    const [modal, setModal] = useState({ add: false, delete: false, update: false, showDate: false, map: false });
    const [showDate, setShowDate] = useState(true);
    const [shortlistExpense, setshortListExpense] = useState([]);
    const [user, setUser] = useState([]);
    const [locationLoading, setLocationLoading] = useState(false);




    // at first make an array of last 7 days in shortListExpense
    useEffect(() => {
        sumPrices(false);
        const currentDate = new Date();
        let newArray = [];
        expense.map(item => {
            if (item.date > currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) {
                newArray.push(item)
            }
        });
        setshortListExpense(newArray);
    }, [expense])

    //argument (true) gives the sum of all prices and (false) gives the sum of just last 7 days
    function sumPrices(status) {
        let newSum = 0;
        if (status === true) {
            expense.map(item => {
                newSum = newSum + parseInt(item.price);
            });
        } else {
            shortlistExpense.map(item => {
                newSum = newSum + parseInt(item.price);
            });
        }
        return (newSum);
    }

    //keep the expense we want to update in updatedExpense 
    function getUpdatedExpense() {
        setUpdatedExpense(...expense.filter(item => item.id === deletedID))
    }



    //
    async function loadExpenses(id) {
        const allArray=await allExpenses(id);
        const formated=[];
        allArray.map(item=>{
            formated.push({...item,date:new Date(JSON.parse(item.date)),address:item.address==="null"?"":item.address,imageURI:item.imageURI==="null"? "":item.imageURI,location:item.location==="null"? "":item.location  }) 
        })
        setExpense(formated)
    };

    //add the expense if (add) argument is true, otherwise update the expenses where id==deletedId
    function addExpense(item, add) {
        if (!add) {
            setExpense([...expense.filter(x => x.id !== deletedID), { id: deletedID, ...item }]);
            toggleModal(2);
        } else {
            setExpense([...expense, item]);
            toggleModal(0);
        }
    }

    
    //keep the deletedID
    function getDeletedId(delID) {
        setDeletedID(delID)
    }

    //open and close the Modals
    function toggleModal(status) {//o:add - 1:delete - 2:update - 3:combine 1 and 2 - 4:showDate - 5:map

        if (status === 0) {
            setModal({ ...modal, add: !modal.add });
        } else if (status === 1) {
            setModal({ ...modal, delete: !modal.delete });
        } else if (status === 2) {
            setModal({ ...modal, update: !modal.update });
        } else if (status === 3) {
            setModal({ ...modal, delete: !modal.delete, update: !modal.update });
        } else if (status === 4) {
            setModal({ ...modal, showDate: !modal.showDate });
        } else {
            setModal({ ...modal, map: !modal.map });

        }
    }

    function toogleLocation(status) {
        setLocationLoading(status)
    }

    //delete an expense
    function deleteExpense() {
        setExpense(expense.filter(item => item.id !== deletedID));
        toggleModal(1); //close the Delete Modal
    }


    //
    function SignUp(user) {
        setUser(user)
    }

    //
    function signout() {
        setExpense([]);
        setUser("")
    }

    return (
        <ExpenseContextModule.Provider value={{
            expense: expense, addExpense: addExpense, deleteExpense: deleteExpense, toggleModal: toggleModal, deletedID: deletedID, getDeletedId: getDeletedId,
            modal: modal, getUpdatedExpense: getUpdatedExpense, updatedExpense: updatedExpense, showDate: showDate, sumPrices: sumPrices,
            shortlistExpense: shortlistExpense, user: user, SignUp: SignUp, signout: signout, locationLoading: locationLoading, loadExpenses: loadExpenses,
            toogleLocation: toogleLocation,
        }}>
            {children}
        </ExpenseContextModule.Provider>
    )
}