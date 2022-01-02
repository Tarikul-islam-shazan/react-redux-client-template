import React from "react";
import { addImageSuffix, validateNumber } from "../../../services/Util";

export const OrderItem = ({
    product,
    remove,
    onUpdateColorSize,
    onUpdateSizeQuantity,
    onUpdateDesignQuantity,
    renderSizeWiseTotalPrice,
    renderColorWiseTotalPrice,
    renderDesignWiseTotalPrice,
    designIndex,
    renderDesignWiseTotalQuantity,
    renderSizeWiseTotalQuantity,
    renderColorWiseTotalQuantity,
    errorId,
}) => {
    let flag = 1;
    const getColorWisePrice = (colorWisePrices, id) => {
        if (colorWisePrices && colorWisePrices[id]) {
            return colorWisePrices[id];
        }
        return null;
    };

    const getSizeWisePrice = (sizePrices, id) => {
        if (sizePrices && sizePrices[id]) {
            return sizePrices[id];
        }
        return null;
    };

    const getSizeWiseLabel = (size, id) => {
        if (size && size[id]) {
            return size[id];
        }
        return null;
    };

    const getQuotationQuantity = (product) => {
        return product.quotationQuantity || product.quantity || 0;
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

    return (
        <div className="quote-req-list-container mt-3">
            <div className="quote-list mb-3 p-4 d-flex justify-content-between align-items-center">
                <div className="dlt">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        onClick={() => remove(product.id)}
                    >
                        <g
                            id="Group_11204"
                            data-name="Group 11204"
                            transform="translate(-1233 -282)"
                        >
                            <rect
                                id="Rectangle_6032"
                                data-name="Rectangle 6032"
                                width="32"
                                height="32"
                                rx="4"
                                transform="translate(1265 282) rotate(90)"
                                fill="rgba(253,39,39,0.05)"
                            />
                            <g id="delete" transform="translate(1242.358 289.001)">
                                <path
                                    id="Path_27867"
                                    data-name="Path 27867"
                                    d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0"
                                    transform="translate(-213.682 -148.639)"
                                    fill="#fd2727"
                                />
                                <path
                                    id="Path_27868"
                                    data-name="Path 27868"
                                    d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0"
                                    transform="translate(-100.308 -148.639)"
                                    fill="#fd2727"
                                />
                                <path
                                    id="Path_27869"
                                    data-name="Path 27869"
                                    d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0"
                                    transform="translate(0 0)"
                                    fill="#fd2727"
                                />
                                <path
                                    id="Path_27870"
                                    data-name="Path 27870"
                                    d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0"
                                    transform="translate(-156.995 -148.639)"
                                    fill="#fd2727"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="quote-info">
                    <div className="info-right w-100 d-flex justify-content-between">
                        <div className="features d-flex flex-md-column">
                            {product.documentResponseList.length > 0 ? (
                                product.documentResponseList.map((doc, i) => {
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
                                    if (product.documentResponseList.length == i + 1 && flag) {
                                        return (
                                            <img
                                                key={i}
                                                src={addImageSuffix(
                                                    product.documentResponseList[0].docUrl,
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
                                <a href="#" className="font-weight-bold m-0 font-20 ellipse-2-line">
                                    {product.name}
                                </a>
                                <span className="cat">
                                    {product.productCategory
                                        ? product.productCategory + ", "
                                        : "Product Group"}
                                    {product.productGroup}
                                </span>
                            </div>
                            <div className="info-item">
                                <label className="font-14 text-muted">Fabric details</label>
                                <h5 className="font-18 semibold">{product.fabricComposition}</h5>
                            </div>
                        </div>

                        <div className="features position-relative d-flex flex-md-column">
                            <div className="info-item mt-0 mt-xl-2">
                                <label className="font-14 text-muted">Quoted quantity</label>
                                <h5 className="font-20 color-333">
                                    {product.quotationQuantity || product.quantity || "--"} units
                                </h5>
                            </div>
                            {product.buyerQuotationType === "DESIGNWISE" && (
                                <div className="new-quantity">
                                    <label>Order quantity</label>
                                    <input
                                        type="number"
                                        placeholder="Unit"
                                        onKeyPress={validateNumber}
                                        onChange={(e) =>
                                            onUpdateDesignQuantity(
                                                product.id,
                                                product.designWiseBuyerPrice,
                                                e.target.value,
                                                designIndex
                                            )
                                        }
                                    />
                                    {renderDesignWiseTotalQuantity(product.id) <
                                        getQuotationQuantity(product) && (
                                        <p className="quote-warning">
                                            <img src="../icons/alert-triangle.svg" /> Price may
                                            change as order qty {"<"} quoted qty{" "}
                                        </p>
                                    )}
                                    {errorId === product.id && (
                                        <p className="error">Atleast one quantity is required</p>
                                    )}
                                </div>
                            )}

                            {product.buyerQuotationType === "COLORWISE" && (
                                <div className="info-item d-flex align-items-start mt-2">
                                    <div className="category-wise-quantity-table color-wise-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    {Object.keys(product?.colorWiseBuyerPrice).map(
                                                        (key) => (
                                                            <th key={key}>
                                                                <span
                                                                    className="cursor-pointer color-icon"
                                                                    style={{
                                                                        background: `${getColors(
                                                                            product?.colorWiseSizeQuantityPairList,
                                                                            key
                                                                        )}`,
                                                                    }}
                                                                />
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                                <tr>
                                                    {Object.values(
                                                        product?.colorWiseBuyerPrice
                                                    ).map((value, i) => (
                                                        <td key={i}>
                                                            <p>
                                                                <span>${value}</span>
                                                            </p>
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    {Object.keys(product?.colorWiseBuyerPrice).map(
                                                        (value, index) => (
                                                            <td key={value}>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Qty"
                                                                    onKeyPress={validateNumber}
                                                                    onChange={(e) =>
                                                                        onUpdateColorSize(
                                                                            product.id,
                                                                            value,
                                                                            getColorWisePrice(
                                                                                product?.colorWiseBuyerPrice,
                                                                                value
                                                                            ),
                                                                            e.target.value,
                                                                            designIndex
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                        {renderColorWiseTotalQuantity(product.id) <
                                            getQuotationQuantity(product) && (
                                            <p className="quote-warning">
                                                <img src="../icons/alert-triangle.svg" /> Price may
                                                change as order qty {"<"} quoted qty{" "}
                                            </p>
                                        )}
                                        {errorId === product.id && (
                                            <p className="error">
                                                Atleast one quantity is required
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {product.buyerQuotationType === "SIZEWISE" && (
                                <div className="info-item d-flex align-items-start mt-2">
                                    <div className="category-wise-quantity-table color-wise-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    {Object.keys(product?.sizeWiseBuyerPrice).map(
                                                        (key) => (
                                                            <th key={key}>
                                                                <p>
                                                                    {getSizeWiseLabel(
                                                                        product?.sizeLabelMap,
                                                                        key
                                                                    )}
                                                                </p>
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                                <tr>
                                                    {Object.values(product?.sizeWiseBuyerPrice).map(
                                                        (value, i) => (
                                                            <td key={i}>
                                                                <p>
                                                                    <span>${value}</span>
                                                                </p>
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                                <tr>
                                                    {Object.keys(product?.sizeWiseBuyerPrice).map(
                                                        (value, i) => (
                                                            <td key={i}>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Qty"
                                                                    onKeyPress={validateNumber}
                                                                    onChange={(e) =>
                                                                        onUpdateSizeQuantity(
                                                                            product.id,
                                                                            value,
                                                                            getSizeWisePrice(
                                                                                product?.sizeWiseBuyerPrice,
                                                                                value
                                                                            ),
                                                                            e.target.value,
                                                                            designIndex
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                        {renderSizeWiseTotalQuantity(product.id) <
                                            getQuotationQuantity(product) && (
                                            <p className="quote-warning">
                                                <img src="../icons/alert-triangle.svg" /> Price may
                                                change as order qty {"<"} quoted qty{" "}
                                            </p>
                                        )}
                                        {errorId === product.id && (
                                            <p className="error">
                                                Atleast one quantity is required
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="features d-flex flex-md-column">
                            {product.buyerQuotationType === "DESIGNWISE" && (
                                <div className="info-item mt-2">
                                    <label className="">(Per Piece)</label>
                                    <h5 className="font-18 semibold">
                                        ${product.designWiseBuyerPrice}
                                    </h5>
                                </div>
                            )}
                            <div className="info-item">
                                <label className="">Total price</label>
                                <h5 className="font-18 semibold">
                                    {product.buyerQuotationType === "SIZEWISE"
                                        ? renderSizeWiseTotalPrice(product.id)
                                        : product.buyerQuotationType === "COLORWISE"
                                        ? renderColorWiseTotalPrice(product.id)
                                        : product.buyerQuotationType === "DESIGNWISE"
                                        ? renderDesignWiseTotalPrice(product.id)
                                        : ""}
                                    {/* ${product.designWiseBuyerPrice * product.quantity} */}
                                </h5>
                            </div>

                            {product.buyerQuotationType !== "DESIGNWISE" && (
                                <div className="info-item">
                                    <label className="">Total quantity</label>
                                    <h5 className="font-18 semibold">
                                        {product.buyerQuotationType === "SIZEWISE"
                                            ? renderSizeWiseTotalQuantity(product.id)
                                            : product.buyerQuotationType === "COLORWISE"
                                            ? renderColorWiseTotalQuantity(product.id)
                                            : ""}
                                        {/* ${product.designWiseBuyerPrice * product.quantity} */}
                                    </h5>
                                </div>
                            )}
                            {/* {errorId === product.id && (
                                  <p className="error">Atleast one quantity is required</p>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
