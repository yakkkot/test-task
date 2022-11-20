import React from 'react';

const Holidays = ({selectedCountryHolidays}) => {

    return (
        <div className="col-span-7">
            <h2 className="font-bold text-2xl text-center mb-4">Holidays</h2>
            <ul>
                {selectedCountryHolidays.map((el,index) => <li key={index}>{el.date} - {el.localName} ({el.name})</li>)}
            </ul>
        </div>
    );
};

export {Holidays};