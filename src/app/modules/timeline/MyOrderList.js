import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchOrderList} from "../store/action/OrderAction";
import {isPageReachBottom} from "../../services/Util";
import LoaderComponent from "../../commonComponents/Loader";
import ListOfOrder from "./ListOfOrder";

const MyOrderList = () => {
    const [loader, setLoader] = useState(true)
    const orderStore = useSelector((store) => store.orderStore)
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("RUNNING")
    const myStateRef = useRef({});

    useEffect(() => {
        myStateRef.current = orderStore;
        setActiveTab(orderStore.activeTab)
    }, [orderStore]);

    const generateParams = (tabName, page) => {
        return `?size=12&sort=id,desc&filterBy=${tabName}&page=${page}`
    }

    useEffect(() => {
        let params = generateParams(activeTab, 0);
        dispatch(fetchOrderList(params, false, activeTab)).finally(() => setLoader(false))
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handleScroll = () => {
        if (isPageReachBottom()) {
            let {totalElements, currentPage, data} = myStateRef.current.orderResponse;
            let activeTabName = myStateRef.current.activeTab
            if (totalElements > 0) {
                if (totalElements !== data.length) {
                    setLoader(true);
                    let params = generateParams(activeTabName, currentPage + 1);
                    dispatch(fetchOrderList(params, true, activeTabName)).finally(() => setLoader(false))
                }
            }
        }
    }

    const changeTab = (value) => {
        setLoader(true)
        let params = generateParams(value, 0);
        dispatch(fetchOrderList(params, false, value)).finally(() => setLoader(false))
    }

    return (<LoaderComponent loading={loader}>
        <div className="order-list-page-container">
            <div className="page-title">
                <h2>Order list</h2>
            </div>
            <div className="order-list-tab">
                <ul>
                    <li
                        className={activeTab === "RUNNING" ? "active" : ""}
                        onClick={() => changeTab("RUNNING")}
                    >
                        <span className="task-name regular-14">Running
                            {orderStore.countResponse?.RUNNING && <span
                                className="order-count running"
                            >
                            {orderStore.countResponse.RUNNING}
                            </span>}
                        </span>
                    </li>
                    <li
                        className={activeTab === "PENDING" ? "active" : ""}
                        onClick={() => changeTab("PENDING")}
                    >
                        <span className="task-name regular-14">Pending
                            {orderStore.countResponse?.PENDING && <span
                                className="order-count pending"
                            >
                                {orderStore.countResponse.PENDING}
                            </span>}
                        </span>
                    </li>
                    <li
                        className={activeTab === "COMPLETED" ? "active" : ""}
                        onClick={() => changeTab("COMPLETED")}
                    >
                        <span className="task-name regular-14">Completed
                            {orderStore.countResponse?.PENDING && <span
                                className="order-count complete"
                            >
                                {orderStore.countResponse.COMPLETED}
                            </span>}
                        </span>
                    </li>
                </ul>
            </div>
            <ListOfOrder orderStore={orderStore} activeTab={activeTab}/>
        </div>
    </LoaderComponent>)
}

export default MyOrderList