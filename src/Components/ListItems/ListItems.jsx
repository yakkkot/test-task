import React from 'react';

const ListItems = ({items,search,className,filtererCountries}) => {

    return (
        <ul className={className}>
            {
                filtererCountries(items,search)
                .map(el => <li key={el.countryCode}>{el.countryCode} - {el.name}</li>)
            }
        </ul>
    );
};

export {ListItems};