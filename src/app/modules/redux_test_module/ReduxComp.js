import React from 'react'
import { useStoreSelector } from '../../redux_toolkit'
import { useDispatch } from 'react-redux'

import { loginActions } from '../../redux_toolkit/Login'
import { LOGIN_SUCCESS } from '../../redux_toolkit/action.types'

import { useLoginSelector } from '../../redux_toolkit/Login'

const ReduxComp = () => {
    const store = useStoreSelector()
    const dispatch = useDispatch()
    // console.log(store)
    const loginStore = useLoginSelector()
    // console.log(loginStore)

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
                Hello
            </button>
        </div>
    )
}

export default ReduxComp
