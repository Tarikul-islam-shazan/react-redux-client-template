import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import CLOSE_ICON from "../../../assets/images/icons/close-icon.svg";
import Http from "../../../services/Http";
import {capitalizeFirstLetter, convertTimeToLocal, validateNumber} from "../../../services/Util";
import {toastSuccess, toastError, toastWarning} from "../../../commonComponents/Toast";
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
} from "../../../constant";
import LoadingOverlay from "react-loading-overlay";
import {Prev} from "react-bootstrap/esm/PageItem";
import moment from "moment";
import {Tooltip, Typography} from "@material-ui/core";

const AllStyles = ({onClose}) => {
    const [orderQuotes, setOrderQuotes] = useState([]);
    const [editableField, setEditableField] = useState("");
    const [updatedData, setUpdatedData] = useState([]);
    const [editablePriceFieldId, setEditablePriceFieldId] = useState("");
    const [updatePriceData, setUpdatePriceData] = useState([]);
    const [errors, setErrors] = useState({
        priceError: "",
    });
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const {id} = useParams();

    let timeDifference = 0;

    const getOrderQuotes = async (orderId) => {
        setLoading(true);
        await Http.GET("getOrderQuotes", orderId)
            .then(({data}) => {
                setLoading(false);
                setOrderQuotes(data);
            })
            .catch(({response}) => {
                setLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    useEffect(() => {
        getOrderQuotes(id);
    }, [id]);

    const getTotal = (items) => {
        return items.reduce((total, pair) => {
            if (pair.quantity) {
                return total + parseInt(pair.quantity);
            }
            return total;
        }, 0);
    };

    const onEditQuantity = (item) => {
        setEditableField(item.id);
    };

    const resetValues = () => {
        setEditableField("");
        setUpdatedData([]);
        setEditablePriceFieldId("");
    };

    const onSave = async () => {
        setLoading(true);
        let body = {
            colorWiseSizeQuantityPairList: updatedData,
            total: updatedData.quantity,
        };

        if (body.colorWiseSizeQuantityPairList.length !== 0) {
            await Http.PUT("updateRfqColorSize", body.colorWiseSizeQuantityPairList, editableField)
                .then(({data}) => {
                    setLoading(false);
                    getOrderQuotes(id);
                    resetValues();
                    if (data.success) {
                        toastSuccess(data.message);
                    } else {
                        toastError(data.message);
                    }
                })
                .catch(({response}) => {
                    setLoading(false);
                    resetValues();
                    if (response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError("Something went wrong! Please try again.");
                    }
                });
        } else {
            setLoading(false);
            resetValues();
        }
    };
    const onCancel = () => {
        setEditableField("");
        setEditablePriceFieldId("");
        getOrderQuotes(id);
    };


    const onEditChange = (e, index, quoteIndex, inputIndex) => {
        let {name, value} = e.target;
        const newData = [...orderQuotes];
        const orderData = newData[quoteIndex];
        orderData.colorWiseSizeQuantityPairList[index].sizeQuantityPairList[inputIndex].quantity =
            isNaN(parseInt(value)) ? 0 : value === "" ? 0 : parseInt(value);
        newData[quoteIndex] = orderData;
        setOrderQuotes(newData);
        setUpdatedData(newData[quoteIndex]);
    };

    const onEditPriceInfo = (item) => {
        setEditablePriceFieldId(item.id);
    };

    const onEditPrice = (e, quoteIndex) => {
        let {name, value} = e.target;
        setErrors({
            ...errors,
            priceError: "",
        });
        const newData = [...orderQuotes];
        const orderData = newData[quoteIndex];

        setUpdatePriceData([...newData, (orderData[name] = value)]);
    };

    const onSavePriceData = async () => {
        setLoading(true);
        let body = updatePriceData.filter((item) => item.id === editablePriceFieldId)[0];
        if (body.price === "") {
            setErrors({
                ...errors,
                priceError: "Price is required",
            });
            setLoading(false);
            return;
        }
        await Http.PUT("sendRfqOffer", body, editablePriceFieldId)
            .then(({data}) => {
                setLoading(false);
                getOrderQuotes(id);
                resetValues();
                if (data.success) {
                    toastSuccess(data.message);
                } else {
                    toastError(data.message);
                }
            })
            .catch(({response}) => {
                setLoading(false);
                resetValues();
                if (response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    const getItemTotal = (items) => {
        return items.reduce((total, item) => {
            return total + getTotal(item.sizeQuantityPairList);
        }, 0);
    };

    const getValidDateTill = (date, time) => {
        let formattedDate = convertTimeToLocal(date, time, "MMM D, YYYY hh:mm A");
        formattedDate = moment(formattedDate);
        return formattedDate.add(1, "months").format("MMM D, YYYY");
    };

    const getSizeWiseLabel = (size, id) => {
        if (size && size[id]) {
            return size[id];
        }
        return null;
    };

    const renderSizeWisePrice = (quote) => (
        <div className="category-wise-quantity-table desingwise-table scroll-x-label">
            <table>
                <tr>
                    {Object.keys(quote?.sizeWiseBuyerPrice).map((key, i) => (
                        <th key={i}>
                            <p> {getSizeWiseLabel(quote?.sizeLabelMap, key)}</p>
                        </th>
                    ))}
                </tr>
                <tr>
                    {Object.values(quote?.sizeWiseBuyerPrice).map((value, i) => (
                        <td key={i}>
                            <p>
                                <span>${value}</span>
                            </p>
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    );

    const renderDesignWisePrice = (quote) => (
        <div className="pricewillbeupdated pt-2 pb-3">
            <div>
                <strong className="font-30">
                    ${quote.designWiseBuyerPrice ? quote.designWiseBuyerPrice : `—————`}
                </strong>
                <br />
                <span className="cursor-pointer font-14">
                    /Unit
                    {renderTooltip(quote.priceInfoText)}
                </span>
            </div>
        </div>
    );

    const renderTooltip = (message) => {
        return (
            <Tooltip
                title={<Typography fontSize={30}>{message}</Typography>}
                placement="bottom"
                arrow
            >
                <svg
                    className="ml-2 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                >
                    <g id="Group_13" data-name="Group 13" transform="translate(1445 -3504)">
                        <circle
                            id="Ellipse_1"
                            data-name="Ellipse 1"
                            cx="7"
                            cy="7"
                            r="7"
                            transform="translate(-1445 3506)"
                            fill="#ddd"
                        />
                        <text
                            id="Price_will_be_updated_within_24_hours"
                            data-name="Price will be updated within 24 hours"
                            transform="translate(-1438 3516)"
                            fill="#21242b"
                            font-size="11"
                            font-family="SegoeUI, Segoe UI"
                        >
                            <tspan x="-1.332" y="0">
                                i
                            </tspan>
                        </text>
                    </g>
                </svg>
            </Tooltip>
        );
    };

    const getColors = (colorList, key) => {
        let hexCode = "";
        colorList.forEach((item, id) => {
            if (item.id === parseInt(key)) {
                hexCode = item.hexCode;
                return item.hexCode;
            }
        });
        return hexCode;
    };


    const renderColorWisePrice = (quote) => (
        <div className="category-wise-quantity-table color-wise-table scroll-x-label">
            <table>
                <tr>
                    {Object.keys(quote?.colorWiseBuyerPrice).map((key) => (
                        <Tooltip
                            title={<Typography fontSize={30}>{`#${key}`}</Typography>}
                            placement="top"
                            arrow
                            key={key}
                        >
                            <th key={key}>
                                <span
                                    class="cursor-pointer color-icon"
                                    style={{
                                        background: `${getColors(
                                            quote?.colorWiseSizeQuantityPairList,
                                            key
                                        )}`,
                                    }}
                                />
                            </th>
                        </Tooltip>
                    ))}
                </tr>
                <tr>
                    {Object.values(quote?.colorWiseBuyerPrice).map((value, i) => (
                        <td key={i}>
                            <p>
                                <span>${value}</span>
                            </p>
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    );

    const renderCriteriaWisePrice = (quote) => {
        if (quote.status !== "PRICE_GIVEN") {
            let formattedQuoteDate = convertTimeToLocal(quote.date, quote.time, "DD/MM/YYYY hh:mm A");
            formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");
            const currentDate = moment().format("DD/MM/YYYY hh:mm A");
            const formattedCurrentDate = moment(currentDate, "DD/MM/YYYY hh:mm A");
            timeDifference = 24 - formattedCurrentDate.diff(formattedQuoteDate, "hours");
        }
        if(quote.status === "PRICE_GIVEN"){
            return (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    {/* Start New design update */}
                    <div className="price-category-info text-center">
                        <span className="font-15 valid-till">
                            Price valid till{" "}
                            <span className="font-weight-bold">
                                {" "}
                                {getValidDateTill(quote.date, quote.time)}
                            </span>{" "}
                        </span>
                        <p>
                            {capitalizeFirstLetter(quote.buyerQuotationType)} {quote.priceType}{" "}
                            price
                        </p>
                    </div>

                    {quote.buyerQuotationType === "SIZEWISE" ? (
                        renderSizeWisePrice(quote)
                    ) : quote.buyerQuotationType === "COLORWISE" ? (
                        renderColorWisePrice(quote)
                    ) : quote.buyerQuotationType === "DESIGNWISE" ? (
                        renderDesignWisePrice(quote)
                    ) : (
                        <p className="not-quoted">Price will given within 24 hours</p>
                    )}
                </div>
            )
        }
        else if(quote.status === "PRODUCT_SOLD"){
            return (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        {!quote.designWiseBuyerPrice ? (
                            <span className="font-14">
                                Price will be updated
                                <br />
                                within{" "}
                                <span className="font-italic font-weight-bold">
                                    {timeDifference > 0 ? timeDifference : 0} hours
                                </span>
                            </span>
                        ) : (
                            <div className="text-center">
                                <span className="font-15 valid-till">
                                    Price valid till{" "}
                                    <span className="font-weight-bold">
                                        {getValidDateTill(quote.date, quote.time)}
                                    </span>
                                </span>
                                <div className="pricewillbeupdated pt-2 pb-3">
                                    <div>
                                        <strong className="font-30">
                                            $
                                            {quote.designWiseBuyerPrice
                                                ? quote.designWiseBuyerPrice
                                                : `—————`}
                                        </strong>
                                        <br />
                                        <span className="cursor-pointer font-14">
                                            /Unit
                                            {renderTooltip(quote.priceInfoText)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        else if(quote.status === "ORDER_PLACED"){
            return (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        <span className="font-15 valid-till">Price confirmed</span>
                        <p>
                            {capitalizeFirstLetter(quote.buyerQuotationType)} {quote.priceType}{" "}
                            price
                        </p>
                        {quote.buyerQuotationType === "SIZEWISE"
                            ? renderSizeWisePrice(quote)
                            : quote.buyerQuotationType === "COLORWISE"
                                ? renderColorWisePrice(quote)
                                : quote.buyerQuotationType === "DESIGNWISE"
                                    ? renderDesignWisePrice(quote)
                                    : ""}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        {quote.status !== "PRICE_GIVEN" ? (
                            <span className="font-14">
                                Price will be updated <br />
                                within{" "}
                                <span className="font-italic font-weight-bold">
                                    {timeDifference > 0 ? timeDifference : 0} hours
                                </span>
                            </span>
                        ) : (
                            <span className="font-16">
                                Price will be valid till{" "}
                                <span className="font-italic font-weight-bold">
                                    {getValidDateTill(quote.date, quote.time)}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            )
        }
    }

    return (
        <LoadingOverlay
            active={loading}
            styles={{
                zIndex: 10000,
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
            <section className="all-style-popup-section">
                <div className="style-title-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6">
                                <h2>All styles</h2>
                            </div>
                            <div className="col-6 text-right">
                                <img
                                    style={{cursor: "pointer"}}
                                    src={CLOSE_ICON}
                                    alt="CLose"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {orderQuotes &&
                    orderQuotes.map((item, quoteIndex) => (
                        <div className="single-style-row" key={item.id}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-5 d-flex pl-0">
                                        <div className="style-image mr-3">
                                            <Link to={`/designs/view/${item.productId}`}>
                                                <img
                                                    src={
                                                        item.documentResponseList
                                                            ? item.documentResponseList[0].docUrl
                                                            : ""
                                                    }
                                                    alt={item.name}
                                                /></Link>
                                        </div>
                                        <div className="style-info">
                                            <Link to={`/designs/view/${item.productId}`}><h3>{item.name}</h3></Link>
                                            <button onClick={() => history.push(`/designs/edit/${item.productId}`)}>Edit design</button>
                                            <div className="units-info">
                                                {/* <h4>{item.quantity} units</h4> */}
                                                <h4>
                                                    {getItemTotal(item.colorWiseSizeQuantityPairList)} units
                                                </h4>
                                                {/* <span>S-XL</span> */}
                                                <span>{item.colorWiseSizeQuantityPairList.length} colors</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="quantity-table scroll-y-label scroll-x-label">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <th></th>
                                                    {item.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map(
                                                        (size, i) => {
                                                            return <th key={i}>{size.code}</th>;
                                                        }
                                                    )}
                                                    <th>Total</th>
                                                </tr>

                                                {item.colorWiseSizeQuantityPairList &&
                                                    item.colorWiseSizeQuantityPairList.map((value, index) => (
                                                        <tr key={value.id}>
                                                            <td>
                                                   <span
                                                       className="color"
                                                       style={{background: value.hexCode}}
                                                   />
                                                            </td>

                                                            {value &&
                                                                value.sizeQuantityPairList.map(
                                                                    (style, inputIndex) => (
                                                                        <td key={style.code}>
                                                                            {editableField == item.id ? (
                                                                                <input
                                                                                    type="text"
                                                                                    name={style.code}
                                                                                    value={style.quantity}
                                                                                    placeholder="00"
                                                                                    onChange={(e) =>
                                                                                        onEditChange(
                                                                                            e,
                                                                                            index,
                                                                                            quoteIndex,
                                                                                            inputIndex
                                                                                        )
                                                                                    }
                                                                                    onKeyPress={validateNumber}
                                                                                />
                                                                            ) : (
                                                                                <p>
                                                                                    {style.quantity
                                                                                        ? style.quantity
                                                                                        : 0}
                                                                                </p>
                                                                            )}
                                                                        </td>
                                                                    )
                                                                )}
                                                            <td>
                                                                <p>{getTotal(value.sizeQuantityPairList)}</p>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        {renderCriteriaWisePrice(item)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </LoadingOverlay>
    );
};

export default AllStyles;
