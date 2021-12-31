import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Http from "../../services/Http";
import LoadingOverlay from "react-loading-overlay";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import { addWithCurrentDate, convertTimeToLocal } from "../../services/Util";
import {
    LOADER_OVERLAY_BACKGROUND,
    LOADER_COLOR,
    LOADER_WIDTH,
    LOADER_TEXT,
    LOADER_POSITION,
    LOADER_TOP,
    LOADER_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_MARGIN_LEFT,
    LOCAL_QUOTE_NOW_KEY,
} from "../../constant";
import { OrderItem } from "./components/OrderItem";
import EmptyState from "../../commonComponents/EmptyState";
import { fetchGeneralSettingsData } from "../../redux/actions";
class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            TURN_AROUND_TIME: "",
            loading: false,
            colorWiseTotal: [],
            sizeWiseTotal: [],
            designWiseTotal: [],
            totalPrice: 0,
            totalQuantity: 0,
            amountList: [],
            quantityList: [],
        };
    }

    componentDidMount = async () => {
        document.title = "Confirm payment - Nitex - The easiest clothing manufacturing software";
        await this.setState({ loading: true });
        const keys = ["TURN_AROUND_TIME"];
        const data = await fetchGeneralSettingsData(keys);
        if (data) {
            this.setState({
                TURN_AROUND_TIME: data["TURN_AROUND_TIME"] ? data["TURN_AROUND_TIME"].value : "",
                loading: false,
            });
        }
        let response = localStorage.getItem(`PLACE_ORDER_${LOCAL_QUOTE_NOW_KEY}`);
        if (response) {
            response = JSON.parse(response);
            this.setState({
                order: {
                    productResponseList: response.designList,
                    name: response.name,
                },
                loading: false,
            });
        } else {
            this.setState({ loading: false });
        }
    };

    onChange = (e) => {
        let { order } = this.state;
        order[e.target.name] = e.target.value;
        this.setState({
            order,
        });
    };

    delete = async (id) => {
        let { order } = this.state;
        let removedItem = order.productResponseList.filter((item) => item.id !== id);
        this.setState({
            order: {
                productResponseList: removedItem,
            },
        });
    };

    render() {
        let { order, loading } = this.state;
        let invoice = order.invoiceResponse ? order.invoiceResponse : {};

        // const getDeliveryDate = () => {
        //     if (order.productResponseList.length !== 0) {
        //         let max = order.productResponseList.reduce(
        //             (max, item) =>
        //                 item.deliveryTime
        //                     ? item.deliveryTime
        //                     : this.state.TURN_AROUND_TIME > max
        //                     ? item.deliveryTime
        //                     : max,
        //             0
        //         );

        //         max = order.productResponseList.find((product) => product.deliveryTime === max);

        //         let formattedQuoteDate = convertTimeToLocal(
        //             max.date,
        //             max.time,
        //             "DD/MM/YYYY hh:mm A"
        //         );
        //         formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");

        //         let deliveryDate = addWithCurrentDate(
        //             formattedQuoteDate,
        //             max.deliveryTime,
        //             "day",
        //             "Do MMM YY"
        //         );

        //         if (!deliveryDate) {
        //             return toastError("Invalid date type");
        //         }
        //         return deliveryDate;
        //     }
        // };

        const renderDesignWiseTotalPrice = (productId) => {
            let total = 0;
            this.state.designWiseTotal.map((item, index) => {
                if (parseInt(productId) === parseInt(Object.keys(item)[0])) {
                    let tmpObj = item[productId];
                    total += parseInt(tmpObj["quantity"]) * parseFloat(tmpObj["price"]);

                    return total;
                }
            });

            return total;
        };

        const renderSizeWiseTotalPrice = (productId) => {
            let total = 0;
            this.state.sizeWiseTotal.map((item, index) => {
                if (parseInt(productId) === parseInt(Object.keys(item)[0])) {
                    let tmpObj = item[productId];
                    for (let size in tmpObj) {
                        total +=
                            parseInt(tmpObj[size]["quantity"]) * parseFloat(tmpObj[size]["price"]);
                    }
                    return total;
                }
            });
            return total;
        };

        const renderColorWiseTotalPrice = (productId) => {
            let total = 0;
            this.state.colorWiseTotal.map((item, index) => {
                if (parseInt(productId) === parseInt(Object.keys(item)[0])) {
                    let tmpObj = item[productId];
                    for (let color in tmpObj) {
                        total +=
                            parseInt(tmpObj[color]["quantity"]) *
                            parseFloat(tmpObj[color]["price"]);
                    }
                    return total;
                }
            });
            return total;
        };

        const getTotalPrice = () => {
            let total = 0;
            if (order.productResponseList) {
                order.productResponseList.map((item) => {
                    if (item.buyerQuotationType === "DESIGNWISE") {
                        total += renderDesignWiseTotalPrice(item.id);
                    }
                });
            }

            if (order.productResponseList) {
                order.productResponseList.map((item) => {
                    if (item.buyerQuotationType === "COLORWISE") {
                        total += renderColorWiseTotalPrice(item.id);
                    }
                });
            }

            if (order.productResponseList) {
                order.productResponseList.map((item) => {
                    if (item.buyerQuotationType === "SIZEWISE") {
                        total += renderSizeWiseTotalPrice(item.id);
                    }
                });
            }
            return total;
        };

        const onConfirm = async () => {
            console.log("EEEEEEEEEEE");
            // await this.setState({ loading: true });
            // let {
            //     order: { productResponseList, name },
            // } = this.state;
            // let productInfoForRfqIds = [];
            // productResponseList.map((rfq) => {
            //     if (rfq.isSelected) {
            //         productInfoForRfqIds.push(rfq.id);
            //     }
            // });
            // let body = {
            //     name: name,
            //     productInfoForRfqIds,
            // };
            // await Http.POST("order", body)
            //     .then(({ data }) => {
            //         this.setState({ loading: false });
            //         if (data.success) {
            //             toastSuccess(data.message);
            //             this.props.history.push("/orders/confirm-payment/" + data.id);
            //         }
            //     })
            //     .catch(({ response }) => {
            //         this.setState({ loading: false });
            //         if (response && response.data && response.data.message) {
            //             toastError(response.data.message);
            //         } else {
            //             toastError("Something went wrong! Please try again.");
            //         }
            //     });
        };

        console.log("DDDDDDDDDDDDDD", this.state.amountList);

        const onUpdateColorSize = (productId, colorId, price, quantity) => {
            if (this.state.colorWiseTotal.length > 0) {
                let tmpArray = [...this.state.colorWiseTotal];
                this.state.colorWiseTotal.map((item, index) => {
                    for (let key in item) {
                        if (parseInt(key) === productId) {
                            let newItem = { [colorId]: { quantity, price } };
                            let newProduct = { [key]: { ...item[key], ...newItem } };
                            tmpArray.splice(index, 1);
                            if (quantity === "") {
                                delete newProduct[key][colorId];
                            }
                            tmpArray.push(newProduct);
                            this.setState((prev) => ({
                                ...prev,
                                colorWiseTotal: tmpArray,
                            }));
                        } else {
                            this.setState((prev) => ({
                                ...prev,
                                colorWiseTotal: [
                                    ...this.state.colorWiseTotal,
                                    { [parseInt(productId)]: { [colorId]: { quantity, price } } },
                                ],
                            }));
                        }
                    }
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    colorWiseTotal: [
                        ...this.state.colorWiseTotal,
                        { [parseInt(productId)]: { [colorId]: { quantity, price } } },
                    ],
                }));
            }
        };

        const onUpdateSizeQuantity = (productId, sizeId, price, quantity) => {
            if (this.state.sizeWiseTotal.length > 0) {
                let tmpArray = [...this.state.sizeWiseTotal];
                this.state.sizeWiseTotal.map((item, index) => {
                    for (let key in item) {
                        if (parseInt(key) === productId) {
                            let newItem = { [sizeId]: { quantity, price } };
                            let newProduct = { [key]: { ...item[key], ...newItem } };
                            tmpArray.splice(index, 1);
                            if (quantity === "") {
                                delete newProduct[key][sizeId];
                            }
                            tmpArray.push(newProduct);
                            this.setState((prev) => ({
                                ...prev,
                                sizeWiseTotal: tmpArray,
                            }));
                        } else {
                            this.setState((prev) => ({
                                ...prev,
                                sizeWiseTotal: [
                                    ...this.state.sizeWiseTotal,
                                    { [parseInt(productId)]: { [sizeId]: { quantity, price } } },
                                ],
                            }));
                        }
                    }
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    sizeWiseTotal: [
                        ...this.state.sizeWiseTotal,
                        { [parseInt(productId)]: { [sizeId]: { quantity, price } } },
                    ],
                }));
            }
        };

        const onUpdateDesignQuantity = (productId, price, quantity) => {
            if (this.state.designWiseTotal.length > 0) {
                console.log("==");
                let tmpArray = [...this.state.designWiseTotal];
                this.state.designWiseTotal.map((item, index) => {
                    for (let key in item) {
                        if (parseInt(key) === productId) {
                            let newProduct = { [productId]: { quantity, price } };
                            tmpArray.splice(index, 1);
                            if (quantity === "") {
                                delete newProduct[key];
                            } else {
                                tmpArray.push(newProduct);
                            }

                            this.setState((prev) => ({
                                ...prev,
                                designWiseTotal: tmpArray,
                            }));
                        } else {
                            this.setState((prev) => ({
                                ...prev,
                                designWiseTotal: [
                                    ...this.state.designWiseTotal,
                                    {
                                        [parseInt(productId)]: {
                                            quantity,
                                            price,
                                        },
                                    },
                                ],
                            }));
                        }
                    }
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    designWiseTotal: [
                        ...this.state.designWiseTotal,
                        {
                            [parseInt(productId)]: {
                                quantity,
                                price,
                            },
                        },
                    ],
                }));
            }
        };

        console.log("***********", this.state.colorWiseTotal);

        return (
            <LoadingOverlay
                active={this.state.loading}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: LOADER_OVERLAY_BACKGROUND,
                    }),
                    spinner: (base) => ({
                        ...base,
                        width: LOADER_WIDTH,
                        position: LOADER_POSITION,
                        top: LOADER_TOP,
                        left: LOADER_LEFT,
                        marginTop: LOADER_MARGIN_TOP,
                        marginLeft: LOADER_MARGIN_LEFT,
                        "& svg circle": {
                            stroke: LOADER_COLOR,
                        },
                    }),
                    content: (base) => ({
                        ...base,
                        color: LOADER_COLOR,
                    }),
                }}
                spinner
                text={LOADER_TEXT}
            >
                {order.productResponseList && order.productResponseList.length !== 0 && !loading ? (
                    <>
                        <div className="add-quote d-flex">
                            <div className="confirm-quote-request placing-order">
                                <div className="header-title">
                                    <a href="#">
                                        <h3 className="text-black font-26 semibold">Place order</h3>
                                    </a>
                                    <p className="mt-3">Order basic information*</p>
                                </div>

                                <div className="order-confirm-info-with-po d-flex mt-3">
                                    <div className="title-and-date">
                                        <div className="form-group">
                                            <label htmlFor="">Order title</label>
                                            <input
                                                type="text"
                                                placeholder="Order title"
                                                name="name"
                                                value={order.name}
                                                onChange={this.onChange}
                                                className="w-100 bg-gray-light"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Delivery date*</label>
                                            <input type="date" className="w-100 bg-gray-light" />
                                        </div>
                                    </div>
                                    <div className="po-column bg-white">
                                        <div className="uploded-po">
                                            <div className="single-po d-flex justify-content-between align-items-center">
                                                <div className="po-names">
                                                    <img src="../icons/file-pdf.svg" alt="pdf" />{" "}
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        BMW PO/2021
                                                    </a>
                                                </div>
                                                <div className="delete-btn">
                                                    <img
                                                        src="../icons/delete_gray.svg"
                                                        alt="delete"
                                                    />
                                                </div>
                                            </div>
                                            <div className="single-po d-flex justify-content-between align-items-center">
                                                <div className="po-names">
                                                    <img src="../icons/file-pdf.svg" alt="pdf" />{" "}
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        BMW PO/2021
                                                    </a>
                                                </div>
                                                <div className="delete-btn">
                                                    <img
                                                        src="../icons/delete_gray.svg"
                                                        alt="delete"
                                                    />
                                                </div>
                                            </div>
                                            <div className="single-po d-flex justify-content-between align-items-center">
                                                <div className="po-names">
                                                    <img src="../icons/file-pdf.svg" alt="pdf" />{" "}
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        BMW PO/2021
                                                    </a>
                                                </div>
                                                <div className="delete-btn">
                                                    <img
                                                        src="../icons/delete_gray.svg"
                                                        alt="delete"
                                                    />
                                                </div>
                                            </div>
                                            <div className="single-po d-flex justify-content-between align-items-center">
                                                <div className="po-names">
                                                    <img src="../icons/file-pdf.svg" alt="pdf" />{" "}
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        BMW PO/2021
                                                    </a>
                                                </div>
                                                <div className="delete-btn">
                                                    <img
                                                        src="../icons/delete_gray.svg"
                                                        alt="delete"
                                                    />
                                                </div>
                                            </div>
                                            {/* <p className="text-center no-po">No PO uploaded</p> */}
                                        </div>
                                        <div className="upload-po text-center">
                                            <label for="po-upload" className="drag-upload">
                                                <img src="../icons/upload-sm.svg" alt="" />{" "}
                                                <span>Upload PO</span>
                                            </label>
                                            <input
                                                type="file"
                                                className="file-upload d-none"
                                                name="po-upload"
                                                id="po-upload"
                                                accept=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4 className="mb-5 mt-3 font-weight-normal color-333 order-id">
                                    {/* <span className="result d-flex">
                                        Delivery date:{" "}
                                        <div className="text-black ml-2 semibold">
                                            {" "}
                                            {getDeliveryDate()}
                                        </div>
                                    </span> */}
                                </h4>
                                <h4 className="mb-3 font-weight-normal pc-step">
                                    Product confirmation (Step 1 of 2)
                                    {/* <span className="result font-16 mr-3 mt-2 mt-sm-0">
                                        You have{" "}
                                        {order.productResponseList
                                            ? order.productResponseList.length
                                            : "-"}
                                        items in your order
                                    </span> */}
                                </h4>
                                {order.productResponseList ? (
                                    order.productResponseList.map((product, i) => {
                                        return (
                                            <OrderItem
                                                product={product}
                                                key={i}
                                                remove={this.delete}
                                                // onSetPriceWiseQuantity={onSetPriceWiseQuantity}
                                                onUpdateColorSize={onUpdateColorSize}
                                                colorWiseItems={this.state.colorWiseTotal}
                                                onUpdateSizeQuantity={onUpdateSizeQuantity}
                                                sizeWiseItems={this.state.sizeWiseTotal}
                                                onUpdateDesignQuantity={onUpdateDesignQuantity}
                                                designWiseItems={this.state.designWiseTotal}
                                                getTotalPrice={getTotalPrice}
                                                loading={this.state.loading}
                                            />
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="invoice-summary">
                                <div className="title">
                                    Order summary
                                    <div className="toggle-up-down">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="9"
                                            viewBox="0 0 18 9"
                                        >
                                            <path
                                                id="Icon_ionic-md-arrow-dropdown"
                                                data-name="Icon ionic-md-arrow-dropdown"
                                                d="M9,22.5l9-9,9,9Z"
                                                transform="translate(-9 -13.5)"
                                                fill="#21242b"
                                            />
                                        </svg>
                                    </div>
                                    <div className="tab-price font-weight-bold">
                                        $
                                        {invoice.priceBreakDown
                                            ? invoice.priceBreakDown.grandTotal
                                            : ""}
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="ordered-container">
                                        {invoice.priceBreakDown &&
                                        invoice.priceBreakDown.itemWisePriceList ? (
                                            invoice.priceBreakDown.itemWisePriceList.map(
                                                (item, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between"
                                                        >
                                                            {item.itemName}
                                                            <strong className="semibold font-18">
                                                                ${item.designWiseBuyerPrice}
                                                            </strong>
                                                        </div>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <></>
                                        )}

                                        <div className="sub-total pt-2 mt-4">
                                            <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                                Total Quantity:
                                                <strong className="semibold font-18">
                                                    {/* $
                                                    {isNaN(getTotalPrice(order))
                                                        ? 0
                                                        : getTotalPrice(order)} */}
                                                </strong>
                                            </div>
                                            <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                                Total price:
                                                <strong className="semibold font-18">
                                                    ${isNaN(getTotalPrice()) ? 0 : getTotalPrice()}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="submit-for-payment d-flex flex-column align-items-center justify-content-center">
                                            <button
                                                className="btn-brand brand-bg-color shadow m-0 mt-5"
                                                onClick={onConfirm}
                                            >
                                                Confirm order
                                            </button>
                                            <span>Price maybe change</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    !loading && (
                        <div className="mt-5 not-found">
                            <EmptyState title="No design to order" />
                            <Link className="font-18" to="/quotes/list">
                                Go back
                            </Link>
                        </div>
                    )
                )}
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
