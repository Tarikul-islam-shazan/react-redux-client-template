import React from 'react'
import { useStoreSelector } from '../../redux_toolkit'
import { useDispatch } from 'react-redux'

const ReduxComp = () => {
    const store = useStoreSelector()
    const dispatch = useDispatch()
    console.log(store)

    return (
        <div>
            <h1>Redux test Component</h1>
            {/* <div>{store}</div> */}
            <button
                onClick={() => {
                    dispatch({ type: 'LOGIN_SUCCESS', payload: 'test' })
                }}
            >
                hELLLLO
            </button>
        </div>
    )
}

export default ReduxComp
