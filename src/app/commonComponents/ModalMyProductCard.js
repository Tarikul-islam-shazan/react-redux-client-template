import React, { Component } from 'react';
import { addImageSuffix } from '../services/Util';
import {Link} from "react-router-dom";
export const ModalMyProductCard = ({product, index, onChange, buttonAction, buttonTitle}) => {
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
                  <Link to={"/designs/view/" + product.id} href="#"><img src={addImageSuffix(doc.docUrl, '_xthumbnail')} alt="" className="radius-3"/></Link>
              )
            }
            if(product.designDocuments.length==i+1 && flag){
              return(
                <a href="#"><img src={product.designDocuments[0].docUrl} alt="" className="radius-3"/></a>
              )
            }
          })
          :
          <a href="#"><img src={require("../assets/images/default_product.svg")} alt="" className="radius-3"/></a>
        }
            <div className="info-right ml-3">
                <Link to={"/designs/view/" + product.id} className="semibold m-0 mt-1 font-20">{product.name}</Link>
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
                          <span>{product.minimumOrderQuantity}</span>
                          {
                            product.minimumOrderQuantity &&
                            <span> pcs</span>
                          }
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Fabric details</label>
                        <h5 className="font-18 semibold">
                          <span>{product.compositionDetails}</span>
                          {
                            product.compositionDetails && product.gsm && <span>, </span>
                          }
                          <span>{product.gsm}</span>
                          {
                            product.gsm && <span> GSM</span>
                          }
                        </h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Delivery in</label>
                        <h5 className="font-18 semibold">
                          <span>{product.turnAroundTime}</span>
                          {
                            product.turnAroundTime &&
                            <span> Days</span>
                          }
                        </h5>
                    </div>
                </div>
                <button className="btn-border mt-4" onClick={() => buttonAction(product)}>{buttonTitle}</button>
            </div>
        </div>
    </div>
  )
}
