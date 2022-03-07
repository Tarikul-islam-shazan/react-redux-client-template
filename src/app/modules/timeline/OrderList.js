import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchOrderList} from "../store/action/OrderAction";
import {isPageReachBottom} from "../../services/Util";
import LoaderComponent from "../../commonComponents/Loader";

const OrderList = () => {
    const [loader, setLoader] = useState(true)
    const orderStore = useSelector((store) => store.orderStore)
    const dispatch = useDispatch();

    const generateParams = (page) => {
        return `?size=12&sort=id,desc&filterBy=${orderStore.activeTab}&page=${page}`
    }

    useEffect(() => {
        dispatch(fetchOrderList(generateParams(0), false)).finally(() => setLoader(false))
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handleScroll = () => {
        if (isPageReachBottom()) {

        }
    }

    return (<LoaderComponent loading={loader}>
        <div className="order-list-page-container">
            <div className="page-title">
                <h2>Order list</h2>
            </div>
            <div className="order-list-tab">
                <ul>
                    <li className="active">
                        <span className="task-name regular-14">Running<span className="order-count running">156</span> </span>
                    </li>
                    <li>
                        <span className="task-name regular-14">Pending<span className="order-count pending">156</span> </span>
                    </li>
                    <li>
                        <span className="task-name regular-14">Completed<span
                            className="order-count complete">156</span> </span>
                    </li>
                </ul>
            </div>
            <div className="order-card-items">
                <div className="single-order-card">
                    <div className="design-images">
                        <img src={process.env.PUBLIC_URL + "images/design1.png"} alt="design"/>
                        <img src={process.env.PUBLIC_URL + "images/design2.png"} alt="design"/>
                        <img src={process.env.PUBLIC_URL + "images/design3.png"} alt="design"/>
                        <img src={process.env.PUBLIC_URL + "images/design4.png"} alt="design"/>
                    </div>
                    <div className="order-details">
                        <div className="po-numbers">
                            <div className="pos">
                                <span className="regular-14">0549008, 0549009, 0549008</span>
                                <span className="regular-14 gray_dark_02">(NITEX/B1/2021)</span>
                            </div>
                        </div>
                        <ul className="order-quantity-details d-flex">
                            <li>1 styles</li>
                            <li>1000 units</li>
                            <li>$12000</li>
                        </ul>
                        <div className="delivery-status">
                            <span>DELIVERY IN</span>
                            <span className="date-info">25-APR
                  <img src={process.env.PUBLIC_URL + "/icons/info-primary.svg"} alt=""/>
                  <div className="etd-dates shadow-2dp">
                    <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                    <ul className="start"><li>2nd ETD:</li><li>06 Apr, 2022</li></ul>
                    <ul className="start"><li>3rd ETD:</li><li>06 Apr, 2022</li></ul>
                  </div>
                </span>
                        </div>
                        <div className="progress-with-count d-flex align-items-center">
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                     aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                            </div>
                            <div><span className="count regular-14">100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LoaderComponent>)
}

export default OrderList