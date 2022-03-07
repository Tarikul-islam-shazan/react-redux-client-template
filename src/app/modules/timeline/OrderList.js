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

    return (
        <LoaderComponent loading={loader}>
            <p>Hello</p>
        </LoaderComponent>
    )
}

export default OrderList