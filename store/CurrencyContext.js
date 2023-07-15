import {createContext, useState} from 'react';

export const currencyContextModule= createContext()

export default function CurrencyContext({children}){
    const [test,setTest]=useState("")


    return(
        <currencyContextModule.Provider value={{test:test}}>
            {children}
        </currencyContextModule.Provider>
    )
}