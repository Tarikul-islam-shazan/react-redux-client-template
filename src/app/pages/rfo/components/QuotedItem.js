import React, { Component } from 'react';
import { addImageSuffix, rfqProductStatus } from '../../../services/Util';
import moment from 'moment';

export const QuotedItem = ({quote, index, toggleSelect, search}) => {
  let flag = 1;
  let timeDifference = 0;
  if (quote.status !== 'PRICE_GIVEN') {
    let a = moment(quote.date + ' ' + quote.time, 'DD/MM/YYYY HH:mm A');
    let b = moment();
    timeDifference = 24 - b.diff(a, 'hours');
  }

  return(
    <div className={`quote-list mb-3 p-4 pl-5 d-flex justify-content-between align-items-center ${quote.isSelected ? `active` : ``}`}>

        <div className="select-quote">
            <div className="custom-chekbox">
                <div className="form-group m-0">
                    <input type="checkbox" id="check" name={`toggleSelect_${index}`} onClick={toggleSelect} value={index} checked={quote.isSelected ? true : false}/>
                    <label for="check" className="m-0"></label>
                </div>
            </div>
        </div>

        <div className="quote-info">
            <div className="info-right w-100 d-flex justify-content-between">
                <div className="features d-flex flex-md-column">
                {
                  quote.documentResponseList.length > 0 ?
                  quote.documentResponseList.map((doc,i) => {
                    if(doc.docType=='PRODUCT_DESIGN' && flag){
                      flag = 0;
                      return (
                        <img key={i} src={addImageSuffix(doc.docUrl, '_xthumbnail')} alt="designer" className="radius-3"/>
                      )
                    }
                    if(quote.documentResponseList.length==i+1 && flag){
                      return(
                        <img key={i} src={addImageSuffix(quote.documentResponseList[0].docUrl, '_xthumbnail')} alt="designer" className="radius-3"/>
                      )
                    }
                  })
                  :
                  <img src={require("../../../assets/images/default_product.svg")} alt="designer" className="radius-3"/>
                }
                </div>
                <div className="features d-flex flex-md-column">
                    <div className="info-item mt-1 ellipse-2-line product-title">
                        <a href="#" className="font-weight-bold m-0 font-24 ellipse-2-line">{quote.name}</a>
                        <a href="#" className="text-underline" onClick={() => search({id: quote.collectionId, name: quote.collectionName})}>{quote.collectionName}</a>
                    </div>
                    <div className="info-item">
                        <label className="font-16 text-muted">Date</label>
                        <h5 className="font-20 color-333">{quote.date}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-16 text-muted">Status</label>
                        {rfqProductStatus(quote)}
                    </div>
                </div>
                <div className="features d-flex flex-md-column">
                    <div className="info-item mt-2">
                        <label className="font-16 text-muted">Product category</label>
                        <h5 className="font-20 color-333">{quote.productCategory}, {quote.productGroup}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-16 text-muted">Color</label>
                        <div className="color-picker">
                            <ul>
                            {
                              quote.colors.map((color, i) => {
                                return(
                                  <li className="d-flex align-items-center" key={i}>
                                      <span style={{background: color.hexCode}}></span>
                                      <div className="font-20 color-333 ml-2">{color.name}</div>
                                  </li>
                                )
                              })
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="info-item">
                        <label className="font-16 text-muted">Fabric details</label>
                        <h5 className="font-20 color-333">
                        {/*'Cotton'*/}
                        <span className="brand-color ml-3">{quote.fabricComposition}</span></h5>
                    </div>
                </div>
                <div className="features d-flex flex-md-column">
                    <div className="info-item mt-2">
                        <label className="font-16 text-muted">Quantity</label>
                        <h5 className="font-20 color-333">{quote.quantity ? quote.quantity : '--'} pcs</h5>
                    </div>

                    <div className="info-item pr-2 d-flex">
                    {
                      quote.sizeQuantityPairList.map((pair, i) => (
                      <div className="mr-3" key={i}>
                          <label className="font-16 text-muted">{pair.code}</label>
                          <h5 className="font-20 color-333">{pair.quantity}</h5>
                      </div>))
                    }
                    </div>

                    <div className="info-item">
                        <div className="size delivery-in-days">
                            <label>Delivery in</label>
                            <h5 className="font-20 color-333">{quote.deliveryTime ? quote.deliveryTime : '--'} Days</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
            {
              quote.status !== 'PRICE_GIVEN' ?
              <span className="font-16">
                  Price will be updated <br/>
                  within <span className="font-italic font-weight-bold">{timeDifference > 0 ? timeDifference : 0} hours</span>
              </span> :
              <span className="font-16">
                  Price will be valid till <span className="font-italic font-weight-bold">{quote.priceValidUpto}</span>
              </span>
            }

                <div className="pricewillbeupdated pt-2 pb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="211" height="54" viewBox="0 0 211 54">
                        <g id="Group_11081" data-name="Group 11081" transform="translate(-1549 -407)">
                            <g id="Rectangle_6056" data-name="Rectangle 6056" transform="translate(1549 407)" fill="#f4f5f7">
                                <path d="M 204 53.5 L 7 53.5 C 3.415894746780396 53.5 0.5 50.5841064453125 0.5 47 L 0.5 7 C 0.5 3.415894746780396 3.415894746780396 0.5 7 0.5 L 204 0.5 C 207.5841064453125 0.5 210.5 3.415894746780396 210.5 7 L 210.5 47 C 210.5 50.5841064453125 207.5841064453125 53.5 204 53.5 Z" stroke="none"/>
                                <path d="M 7 1 C 3.69158935546875 1 1 3.691581726074219 1 7 L 1 47 C 1 50.30841827392578 3.69158935546875 53 7 53 L 204 53 C 207.3084106445313 53 210 50.30841827392578 210 47 L 210 7 C 210 3.691581726074219 207.3084106445313 1 204 1 L 7 1 M 7 0 L 204 0 C 207.8659973144531 0 211 3.133998870849609 211 7 L 211 47 C 211 50.86600112915039 207.8659973144531 54 204 54 L 7 54 C 3.134002685546875 54 0 50.86600112915039 0 47 L 0 7 C 0 3.133998870849609 3.134002685546875 0 7 0 Z" stroke="none" fill="#edeff4"/>
                            </g>
                            <text id="_-----------" data-name="-----------" transform="translate(1604 441)" fill="#aaacaf" font-size="20" font-family="OpenSans, Open Sans" letter-spacing="0.03em"><tspan x="0" y="0">{quote.price ? quote.price : `—————`}</tspan></text>
                        </g>
                    </svg>
                </div>
                <div className="position-relative">
                    <button className="m-0 btn-brand m-0 shadow float-right">Discuss</button>
                    <div className="option">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
                                    <g id="Group_10" data-name="Group 10" transform="translate(1243 -4045)">
                                        <path id="Path_27893" data-name="Path 27893" d="M22.5,19.5a3,3,0,1,1-3-3A3,3,0,0,1,22.5,19.5Z" transform="translate(-1259.5 4039)" fill="#21242b"/>
                                        <path id="Path_27894" data-name="Path 27894" d="M22.5,9a3,3,0,1,1-3-3A3,3,0,0,1,22.5,9Z" transform="translate(-1259.5 4039)" fill="#21242b"/>
                                        <path id="Path_27895" data-name="Path 27895" d="M22.5,30a3,3,0,1,1-3-3A3,3,0,0,1,22.5,30Z" transform="translate(-1259.5 4039)" fill="#21242b"/>
                                    </g>
                                </svg>
                            <ul className="dropdown-menu dropdown-menu-right shadow-lg" role="menu" aria-labelledby="menu1">
                                <li role="presentation"  className="px-4 pb-3 pt-3"><a role="menuitem" tabindex="-1" href="#" className="font-weight-normal  text-black">Discuss</a></li>
                                <li role="presentation"  className="px-4 pb-3"><a role="menuitem" tabindex="-1" href="#" className="font-weight-normal  text-black">Remove</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
