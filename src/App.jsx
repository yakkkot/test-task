import React, {useEffect, useState} from 'react';

import {apiServices} from "./services";
import {ListItems,Button,Holidays} from "./Components";

const App = () => {

    const [countries, setCountries] = useState([]);
    const [sortAZ, setSortAZ] = useState(false);
    const [search, setSearch] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [selectedCountryHolidays, setSelectedCountryHolidays] = useState([]);

    const sortCountry = (e) => {
        e.preventDefault()
        const sortArr = [...countries].sort((a, b) => {
            let res;
            if (sortAZ) {
                res = b.name.localeCompare(a.name);
            } else {
                res = a.name.localeCompare(b.name);
            }
            return res;
        })
        setCountries(sortArr)
        setSortAZ(!sortAZ)
    };

    const inputFocus = () => setIsShow(true);

    const reset = (e) => {
        e.preventDefault();
        setSelectedCountryHolidays([]);
        setSearch('')
    };
    const filtererCountries = (arr, search) => arr.filter(country => search === '' ? country : country.name.toLowerCase().startsWith(search.toLowerCase()));
    const onCountyClick = async (e) => {
        try {
            setSearch(e.target.textContent);
            setIsShow(false);
            const code = countries.find(country => country.name.toLowerCase() === e.target.textContent.toLowerCase());
            const {data} = await apiServices.getPublicHolidays(code.countryCode);
            setSelectedCountryHolidays(data);
        } catch (e) {
            console.error(`Axios error: ${e.message}`);
        }
    };

    useEffect(() => {
        const getAllCountries = async () => {
            try {
                const {data} = await apiServices.getAvailableCountries()
                await setCountries(data.sort((a, b) => b.name.localeCompare(a.name)))
            } catch (e) {
                console.error(`Axios error: ${e.message}`)
            }
        };
        getAllCountries()
    }, []);
    return (

        <>
            <div className="flex items-center justify-center p-4 flex-col space-y-8 mb-4 ">
                <h1 className='text-4xl font-bold'>React Test</h1>
                <form className="search-field relative">
                    <input className="border-2 border-blue-700 px-2 py-1 w-[300px]"
                           value={search}
                           id="search" type="text" placeholder={'Search country'}
                           onChange={(e) => setSearch(e.target.value)}
                           onFocus={inputFocus}/>
                    <ul
                        className="absolute left-0 top-[36px] bg-blue-200 rounded-b-l w-[300px] overflow-auto max-h-[200px] h-auto">
                        {(search && isShow) && filtererCountries(countries, search)
                            .map(el => <li className="cursor-pointer hover:bg-gray-400 duration-300 p-2"
                                           key={el.countryCode}
                                           onClick={onCountyClick}>{el.name}</li>)}
                    </ul>
                    <Button click={sortCountry}>{sortAZ ? 'Sort by A-Z' : 'Sort by Z-A'}</Button>
                    <Button click={reset}>Reset</Button>
                </form>
            </div>
            <div className="grid grid-cols-10 p-4">
                <ListItems className="col-span-3 font-bold space-y-1" items={countries} search={search}
                           filtererCountries={filtererCountries}/>

                {selectedCountryHolidays.length !== 0 &&
                    <Holidays selectedCountryHolidays={selectedCountryHolidays}/>
                }

            </div>
        </>
    );
};

export default App;
