import React, { useState, useEffect } from "react";
import { addImageSuffix } from "../../../services/Util";
import {fetchGeneralSettingsData} from '../../../actions';

export const QuoteNowMyProductCard = ({ cart, product,index,onChange,addToQuote }) => {
  const [defaultValue, setDefaultValue] = useState({
    TURN_AROUND_TIME: "",
    MOQ: "",
  });

  const fetchData = async () => {
    const params = ['MOQ', 'TURN_AROUND_TIME']
    const data = await fetchGeneralSettingsData(params);
    if (data) {
    setDefaultValue({
        TURN_AROUND_TIME: data["TURN_AROUND_TIME"]
          ? data["TURN_AROUND_TIME"].value
          : "",
        MOQ: data["MOQ"] ? data["MOQ"].value : "",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  let flag = 1;

  return (
    <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
      <div className="quote-info d-flex justify-content-between w-100">
        {product.designDocuments && product.designDocuments.length > 0 ? (
          product.designDocuments.map((doc, i) => {
            if (doc.docType == "PRODUCT_DESIGN" && flag) {
              flag = 0;
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
            if (product.designDocuments.length == i + 1 && flag) {
              return (
                <a href="#">
                  <img
                    src={product.designDocuments[0].docUrl}
                    alt=""
                    className="radius-3"
                  />
                </a>
              );
            }
          })
          )
          :
          <a href="#"><img src={require("../../../assets/images/default_product.svg")} alt="" className="radius-3"/></a>
        }
            <div className="info-right ml-3">
                <a href="#" className="semibold m-0 mt-1 font-20">{product.name}</a>
                <div className="d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Product category</label>
                        <h5 className="font-18 semibold">{product.productType}, {product.productGroup}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">MOQ</label>
                        <h5 className="font-18 semibold">{product.moq? product.moq : defaultValue.MOQ} pcs</h5>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Fabric details</label>
                        <h5 className="font-18 semibold">{product.fabricComposition} {product.fabricWeight} GSM</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Delivery in</label>
                        <h5 className="font-18 semibold">{product.turnAroundTime ? 
                        product.turnAroundTime : defaultValue.TURN_AROUND_TIME} Days</h5>
                    </div>
                </div>
                <button 
                  className="btn-border mt-4" 
                  onClick={() => addToQuote([product.id])}>Add to quote
                </button>
            </div>
          </div>
        </div>
  );
};
