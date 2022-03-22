import React, {useEffect, useRef, useState} from "react";
import {
    addImageSuffix,
    rfqProductStatus,
    convertTimeToLocal,
    changeDateFormat, renderMultiColor,
} from "../../../services/Util";
import moment from "moment";
import { Tooltip, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getShortName, capitalizeFirstLetter } from "../../../services/Util";

export const QuotedItem = ({ quote, index, toggleSelect, search }) => {
    const [showSizes, setShowSizes] = useState(false);
    let flag = 1;
    let timeDifference = 0;
    let colorWiseRef = useRef(null);

    if (quote.status !== "PRICE_GIVEN") {
        let formattedQuoteDate = convertTimeToLocal(quote.date, quote.time, "DD/MM/YYYY hh:mm A");
        formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");
        const currentDate = moment().format("DD/MM/YYYY hh:mm A");
        const formattedCurrentDate = moment(currentDate, "DD/MM/YYYY hh:mm A");
        timeDifference = 24 - formattedCurrentDate.diff(formattedQuoteDate, "hours");
    }

    const getValidDateTill = (date, time) => {
        let formattedDate = convertTimeToLocal(date, time, "MMM D, YYYY hh:mm A");
        formattedDate = moment(formattedDate);
        return formattedDate.add(1, "months").format("MMM D, YYYY");
    };

    useEffect(() => {
        document.addEventListener('click', onClickOutside, { capture: true });
        return () => {
            document.removeEventListener('click', onClickOutside);
        };
    }, []);

    const onClickOutside = (event) => {
        if (colorWiseRef.current && !colorWiseRef.current.contains(event.target)) {
            setShowSizes(false)
        }
    };

    const renderTooltip = (message) => {
        return (
            <Tooltip
                title={<Typography fontSize={22}>{message}</Typography>}
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

    const renderDesignStatus = (message) => {
        return (
            <div
                className="favourite-part choose disabled"
                data-toggle="tooltip"
                data-placement="top"
                title={message}
            >
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck"
                        disabled
                        data-toggle="tooltip"
                        data-placement="top"
                        title={message}
                    />
                    <label class="custom-control-label" for="customCheck"></label>
                </div>
            </div>
        );
    };

    const getColors = (colorList, key) => {
        let hexCode = "";
        colorList.forEach((item, id) => {
            if (item.id === parseInt(key)) {
                hexCode = renderMultiColor(item);
            }
        });
        return hexCode;
    };

    const getSizeWiseLabel = (size, id) => {
        if (size && size[id]) {
            return size[id];
        }
        return null;
    };

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

    const renderColorWisePrice = (quote) => (
        <div className="category-wise-quantity-table color-wise-table scroll-x-label">
            <table>
                <tr>
                    {quote?.colorWiseBuyerPrice && Object.keys(quote?.colorWiseBuyerPrice).map((key) => (
                        <Tooltip
                            title={<Typography fontSize={22}>{`#${key}`}</Typography>}
                            placement="top"
                            arrow
                            key={key}
                        >
                            <th key={key}>
                               {getColors(quote?.colorWiseSizeQuantityPairList, key)}
                            </th>
                        </Tooltip>
                    ))}
                </tr>
                <tr>
                    {quote?.colorWiseBuyerPrice && Object.values(quote?.colorWiseBuyerPrice)?.map((value, i) => (
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

    const renderSizeWisePrice = (quote) => (
        <div className="category-wise-quantity-table desingwise-table scroll-x-label">
            <table>
                <tr>
                    {quote?.sizeWiseBuyerPrice && Object.keys(quote?.sizeWiseBuyerPrice).map((key, i) => (
                        <th key={i}>
                            <p> {getSizeWiseLabel(quote?.sizeLabelMap, key)}</p>
                        </th>
                    ))}
                </tr>
                <tr>
                    {quote?.sizeWiseBuyerPrice && Object.values(quote?.sizeWiseBuyerPrice).map((value, i) => (
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

    return (
        <div
            className={`quote-list mb-3 p-4 pl-5 d-flex justify-content-between align-items-center ${
                quote.isSelected ? `active` : ``
            }`}
        >
            <div className="select-quote">
                <div className="custom-chekbox">
                    <div className="form-group m-0">
                        <input
                            type="checkbox"
                            id={`check_${quote.id}`}
                            name={`toggleSelect_${quote.id}`}
                            onClick={toggleSelect}
                            value={quote.id}
                            checked={quote.isSelected ? true : false}
                        />
                        {quote.status === "ORDER_PLACED" ? (
                            renderDesignStatus("Order placed for this design")
                        ) : quote.status === "PRODUCT_SOLD" ? (
                            renderDesignStatus("Design is already sold")
                        ) : quote.status !== "PRICE_GIVEN" ? (
                            renderDesignStatus("Price has not been given yet")
                        ) : (
                            <label for={`check_${quote.id}`} className="m-0"></label>
                        )}
                    </div>
                </div>
            </div>

            <div className="quote-info">
                <div className="info-right w-100 d-flex justify-content-between my-quotes-items">
                    <div className="features d-flex flex-md-column">
                        {quote.documentResponseList && quote.documentResponseList.length > 0 ? (
                            quote.documentResponseList.map((doc, i) => {
                                if (doc.docType === "PRODUCT_DESIGN" && flag) {
                                    flag = 0;
                                    return (
                                        <img
                                            key={i}
                                            src={addImageSuffix(doc.docUrl, "_xthumbnail")}
                                            alt="designer"
                                            className="radius-3"
                                        />
                                    );
                                }
                                if (quote.documentResponseList.length == i + 1 && flag) {
                                    return (
                                        <img
                                            key={i}
                                            src={addImageSuffix(
                                                quote.documentResponseList[0].docUrl,
                                                "_xthumbnail"
                                            )}
                                            alt="designer"
                                            className="radius-3"
                                        />
                                    );
                                }
                            })
                        ) : (
                            <img
                                src={require("../../../assets/images/default_product.svg")}
                                alt="designer"
                                className="radius-3"
                            />
                        )}
                    </div>
                    <div className="features d-flex flex-md-column">
                        <div className="info-item mt-1 ellipse-2-line product-title">
                            <Tooltip
                                title={<Typography fontSize={22}>{quote?.name}</Typography>}
                                placement="top"
                                arrow
                            >
                                <Link
                                    to={`/designs/view/${quote.productId}`}
                                    className="font-weight-bold m-0 font-20 ellipse-2-line"
                                >
                                    {quote.name ? getShortName(quote.name, 35) : "N/A"}
                                </Link>
                            </Tooltip>
                            <p className="ref-no font-14 mb-0">{quote?.productReferenceNumber}</p>
                            {quote.collectionName && (
                                <>
                                    <span className="pr-2 font-12 text-muted">in</span>
                                    <a
                                        href="#"
                                        className="text-underline font-14 color-brand"
                                        onClick={() =>
                                            search({
                                                id: quote.collectionId,
                                                name: quote.collectionName,
                                            })
                                        }
                                    >
                                        {quote.collectionName}
                                    </a>
                                </>
                            )}
                        </div>
                        <div className="info-item">
                            <label className="font-14 text-muted">Date</label>
                            <h5 className="font-20 color-333">
                                {changeDateFormat(quote.date, "DD/MM/YYYY", "DD-MM-YYYY")}
                            </h5>
                        </div>
                        <div className="info-item">
                            <label className="font-14 text-muted">Status</label>
                            {rfqProductStatus(quote)}
                        </div>
                    </div>
                    <div className="features d-flex flex-md-column">
                        <div className="info-item mt-2">
                            <label className="font-14 text-muted">Product category</label>
                            <h5 className="font-20 color-333">
                                {quote.productGroup}{" "}
                                {quote.productGroup && quote.productCategory && ","}{" "}
                                {quote.productCategory}
                            </h5>
                        </div>

                        <div className="info-item">
                            <label className="font-14 text-muted">Fabric details</label>
                            <h5 className="font-20 color-333">{quote.fabricComposition}</h5>
                        </div>

                        <div className="info-item">
                            <div className="size delivery-in-days">
                                <label className="font-14 text-muted">Delivery in</label>
                                <h5 className="font-20 color-333">
                                    {quote.deliveryTime ? quote.deliveryTime : "--"} Days
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="features  d-flex flex-md-column">
                        <div className="info-item mt-0 mt-xl-2">
                            <label className="font-14 text-muted">Quantity</label>
                            <h5 className="font-20 color-333 mb-0">
                                {quote.quantity
                                    ? quote.quantity
                                    : quote.quotationQuantity
                                    ? quote.quotationQuantity
                                    : "--"}{" "}
                                units
                                {quote.quantity > 0 && (
                                    <span
                                        className="table-details cursor-pointer"
                                        onClick={() => setShowSizes(true)}
                                    >
                                        Details
                                    </span>
                                )}
                            </h5>

                            {quote.colorWiseSizeQuantityPairList &&
                            quote.colorWiseSizeQuantityPairList.length ? (
                                <div className="info-item d-flex position-relative color-wise-quantity-table">
                                    <div className="sizes d-flex  align-items-center text-center cursor-pointer">
                                        {/* {quote.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map(
                                        (pair, j) => {
                                            return (
                                                <div className="size" key={j}>
                                                    <label className="text-center mb-0">
                                                        {pair.code}
                                                    </label>
                                                </div>
                                            );
                                        }
                                    )} */}
                                    </div>
                                    {showSizes && (
                                        <div className="quantity-table shadow-12dp" ref={colorWiseRef}>
                                            <div className="quantity-heading d-flex justify-content-between">
                                                <h4 className="regular-16">
                                                    Color-size wise quantity
                                                </h4>
                                                <a
                                                    className="cursor-pointer"
                                                    onClick={() => setShowSizes(false)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                                            fill="#6A7181"
                                                        ></path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="style-info">
                                                <p className="mb-0">{quote.name}</p>
                                                <p>{quote.quantity} units</p>
                                            </div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th></th>
                                                        {quote.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map(
                                                            (size, i) => {
                                                                return <th key={i}>{size.code}</th>;
                                                            }
                                                        )}
                                                        {/* <th>Total</th> */}
                                                    </tr>
                                                    {quote?.colorWiseSizeQuantityPairList.map(
                                                        (color, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>
                                                                        {renderMultiColor(color)}
                                                                    </td>
                                                                    {color.sizeQuantityPairList.map(
                                                                        (pair, j) => {
                                                                            return (
                                                                                <td key={j}>
                                                                                    {pair.quantity}
                                                                                </td>
                                                                            );
                                                                        }
                                                                    )}
                                                                    {/* <td><p>{colorTotalCount(i)}</p></td> */}
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {quote.status === "PRICE_GIVEN" ? (
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

                    {/* Size wise table */}

                    {quote.buyerQuotationType === "SIZEWISE" ? (
                        renderSizeWisePrice(quote)
                    ) : quote.buyerQuotationType === "COLORWISE" ? (
                        renderColorWisePrice(quote)
                    ) : quote.buyerQuotationType === "DESIGNWISE" ? (
                        renderDesignWisePrice(quote)
                    ) : (
                        <p className="not-quoted">Price will given within 24 hours</p>
                    )}

                    {/* End New design update */}
                </div>
            ) : quote.status === "PRODUCT_SOLD" ? (
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
            ) : quote.status === "ORDER_PLACED" ? (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        <span className="font-15 valid-till">Price confirmed</span>
                        <p>
                            {capitalizeFirstLetter(quote.buyerQuotationType)} {quote.priceType}{" "}
                            price
                        </p>
                        {/* <br /> */}
                        {quote.buyerQuotationType === "SIZEWISE"
                            ? renderSizeWisePrice(quote)
                            : quote.buyerQuotationType === "COLORWISE"
                            ? renderColorWisePrice(quote)
                            : quote.buyerQuotationType === "DESIGNWISE"
                            ? renderDesignWisePrice(quote)
                            : ""}
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
};
