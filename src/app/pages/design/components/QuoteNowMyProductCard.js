import React, { Component } from 'react';
import { addImageSuffix } from '../../../services/Util';
export const QuoteNowMyProductCard = ({product, index, onChange, addToQuote}) => {
  let flag = 1;
  return(
    <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
        <div className="quote-info d-flex justify-content-between w-100">
        {
          product.designDocuments && product.designDocuments.length > 0 ?
          product.designDocuments.map((doc,i) => {
            if(doc.docType=='PRODUCT_DESIGN' && flag){
              flag = 0;
              return (
                <a href="#"><img src={addImageSuffix(doc.docUrl, '_xthumbnail')} alt="" className="radius-3"/></a>
              )
            }
            if(product.designDocuments.length==i+1 && flag){
              return(
                <a href="#"><img src={product.designDocuments[0].docUrl} alt="" className="radius-3"/></a>
              )
            }
          })
          :
          <a href="#"><img src={require("../../../assets/images/default_product.svg")} alt="" className="radius-3"/></a>
        }
            <div className="info-right ml-3">
                <a href="#" className="semibold m-0 mt-1 font-18">{product.name}</a>
                <div className="d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Product category</label>
                        <h5 className="font-16 color-333">{product.productType}, {product.productGroup}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">MOQ</label>
                        <h5 className="font-16 color-333">{product.moq} pcs</h5>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Fabric details</label>
                        <h5 className="font-16 color-333">{product.fabricComposition} {product.fabricWeight} GSM</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Delivery in</label>
                        <h5 className="font-16 color-333">{product.turnAroundTime} Days</h5>
                    </div>
                </div>
                <button className="btn-border mt-4" onClick={() => addToQuote([product.id])}>Add to quote</button>
            </div>
        </div>
    </div>
  )
}
