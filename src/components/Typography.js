import React from 'react'

function H1({ children }) {
    return <h1 className='font-bold text-5xl'>{ children }</h1>
}


function H2({ children }) {
    return <h2 className='font-bold text-4xl'>{ children }</h2>
}


function H3({ children }) {
    return <h3 className='font-bold text-3xl'>{ children }</h3>
}




function B({ children }) {
    return <p className='font-bold'>{ children }</p>
}

function P({ children }) {
    return <p className='text-base'>{ children }</p>
}

export { H1, H2, H3, B, P }
