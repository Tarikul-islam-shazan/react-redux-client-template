import React from "react";
import {addImageSuffix, getShortName} from "../../../services/Util";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "react-router-dom/es/Link";

export const QuoteNowMyProductCard = ({
    product,
    index,
    onChange,
    addToQuote,
    defaultTurnAroundTime,
    defaultMoq,
}) => {
    let flag = 1;

    return (
        <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
            <div className="quote-info d-flex justify-content-between w-100">
                {product.designDocuments && product.designDocuments.length > 0 ? (
                    product.designDocuments.map((doc, i) => {
                        if (doc.docType == "PRODUCT_DESIGN" && flag) {
                            flag = 0;
                            return (
                                <Link to={"/designs/view/" + product.id}>
                                    <img
                                        src={addImageSuffix(doc.docUrl, "_xthumbnail")}
                                        alt=""
                                        className="radius-3"
                                    />
                                </Link>
                            );
                        }
                        if (product.designDocuments.length == i + 1 && flag) {
                            return (
                                <a href="#">
                                    <img
                                        src={addImageSuffix(doc.docUrl, "_xthumbnail")}
                                        alt=""
                                        className="radius-3"
                                    />
                                </a>
                            );
                        }
                    })
                ) : (
                    <a href="#">
                        <img
                            src={require("../../../assets/images/default_product.svg")}
                            alt=""
                            className="radius-3"
                        />
                    </a>
                )}
                <div className="info-right ml-3">
                    <Tooltip
                        title={product.name}
                        placement="top"
                        arrow
                    >
                    <Link to={"/designs/view/" + product.id} className="semibold m-0 mt-1 font-20">
                        {getShortName(product.name,21)}
                    </Link>
                    </Tooltip>
                    <div className="d-flex flex-column flex-sm-row">
                        <div className="info-item mr-5">
                            <label className="font-14 text-muted">Product category</label>
                            <h5 className="font-18 semibold">
                                <span>{product.productGroup}</span>
                                {
                                    product.productGroup && product.category && <span>, </span>
                                }
                                <span>{product.category}</span>
                            </h5>
                        </div>
                        <div className="info-item">
                            <label className="font-14 text-muted">MOQ</label>
                            <h5 className="font-18 semibold">
                                {product.minimumOrderQuantity
                                    ? product.minimumOrderQuantity
                                    : defaultMoq}{" "}
                                pcs
                            </h5>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-sm-row">
                        <div className="info-item mr-5">
                            <label className="font-14 text-muted">Fabric details</label>
                            <h5 className="font-18 semibold">{product.fabricDetails}</h5>
                        </div>
                        <div className="info-item">
                            <label className="font-14 text-muted">Delivery in</label>
                            <h5 className="font-18 semibold">
                                {product.turnAroundTime
                                    ? product.turnAroundTime
                                    : defaultTurnAroundTime}{" "}
                                Days
                            </h5>
                        </div>
                    </div>
                    <button className="btn-border mt-4" onClick={() => addToQuote([product.id])}>
                        Add to quote
                    </button>
                </div>
            </div>
        </div>
    );
};
