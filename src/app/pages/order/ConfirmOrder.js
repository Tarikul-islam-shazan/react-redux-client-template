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

        let response = this.props.location.routeParams;
        if (response) {
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

        const getDeliveryDate = () => {
            if (order.productResponseList.length !== 0) {
                let max = order.productResponseList.reduce(
                    (max, item) =>
                        item.deliveryTime
                            ? item.deliveryTime
                            : this.state.TURN_AROUND_TIME > max
                            ? item.deliveryTime
                            : max,
                    0
                );

                max = order.productResponseList.find((product) => product.deliveryTime === max);

                let formattedQuoteDate = convertTimeToLocal(
                    max.date,
                    max.time,
                    "DD/MM/YYYY hh:mm A"
                );
                formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");

                let deliveryDate = addWithCurrentDate(
                    formattedQuoteDate,
                    max.deliveryTime,
                    "day",
                    "Do MMM YY"
                );

                if (!deliveryDate) {
                    return toastError("Invalid date type");
                }
                return deliveryDate;
            }
        };

        const getTotalPrice = (order) => {
            if (order.productResponseList) {
                let total = order.productResponseList.reduce((total, pair) => {
                    return total + pair.designWiseBuyerPrice * pair.quantity;
                }, 0);
                return parseFloat(total);
            }
        };

        const onConfirm = async () => {
            await this.setState({ loading: true });
            let {
                order: { productResponseList, name },
            } = this.state;

            let productInfoForRfqIds = [];
            productResponseList.map((rfq) => {
                if (rfq.isSelected) {
                    productInfoForRfqIds.push(rfq.id);
                }
            });

            let body = {
                name: name,
                productInfoForRfqIds,
            };

            await Http.POST("order", body)
                .then(({ data }) => {
                    this.setState({ loading: false });
                    if (data.success) {
                        toastSuccess(data.message);
                        this.props.history.push("/orders/confirm-payment/" + data.id);
                    }
                })
                .catch(({ response }) => {
                    this.setState({ loading: false });
                    if (response && response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError("Something went wrong! Please try again.");
                    }
                });
        };

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
                                <div className="header-title d-flex justify-content-between align-items-center">
                                    <a href="#">
                                        <h3 className="text-black font-26 semibold">
                                            Placing order
                                        </h3>
                                    </a>
                                </div>

                                <div className="mt-3">
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

                                <h4 className="mb-5 mt-3 font-weight-normal color-333 order-id">
                                    <span className="result d-flex">
                                        Delivery date:{" "}
                                        <div className="text-black ml-2 semibold">
                                            {" "}
                                            {getDeliveryDate()}
                                        </div>
                                    </span>
                                </h4>
                                <h4 className="mb-3 font-weight-normal pc-step">
                                    Product confirmation (Step 1 of 2)
                                    <span className="result font-16 mr-3 mt-2 mt-sm-0">
                                        You have{" "}
                                        {order.productResponseList
                                            ? order.productResponseList.length
                                            : "-"}
                                        items in your order
                                    </span>
                                </h4>
                                {order.productResponseList ? (
                                    order.productResponseList.map((product, i) => {
                                        return (
                                            <OrderItem
                                                product={product}
                                                key={i}
                                                remove={this.delete}
                                            />
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="invoice-summary">
                                <div className="title">
                                    Invoice Summary
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

                                        <div className="sub-total pt-2 mt-4 border-top">
                                            <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                                Sub total
                                                <strong className="semibold font-18">
                                                    $
                                                    {isNaN(getTotalPrice(order))
                                                        ? 0
                                                        : getTotalPrice(order)}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="mt-5 shipping-info">
                                            <div className="mb-2 font-weight-normal color-333 font-18">
                                                Shipping <br />
                                                <div className="mt-4 color-gray font-12 info-text">
                                                    Shipping charges and duties might be extra and
                                                    will be confirmed before your order is
                                                    processed.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grand-total pt-2 mt-4 border-top">
                                            <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                                Grand total
                                                <strong className="semibold font-18">
                                                    $
                                                    {isNaN(getTotalPrice(order))
                                                        ? 0
                                                        : getTotalPrice(order)}
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
