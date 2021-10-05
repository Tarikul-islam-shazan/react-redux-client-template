import React, { useState } from "react";
import {
    addImageSuffix,
    rfqProductStatus,
    convertTimeToLocal,
    changeDateFormat,
} from "../../../services/Util";
import moment from "moment";
import { Link } from "react-router-dom";

export const QuotedItem = ({ quote, index, toggleSelect, search }) => {
    const [showSizes, setShowSizes] = useState(false);
    let flag = 1;
    let timeDifference = 0;

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

    const onDiscuss = () => {
        document
            .getElementsByClassName(
                "IconLauncher__BaseLauncher-m649nu-0 IconLauncher__CircleLauncher-m649nu-2 eFiccJ reagan--widget-loaded undefined"
            )[0]
            .click();
    };

    const renderTooltip = (message) => {
        return (
            <svg
                className="ml-2 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                title={message}
                data-toggle="tooltip"
                data-placement="top"
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

    const renderPriceUpdateBox = (quote) => {
        return (
            <div className="pricewillbeupdated pt-2 pb-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="211"
                    height="54"
                    viewBox="0 0 211 54"
                >
                    <g id="Group_11081" data-name="Group 11081" transform="translate(-1549 -407)">
                        <g
                            id="Rectangle_6056"
                            data-name="Rectangle 6056"
                            transform="translate(1549 407)"
                            fill="#f4f5f7"
                        >
                            <path
                                d="M 204 53.5 L 7 53.5 C 3.415894746780396 53.5 0.5 50.5841064453125 0.5 47 L 0.5 7 C 0.5 3.415894746780396 3.415894746780396 0.5 7 0.5 L 204 0.5 C 207.5841064453125 0.5 210.5 3.415894746780396 210.5 7 L 210.5 47 C 210.5 50.5841064453125 207.5841064453125 53.5 204 53.5 Z"
                                stroke="none"
                            />
                            <path
                                d="M 7 1 C 3.69158935546875 1 1 3.691581726074219 1 7 L 1 47 C 1 50.30841827392578 3.69158935546875 53 7 53 L 204 53 C 207.3084106445313 53 210 50.30841827392578 210 47 L 210 7 C 210 3.691581726074219 207.3084106445313 1 204 1 L 7 1 M 7 0 L 204 0 C 207.8659973144531 0 211 3.133998870849609 211 7 L 211 47 C 211 50.86600112915039 207.8659973144531 54 204 54 L 7 54 C 3.134002685546875 54 0 50.86600112915039 0 47 L 0 7 C 0 3.133998870849609 3.134002685546875 0 7 0 Z"
                                stroke="none"
                                fill="#edeff4"
                            />
                        </g>
                        <text
                            id="_-----------"
                            data-name="-----------"
                            transform="translate(1604 441)"
                            fill="#aaacaf"
                            font-size="20"
                            font-family="OpenSans, Open Sans"
                            letter-spacing="0.03em"
                        >
                            <tspan x="0" y="0">
                                {quote.price ? quote.price : `—————`}
                            </tspan>
                        </text>
                    </g>
                </svg>
            </div>
        );
    };
    const renderDisscussButton = () => {
        return (
            <div className="position-relative">
                <button
                    onClick={onDiscuss}
                    className="m-0 btn-brand m-0 shadow float-right semibold border-orrange"
                >
                    Discuss
                </button>
            </div>
        );
    };

    console.log("DGGGGGGGGGGGGG===", quote);

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
                                if (doc.docType == "PRODUCT_DESIGN" && flag) {
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
                            <Link
                                to={`/designs/view/${quote.productId}`}
                                className="font-weight-bold m-0 font-20 ellipse-2-line"
                            >
                                {quote.name ? quote.name : "N/A"}
                            </Link>

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
                                {quote.productGroup}, {quote.productCategory}
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
                    <div className="features position-relative d-flex flex-md-column">
                        <div className="info-item mt-0 mt-xl-2">
                            <label className="font-14 text-muted">Quantity</label>
                            <h5 className="font-20 color-333">
                                {quote.quantity ? quote.quantity : "--"} units
                            </h5>
                        </div>

                        {quote.colorWiseSizeQuantityPairList &&
                        quote.colorWiseSizeQuantityPairList.length ? (
                            <div className="info-item d-flex">
                                <div className="size">
                                    <label className="text-center mb-0">
                                        <span className="circle-color mr-3 opacity-0"></span>
                                    </label>
                                </div>
                                <div
                                    className="sizes d-flex  align-items-center text-center"
                                    onClick={() => setShowSizes(true)}
                                >
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
                                    Details
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        {showSizes && (
                            <div className="quantity-table shadow-12dp">
                                <div className="quantity-heading d-flex justify-content-between">
                                    <h4 className="regular-16">Colorwise sizewise quantity</h4>
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
                                <div className="style-info pb-3">
                                    <p>{quote.name}</p>
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
                                        {quote?.colorWiseSizeQuantityPairList.map((color, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <span
                                                            className="color"
                                                            style={{
                                                                background: `${color.hexCode} none repeat scroll 0% 0%`,
                                                            }}
                                                        ></span>
                                                    </td>
                                                    {color.sizeQuantityPairList.map((pair, j) => {
                                                        return <td key={j}>{pair.quantity}</td>;
                                                    })}
                                                    {/* <td><p>{colorTotalCount(i)}</p></td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* {
                quote.colorWiseSizeQuantityPairList.map((color, i) => {
                  return (
                    <div className="info-item d-flex align-items-start mt-2" key={i}>
                      <div className="sizes d-flex  align-items-center">
                        <span
                          className="circle-color mr-3"
                          style={{background: color.hexCode}}
                          data-placement="top"
                          data-toggle="tooltip"
                          data-original-title={color.name}>
                        </span>
                        {
                          color.sizeQuantityPairList.map((pair, j) => {
                            return (
                              <div className="size" key={j}>
                                <input
                                  style={{ background: '#fff' }}
                                  type="text"
                                  placeholder="00"
                                  value={pair.quantity}
                                  readOnly={true} />
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              } */}
                    </div>
                </div>
            </div>
            {quote.status === "PRICE_GIVEN" ? (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        <span className="font-15 valid-till">
                            Price valid till{" "}
                            <span className="font-weight-bold">
                                {" "}
                                {getValidDateTill(quote.date, quote.time)}
                            </span>{" "}
                        </span>
                        <div className="pricewillbeupdated pt-2 pb-3">
                            <div>
                                <strong className="font-30">
                                    ${quote.price ? quote.price : `—————`}
                                </strong>
                                <br />
                                <span className="cursor-pointer font-14">
                                    /Unit
                                    {renderTooltip(quote.priceInfoText)}
                                </span>
                            </div>
                        </div>
                        {renderDisscussButton()}
                    </div>
                </div>
            ) : quote.status === "PRODUCT_SOLD" ? (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        {!quote.price ? (
                            <span className="font-14">
                                Price will be updated
                                <br />
                                within{" "}
                                <span className="font-italic font-weight-bold">
                                    {timeDifference > 0 ? timeDifference : 0} hours
                                </span>
                                {renderPriceUpdateBox(quote)}
                                {renderDisscussButton()}
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
                                            ${quote.price ? quote.price : `—————`}
                                        </strong>
                                        <br />
                                        <span className="cursor-pointer font-14">
                                            /Unit
                                            {renderTooltip(quote.priceInfoText)}
                                        </span>
                                    </div>
                                </div>
                                {renderDisscussButton()}
                            </div>
                        )}
                    </div>
                </div>
            ) : quote.status === "ORDER_PLACED" ? (
                <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                        <span className="font-15 valid-till">Price confirmed</span>
                        <br />
                        <strong className="font-30">${quote.price}</strong>
                        <br />
                        <span className="cursor-pointer font-14">
                            /Unit
                            {renderTooltip(quote.priceInfoText)}
                        </span>
                        <div className="pt-3">{renderDisscussButton()}</div>
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
                        {renderPriceUpdateBox(quote)}
                        {renderDisscussButton()}
                    </div>
                </div>
            )}
        </div>
    );
};
