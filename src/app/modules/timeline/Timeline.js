import React, {useEffect, useState} from "react";
import TimelinePoDetails from "./core/TimelinePoDetails";
import TimelineActivityLog from "./core/TimelineActivityLog";
import TimelineProductionDetails from "./core/TimelineProductionDetails";
import AllDesignList from "./core/AllDesignList";
import AllProductionList from "./core/AllProductionList";
import {fetchOrderInfo} from "../store/action/Timeline";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import LoaderComponent from "../../commonComponents/Loader";
import AddComment from "./core/AddComment";

const Timeline = () => {
    const [loader, setLoader] = useState(true)
    const [addComment, setAddComment] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();

    const toggleAddComment = () => {
        setAddComment(!addComment)
    }

    const generateParams = () => {
        return `${params.orderId}?page=0&size=15`
    }

    useEffect(() => {
        dispatch(fetchOrderInfo(params.orderId, generateParams())).finally(() => setLoader(false))
    }, [])

    return (
        <>
            {addComment &&
                <AddComment
                    toggleAddComment={toggleAddComment}
                    openModal={addComment}
                    setLoader={setLoader}
                />
            }
            <LoaderComponent loading={loader}>
                <div className="buyer-timeline-container">
                    <div className="timeline-row">
                        <TimelinePoDetails setLoader={setLoader}/>
                        <TimelineActivityLog toggleAddComment={toggleAddComment} setLoader={setLoader}/>
                        <TimelineProductionDetails setLoader={setLoader}/>
                    </div>
                    <div className="modal modal-left fade " id="all-designs" tabIndex={-1} role="dialog"
                         aria-labelledby="right_modal">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {/* Modal CLose button*/}
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <img src="/icons/close.svg"/>
                                    </button>
                                </div>
                                <div className="modal-body custom-scrollbar">
                                    <AllDesignList/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal modal-right fade " id="all-production-details" tabIndex={-1} role="dialog"
                         aria-labelledby="right_modal">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <img src="/icons/close.svg"/>
                                    </button>
                                </div>
                                <div className="modal-body custom-scrollbar">
                                    <AllProductionList setLoader={setLoader}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoaderComponent>
        </>
    )
}

export default Timeline