import React, { useEffect, useState } from 'react'
import TimelinePoDetails from './core/TimelinePoDetails'
import TimelineActivityLog from './core/TimelineActivityLog'
import TimelineProductionDetails from './core/TimelineProductionDetails'
import AllDesignList from './core/AllDesignList'
import AllProductionList from './core/AllProductionList'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddComment from './core/AddComment'
import { closeLoader, openLoader } from '../../redux_toolkit/Loader'
import { fetchOrderInfo } from '../../redux_toolkit/Timeline/TimelineThunks'

const Timeline = () => {
    const [addComment, setAddComment] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()

    const setLoader = (value) => {
        if (value === true) {
            dispatch(openLoader())
        } else {
            dispatch(closeLoader())
        }
    }

    const toggleAddComment = () => {
        setAddComment(!addComment)
    }

    const generateParams = () => {
        return `${params.orderId}?page=0&size=15`
    }

    useEffect(() => {
        dispatch(fetchOrderInfo(params.orderId, generateParams())).finally(() =>
            setLoader(false)
        )
    }, [])

    return (
        <>
            <AddComment
                toggleAddComment={toggleAddComment}
                openModal={addComment}
                setLoader={setLoader}
            />

            <div className='buyer-timeline-container'>
                <div className='timeline-row'>
                    <TimelinePoDetails setLoader={setLoader} />
                    <TimelineActivityLog
                        toggleAddComment={toggleAddComment}
                        setLoader={setLoader}
                    />
                    <TimelineProductionDetails setLoader={setLoader} />
                </div>
                <div
                    className='modal modal-left fade lg:hidden'
                    id='all-designs'
                    tabIndex={-1}
                    role='dialog'
                    aria-labelledby='right_modal'
                >
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                >
                                    <img src='/icons/close.svg' />
                                </button>
                            </div>
                            <div className='modal-body custom-scrollbar'>
                                <AllDesignList setLoader={setLoader} />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='modal modal-right fade lg:hidden'
                    id='all-production-details'
                    tabIndex={-1}
                    role='dialog'
                    aria-labelledby='right_modal'
                >
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                >
                                    <img src='/icons/close.svg' />
                                </button>
                            </div>
                            <div className='modal-body custom-scrollbar'>
                                <AllProductionList setLoader={setLoader} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
