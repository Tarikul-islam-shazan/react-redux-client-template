import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderList} from "../store/action/OrderAction";
import {isPageReachBottom} from "../../services/Util";
import LoaderComponent from "../../commonComponents/Loader";
import ListOfOrder from "./ListOfOrder";

const MyOrderList = () => {
    const [loader, setLoader] = useState(true);
    const orderStore = useSelector((store) => store.orderStore);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("RUNNING");
    const myStateRef = useRef({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        myStateRef.current = {...myStateRef.current, ...orderStore};
        setActiveTab(orderStore.activeTab);
    }, [orderStore]);

    const generateParams = (tabName, page, searchParam) => {
        let params = `?size=12&sort=id,desc&filterBy=${tabName}&page=${page}`;
        if (searchParam) {
            params += `&search=${searchParam}&poNumber=${searchParam}`;
        }
        return params;
    };

    useEffect(() => {
        let params = generateParams(activeTab, 0);
        dispatch(fetchOrderList(params, false, activeTab)).finally(() => setLoader(false));
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (isPageReachBottom()) {
            let {totalElements, currentPage, data} = myStateRef.current.orderResponse;
            console.log("===", myStateRef.current);
            let activeTabName = myStateRef.current.activeTab;
            if (totalElements > 0) {
                if (totalElements !== data.length) {
                    setLoader(true);
                    let params = generateParams(
                        activeTabName,
                        currentPage + 1,
                        myStateRef.current.searchParam
                    );
                    dispatch(fetchOrderList(params, true, activeTabName)).finally(() =>
                        setLoader(false)
                    );
                }
            }
        }
    };

    const changeTab = (value) => {
        setLoader(true);
        let params = generateParams(value, 0, myStateRef.current.searchParam);
        dispatch(fetchOrderList(params, false, value)).finally(() => setLoader(false));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        myStateRef.current = {...orderStore, searchParam: e.target.value};
        changeTab(activeTab);
    };

    return (
        <LoaderComponent loading={loader}>
            <div className="order-list-page-container">
                <div className="page-title">
                    <h2>Order list</h2>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="order-list-tab">
                        <ul>
                            <li
                                className={activeTab === "RUNNING" ? "active" : ""}
                                onClick={() => changeTab("RUNNING")}
                            >
                                <span className="task-name regular-14">
                                    Running
                                    {orderStore.countResponse?.RUNNING && (
                                        <span className="order-count running">
                                            {orderStore.countResponse.RUNNING}
                                        </span>
                                    )}
                                </span>
                            </li>
                            <li
                                className={activeTab === "PENDING" ? "active" : ""}
                                onClick={() => changeTab("PENDING")}
                            >
                                <span className="task-name regular-14">
                                    Pending
                                    {orderStore.countResponse?.PENDING && (
                                        <span className="order-count pending">
                                            {orderStore.countResponse.PENDING}
                                        </span>
                                    )}
                                </span>
                            </li>
                            <li
                                className={activeTab === "COMPLETED" ? "active" : ""}
                                onClick={() => changeTab("COMPLETED")}
                            >
                                <span className="task-name regular-14">
                                    Completed
                                    {orderStore.countResponse?.PENDING && (
                                        <span className="order-count complete">
                                            {orderStore.countResponse.COMPLETED}
                                        </span>
                                    )}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span className="search order-search">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.55"
                                height="16.508"
                                viewBox="0 0 16.55 16.508"
                            >
                                <path
                                    id="Path_23797"
                                    data-name="Path 23797"
                                    d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z"
                                    transform="translate(0.2 0.25)"
                                    fill="#a1a6b2"
                                    stroke="#a1a6b2"
                                    strokeWidth="0.5"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search your order"
                                name="search"
                                value={search}
                                onChange={handleSearch}
                            />
                        </span>
                    </div>
                </div>
                <ListOfOrder orderStore={orderStore} activeTab={activeTab}/>
            </div>
        </LoaderComponent>
    );
};

export default MyOrderList;
