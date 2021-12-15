import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import CLOSE_ICON from "../../../assets/images/icons/close-icon.svg";
import Http from "../../../services/Http";
import {validateNumber} from "../../../services/Util";
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
                                        <div className="quantity-table">
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

                                        {editableField == item.id ? (
                                            <>
                                                <button
                                                    className="cancel-button"
                                                    onClick={() => onCancel(item)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="save-button inactive"
                                                    onClick={() => onSave(item)}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="edit-button"
                                                onClick={() => onEditQuantity(item)}
                                            >
                                                Edit quantity
                                            </button>
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <div className="price-column text-center">
                                            {editablePriceFieldId == item.id ? (
                                                <div className="edit-view text-left">
                                                    <p className="pb-1">Price per unit</p>
                                                    <div className="form-group d-flex mb-0">
                                                        <input
                                                            type="text"
                                                            id="price"
                                                            name="price"
                                                            value={item.price}
                                                            onChange={(e) => onEditPrice(e, quoteIndex)}
                                                            onKeyPress={validateNumber}
                                                            placeholder="0"
                                                        />

                                                        <select
                                                            id="currency"
                                                            name="currency"
                                                            onChange={(e) => onEditPrice(e, quoteIndex)}
                                                            value={item.currency}
                                                        >
                                                            <option value="USD">$</option>
                                                            <option value="EUR">€</option>
                                                        </select>
                                                    </div>
                                                    {errors.priceError ? (
                                                        <p className="error">{errors.priceError}</p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <p className="pb-2 total-value-info">Total value: $25,320</p>
                                                    <p className="price-type">Price type</p>
                                                    <input
                                                        type="radio"
                                                        id="priceType"
                                                        name="priceType"
                                                        value="FOB"
                                                        checked={item.priceType === "FOB"}
                                                        onChange={(e) => onEditPrice(e, quoteIndex)}
                                                    />
                                                    <label htmlFor="fob">Fob</label>
                                                    <input
                                                        type="radio"
                                                        id="priceType"
                                                        name="priceType"
                                                        value="CIF"
                                                        checked={item.priceType === "CIF"}
                                                        onChange={(e) => onEditPrice(e, quoteIndex)}
                                                    />
                                                    <label htmlFor="cif">CIF</label>
                                                    <div className="actions text-center pt-2">
                                                        <button className="cancel-button" onClick={onCancel}>
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="save-button inactive"
                                                            onClick={onSavePriceData}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="normal-view">
                                                    <h2>${item.price}</h2>
                                                    <p className="unit-info">/unit ({item.priceType})</p>

                                                    <p className="value-info">
                                                        Total value: $
                                                        {item.price *
                                                            getItemTotal(item.colorWiseSizeQuantityPairList)}
                                                    </p>
                                                    <button
                                                        className="edit-button"
                                                        onClick={(e) => onEditPriceInfo(item)}
                                                    >
                                                        Edit price
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
