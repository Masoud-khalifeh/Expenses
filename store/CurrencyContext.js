import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const currencyContextModule = createContext()

export default function CurrencyContext({ children }) {
    const [curencyNames, setCurrencyNames] = useState({ //list of wanted currencies
        "EUR": "Euro", "GBP": "British Pound Sterling", "IRR": "Iranian Rial", "RUB": "Russian Ruble", 
        "QAR": "Qatari Rial", "CNY": "Chinese Yuan", "AUD": "Australian Dollar", "CAD": "Canadian Dollar"
    });
    const [rates, setRates] = useState({});
    const [selectedRates, setSelectedRates] = useState();
    const API_GetRate = "https://openexchangerates.org/api/latest.json?app_id=5eaf6a4b7cbf4476ae9b9721064e9df2";

    //this function fetch the rates from API
    const fetchData = async () => await axios.get(API_GetRate).then((response) => {
        setRates(response.data.rates)
    });

    //fetch the data from ApI at first
    useEffect(() => {
        fetchData()
    }, []);

    //after 10 minutes, fetch the data again from API
    setInterval(()=>{
        fetchData()
    },600000)

    //after each change in rates, it chooses the selected currencies
    useEffect(() => {
        const ratesByCurrency = {};

        for (const currencyCode in curencyNames) {
            if (rates.hasOwnProperty(currencyCode)) {
                ratesByCurrency[currencyCode] = rates[currencyCode];
            }
        };
        setSelectedRates(ratesByCurrency)
    }, [rates])

    return (
        <currencyContextModule.Provider value={{ curencyNames: curencyNames, selectedRates:selectedRates }}>
            {children}
        </currencyContextModule.Provider>
    )
}