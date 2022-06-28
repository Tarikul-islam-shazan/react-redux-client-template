import React from 'react'
import { useStoreSelector } from '../../redux_toolkit'
import { useDispatch } from 'react-redux'

import { loginActions } from '../../redux_toolkit/Login'
import { LOGIN_SUCCESS } from '../../redux_toolkit/action.types'

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
                    dispatch({
                        type: loginActions[LOGIN_SUCCESS],
                        payload: 'Hello'
                    })
                }}
            >
                hELLLLO
            </button>
        </div>
    )
}

export default ReduxComp
