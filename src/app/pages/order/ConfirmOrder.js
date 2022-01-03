import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

import moment from "moment";
import Http from "../../services/Http";
import LoadingOverlay from "react-loading-overlay";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import { addWithCurrentDate, convertTimeToLocal, changeDateFormat } from "../../services/Util";
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
import Loader from "../../commonComponents/Loader";
import { fetchGeneralSettingsData } from "../../redux/actions";

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            loading: false,
            poLoading: false,
            colorWiseTotal: [],
            sizeWiseTotal: [],
            designWiseTotal: [],
            totalPrice: 0,
            totalQuantity: 0,
            totalAmountList: [],
            totalQuantityList: [],
            name: "",
            poDocIdList: [],
            designLists: [],
            errorId: null,
            errorInfo: {},
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
        if (e.target.name === "deliveryDate") {
            order[e.target.name] = e.target.value;
            this.setState({
                errorInfo: {},
            });
        } else {
            order[e.target.name] = e.target.value;
            this.setState({
                order,
                errorInfo: {},
            });
        }
    };

    delete = async (id) => {
        let { order, designLists } = this.state;
        let removedItem = order.productResponseList.filter((item) => item.id !== id);
        let filteredDesignList = designLists.filter((item) => item.id !== id);
        this.setState({
            order: {
                productResponseList: removedItem,
            },
            designLists: filteredDesignList,
        });
    };

    getQuotationQuantity = (product) => {
        return product.quotationQuantity || product.quantity || 0;
    };

    getTotalQuotationQuantity = () => {
        let total = 0;
        this.state.order.productResponseList.forEach((product) => {
            total += this.getQuotationQuantity(product);
        });
        return total;
    };

    render() {
        let { order, loading } = this.state;
        let invoice = order.invoiceResponse ? order.invoiceResponse : {};

        const renderDesignWiseTotalPrice = (productId) => {
            let total = 0;
            let designWiseList = this.state.designLists.filter(
                (design) => design.type === "DESIGNWISE"
            );
            let item = designWiseList.find((design) => parseInt(design.id) === parseInt(productId));
            if (item?.product) {
                total += parseInt(item?.product["quantity"]) * parseFloat(item?.product["price"]);
            }
            return total.toFixed(2);
        };

        const renderDesignWiseTotalQuantity = (productId) => {
            let total = 0;
            let designWiseList = this.state.designLists.filter(
                (design) => design.type === "DESIGNWISE"
            );
            let item = designWiseList.find((design) => parseInt(design.id) === parseInt(productId));
            if (item?.product) {
                total += parseInt(item?.product["quantity"]);
            }
            return total;
        };

        const renderSizeWiseTotalPrice = (productId) => {
            let total = 0;
            let sizeWiseDesignList = this.state.designLists.filter(
                (design) => design.type === "SIZEWISE"
            );
            let item = sizeWiseDesignList.find(
                (design) => parseInt(design.id) === parseInt(productId)
            );
            if (item) {
                for (let size in item.product) {
                    total +=
                        parseInt(item.product[size]["quantity"]) *
                        parseFloat(item.product[size]["price"]);
                }
            }
            return total.toFixed(2);
        };

        const renderSizeWiseTotalQuantity = (productId) => {
            let total = 0;
            let sizeWiseDesignList = this.state.designLists.filter(
                (design) => design.type === "SIZEWISE"
            );
            let item = sizeWiseDesignList.find(
                (design) => parseInt(design.id) === parseInt(productId)
            );
            if (item) {
                for (let size in item.product) {
                    total += parseInt(item.product[size]["quantity"]);
                }
            }
            return total;
        };

        const renderColorWiseTotalPrice = (productId) => {
            let total = 0;
            let colorWiseDesignList = this.state.designLists.filter(
                (design) => design.type === "COLORWISE"
            );
            let item = colorWiseDesignList.find(
                (design) => parseInt(design.id) === parseInt(productId)
            );
            if (item) {
                for (let size in item.product) {
                    total +=
                        parseInt(item.product[size]["quantity"]) *
                        parseFloat(item.product[size]["price"]);
                }
            }
            return total.toFixed(2);
        };

        const renderColorWiseTotalQuantity = (productId) => {
            let total = 0;
            let colorWiseDesignList = this.state.designLists.filter(
                (design) => design.type === "COLORWISE"
            );
            let item = colorWiseDesignList.find(
                (design) => parseInt(design.id) === parseInt(productId)
            );
            if (item) {
                for (let size in item.product) {
                    total += parseInt(item.product[size]["quantity"]);
                }
            }
            return total;
        };

        const calculateTotalPrice = (productId, type) => {
            let total = 0;
            if (type === "SIZEWISE") {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    for (let size in item.product) {
                        total +=
                            parseInt(item.product[size]["quantity"]) *
                            parseFloat(item.product[size]["price"]);
                    }
                }
            } else if (type === "COLORWISE") {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    for (let size in item.product) {
                        total +=
                            parseInt(item.product[size]["quantity"]) *
                            parseFloat(item.product[size]["price"]);
                    }
                }
            } else {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    total += parseInt(item.product["quantity"]) * parseFloat(item.product["price"]);
                }
            }
            return total;
        };

        const calculateTotalQuantity = (productId, type) => {
            let total = 0;
            if (type === "SIZEWISE") {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    for (let size in item.product) {
                        total += parseInt(item.product[size]["quantity"]);
                    }
                }
            } else if (type === "COLORWISE") {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    for (let size in item.product) {
                        total += parseInt(item.product[size]["quantity"]);
                    }
                }
            } else {
                let item = this.state.designLists.find(
                    (design) => parseInt(design.id) === parseInt(productId)
                );
                if (item) {
                    total += parseInt(item.product["quantity"]);
                }
            }
            return total;
        };

        const getTotalPrice = () => {
            let total = 0;
            this.state.designLists.forEach((item, index) => {
                total += calculateTotalPrice(item.id, item.type);
            });
            return total;
        };

        const getTotalQuantity = () => {
            let total = 0;
            this.state.designLists.forEach((item, index) => {
                total += calculateTotalQuantity(item.id, item.type);
            });

            return total;
        };

        const validateQuantity = () => {
            let allDesginTotal = [];
            let itemId = null;

            this.state.order.productResponseList.forEach((item, index) => {
                allDesginTotal.push({
                    id: item.id,
                    total: calculateTotalQuantity(item.id, item.buyerQuotationType),
                });
            });
            allDesginTotal.forEach((item, index) => {
                if (item.total === 0) {
                    itemId = item.id;
                    return item.id;
                }
            });
            return itemId;
        };

        const validateOrderInfo = () => {
            let isValid = true;
            let {
                order: { name, deliveryDate },
            } = this.state;
            if (!name) {
                this.setState({
                    errorInfo: { name: "Title is required" },
                });
                isValid = false;
            }

            if (!deliveryDate) {
                this.setState({
                    errorInfo: { date: "Title is required" },
                });
                isValid = false;
            }
            return isValid;
        };

        const onConfirm = async () => {
            let itemId = validateQuantity();
            let isValid = validateOrderInfo();

            if (!itemId && isValid) {
                let amounts = [];
                let quantityList = [];

                this.state.designLists.forEach((item, index) => {
                    amounts[item.order] = calculateTotalPrice(item.id, item.type);
                });
                this.state.designLists.forEach((item, index) => {
                    quantityList[item.order] = calculateTotalQuantity(item.id, item.type);
                });

                await this.setState({ loading: true });
                let {
                    order: { productResponseList, name, deliveryDate },
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
                    amountList: [...amounts],
                    quantityList,
                    deliveryDate: changeDateFormat(deliveryDate, "", "DD/MM/YYYY"),
                    poDocIdList: this.state.poDocIdList.map((item) => item.id),
                    orderValue: getTotalPrice(),
                };
                await Http.POST("order", body)
                    .then(({ data }) => {
                        this.setState({ loading: false, errorId: itemId });
                        if (data.success) {
                            toastSuccess(data.message);
                            localStorage.removeItem(`PLACE_ORDER_${LOCAL_QUOTE_NOW_KEY}`);
                            this.props.history.push("/orders/my-orders?tab=pending");
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
            } else {
                this.setState({ errorId: itemId });
            }
        };

        const onUpdateColorSize = (productId, colorId, price, quantity, index) => {
            let itemIndex = this.state.designLists.findIndex(
                (product) => parseInt(product.id) === parseInt(productId)
            );
            if (itemIndex > -1) {
                let designList = [...this.state.designLists];
                let item = designList[itemIndex];
                let newItem = {
                    ...item,
                    product: { ...item.product, [colorId]: { quantity, price } },
                };
                if (quantity === "") {
                    delete newItem.product[colorId];
                }
                designList[itemIndex] = newItem;
                this.setState({
                    designLists: designList,
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    designLists: [
                        ...this.state.designLists,
                        {
                            id: productId,
                            product: {
                                [colorId]: { quantity, price },
                            },
                            type: "COLORWISE",
                            order: index,
                        },
                    ],
                }));
            }
        };

        const onUpdateSizeQuantity = (productId, sizeId, price, quantity, index) => {
            let itemIndex = this.state.designLists.findIndex(
                (product) => parseInt(product.id) === parseInt(productId)
            );
            if (itemIndex > -1) {
                let designList = [...this.state.designLists];
                let item = designList[itemIndex];
                let newItem = {
                    ...item,
                    product: { ...item.product, [sizeId]: { quantity, price } },
                };
                if (quantity === "") {
                    delete newItem.product[sizeId];
                }
                designList[itemIndex] = newItem;
                this.setState({
                    designLists: designList,
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    designLists: [
                        ...this.state.designLists,
                        {
                            id: productId,
                            product: {
                                [sizeId]: { quantity, price },
                            },
                            type: "SIZEWISE",
                            order: index,
                        },
                    ],
                }));
            }
        };

        const onUpdateDesignQuantity = (productId, price, quantity, index) => {
            let itemIndex = this.state.designLists.findIndex(
                (product) => parseInt(product.id) === parseInt(productId)
            );
            if (itemIndex > -1) {
                let designList = [...this.state.designLists];
                let item = designList[itemIndex];
                let newItem = {
                    ...item,
                    product: { ...item.product, ...{ quantity, price } },
                };
                if (quantity === "") {
                    delete newItem["id"];
                }
                designList[itemIndex] = newItem;
                this.setState({
                    designLists: designList,
                });
            } else {
                this.setState((prev) => ({
                    ...prev,
                    designLists: [
                        ...this.state.designLists,
                        {
                            id: productId,
                            product: { quantity, price },
                            type: "DESIGNWISE",
                            order: index,
                        },
                    ],
                }));
            }
        };

        const getShortName = (source, size = 35) => {
            return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
        };

        const onUploadPo = async (poData) => {
            this.setState({ poLoading: true });
            await Http.POST("uploadDocument", poData)
                .then(({ data }) => {
                    this.setState({ poLoading: false });
                    if (data) {
                        this.setState({
                            poDocIdList: [
                                ...this.state.poDocIdList,
                                { name: poData.name, id: data.id, docUrl: data.docUrl },
                            ],
                        });
                        toastSuccess("Uploaded successfully");
                    }
                })
                .catch(({ response }) => {
                    this.setState({ poLoading: false });
                    if (response && response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError("Request was unsuccessful.");
                    }
                });
        };

        const onChangePo = (e, docType) => {
            let file = e.target.files[0];
            let data = {
                name: file.name,
                docMimeType: file.type,
                documentType: docType,
                base64Str: "",
            };
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                data.base64Str = reader.result;
                onUploadPo(data);
            };
            reader.onerror = function (error) {
                toastError(error);
            };
        };

        const onRemovePo = async (itemId) => {
            const updatedList = this.state.poDocIdList.filter((item) => item.id !== itemId);
            this.setState({
                poDocIdList: [...updatedList],
            });
        };

        return (
            <Loader loading={loading}>
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
                                            {this.state.errorInfo.name && (
                                                <p className="error">{this.state.errorInfo.name}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Delivery date*</label>
                                            <input
                                                type="date"
                                                className="w-100 bg-gray-light"
                                                name="deliveryDate"
                                                value={order.deliveryDate}
                                                onChange={this.onChange}
                                            />
                                            {this.state.errorInfo.date && (
                                                <p className="error">{this.state.errorInfo.date}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="po-column bg-white">
                                        <div className="uploded-po">
                                            {this.state?.poDocIdList.map((item) => (
                                                <div
                                                    className="single-po d-flex justify-content-between align-items-center"
                                                    key={item.id}
                                                >
                                                    <div className="po-names">
                                                        <img
                                                            src="../icons/file-pdf.svg"
                                                            alt="pdf"
                                                        />{" "}
                                                        <Tooltip
                                                            title={item.name}
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <a
                                                                href={item.docUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {getShortName(item.name, 15)}
                                                            </a>
                                                        </Tooltip>
                                                    </div>
                                                    <div
                                                        className="delete-btn"
                                                        onClick={() => onRemovePo(item.id)}
                                                    >
                                                        <img
                                                            src="../icons/delete_gray.svg"
                                                            alt="delete"
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            {(!this.state?.poDocIdList ||
                                                this.state?.poDocIdList.length === 0) && (
                                                <div className="uploded-po pt-2">
                                                    <p className="regular-14 gray_dark_02 text-center no-po">
                                                        No PO uploaded
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <Loader loading={this.state.poLoading}>
                                            <div className="upload-po text-center">
                                                <label
                                                    for="po-upload"
                                                    className="drag-upload cursor-pointer"
                                                >
                                                    <img src="../icons/upload-sm.svg" alt="" />{" "}
                                                    <span>Upload PO</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    className="file-upload d-none"
                                                    onChange={(e) =>
                                                        onChangePo(e, "PURCHASE_ORDER")
                                                    }
                                                    name="po-upload"
                                                    id="po-upload"
                                                    accept="application/pdf"
                                                />
                                            </div>
                                        </Loader>
                                    </div>
                                </div>

                                {order.productResponseList ? (
                                    order.productResponseList
                                        .slice(0)
                                        .reverse()
                                        .map((product, i) => {
                                            return (
                                                <OrderItem
                                                    product={product}
                                                    key={i}
                                                    designIndex={i}
                                                    remove={this.delete}
                                                    onUpdateColorSize={onUpdateColorSize}
                                                    colorWiseItems={this.state.colorWiseTotal}
                                                    onUpdateSizeQuantity={onUpdateSizeQuantity}
                                                    sizeWiseItems={this.state.sizeWiseTotal}
                                                    onUpdateDesignQuantity={onUpdateDesignQuantity}
                                                    designWiseItems={this.state.designWiseTotal}
                                                    getTotalPrice={getTotalPrice}
                                                    renderSizeWiseTotalPrice={
                                                        renderSizeWiseTotalPrice
                                                    }
                                                    renderColorWiseTotalPrice={
                                                        renderColorWiseTotalPrice
                                                    }
                                                    renderDesignWiseTotalPrice={
                                                        renderDesignWiseTotalPrice
                                                    }
                                                    renderDesignWiseTotalQuantity={
                                                        renderDesignWiseTotalQuantity
                                                    }
                                                    renderSizeWiseTotalQuantity={
                                                        renderSizeWiseTotalQuantity
                                                    }
                                                    renderColorWiseTotalQuantity={
                                                        renderColorWiseTotalQuantity
                                                    }
                                                    errorId={this.state.errorId}
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
                                                    {isNaN(getTotalQuantity())
                                                        ? 0
                                                        : getTotalQuantity()}
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
                                            {getTotalQuantity() <
                                                this.getTotalQuotationQuantity() && (
                                                <span>Price maybe change</span>
                                            )}
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
            </Loader>
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
