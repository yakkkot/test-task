import React from 'react';


const Button = ({click,children}) => {

    return (
        <button className="py-2 px-4 border border-blue-700 rounded-xl bg-blue-400 ml-4" onClick={click}>
            {children}
        </button>
    );
};

export {Button};