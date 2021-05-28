import React from 'react';
import {addImageSuffix, rfqProductStatus, convertTimeToLocal, changeDateFormat} from '../../../services/Util';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const QuotedItem = ({quote, index, toggleSelect, search}) => {
  
  let flag = 1;
  let timeDifference = 0;
  
  if (quote.status !== 'PRICE_GIVEN') {
    let formattedQuoteDate = convertTimeToLocal(quote.date, quote.time, 'DD/MM/YYYY hh:mm A');
    formattedQuoteDate = moment(formattedQuoteDate, 'DD/MM/YYYY hh:mm A');
    const currentDate = moment().format('DD/MM/YYYY hh:mm A');
    const formattedCurrentDate = moment(currentDate, 'DD/MM/YYYY hh:mm A');
    timeDifference = 24 - formattedCurrentDate.diff(formattedQuoteDate, 'hours');
  }

  const getValidDateTill = (date, time) => {
    let formattedDate = convertTimeToLocal(date, time, 'MMM D, YYYY hh:mm A');
    formattedDate = moment(formattedDate);
    return formattedDate.add(1, 'months').format('MMM D, YYYY');
  }

  const onDiscuss = () => {
    document.getElementsByClassName('IconLauncher__BaseLauncher-m649nu-0 IconLauncher__CircleLauncher-m649nu-2 eFiccJ reagan--widget-loaded undefined')[0].click()
  }

  const renderTooltip = (message) => {
      return(
          <svg className="ml-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" title={message} data-toggle="tooltip" data-placement="top">
          <g id="Group_13" data-name="Group 13" transform="translate(1445 -3504)">
            <circle id="Ellipse_1" data-name="Ellipse 1" cx="7" cy="7" r="7" transform="translate(-1445 3506)" fill="#ddd"/>
            <text id="Price_will_be_updated_within_24_hours" data-name="Price will be updated within 24 hours" transform="translate(-1438 3516)" fill="#21242b" font-size="11" font-family="SegoeUI, Segoe UI"><tspan x="-1.332" y="0">i</tspan></text>
          </g>
        </svg>
      )
  }

  const renderPriceUpdateBox = (quote) => {
    return(
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
    )
  } 
const renderDisscussButton = () => {
  return (
    <div className="position-relative">
      <button 
        onClick={onDiscuss} 
        className="m-0 btn-brand m-0 shadow float-right">Discuss
      </button>
    </div>
  )
}

  return(
    <div className={`quote-list mb-3 p-4 pl-5 d-flex justify-content-between align-items-center ${quote.isSelected ? `active` : ``}`}>
        <div className="select-quote">
            <div className="custom-chekbox">
                <div className="form-group m-0">
                    <input type="checkbox" id={`check_${quote.id}`} name={`toggleSelect_${quote.id}`} onClick={toggleSelect} value={quote.id} checked={quote.isSelected ? true : false}/>
                    { quote.status ===  "ORDER_PLACED" ? 
                        renderTooltip("Order placed for this design") :
                      quote.status ===  "PRODUCT_SOLD" ?
                        renderTooltip("Design is already sold") :
                      <label for={`check_${quote.id}`} className="m-0"></label>
                    }
                    
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
                        <Link
                            to={`/designs/view/${quote.productId}`}
                            className="font-weight-bold m-0 font-20 ellipse-2-line">
                            {quote.name ? quote.name : 'N/A'}
                        </Link>

                        { quote.collectionName &&
                            <>
                              <span className="pr-2 font-12">in</span>
                                <Link 
                                    className="text-underline font-16 color-brand" 
                                    onClick={() => search({id: quote.collectionId, name: quote.collectionName})}>{quote.collectionName}
                                </Link>
                            </>
                        }
              <div>
                <span className="pr-2 font-12">by</span>
                <span className="font-14">{quote.clientName}</span>
              </div>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Date</label>
                        <h5 className="color-333">{changeDateFormat(quote.date, "DD/MM/YYYY", "DD-MM-YYYY")}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Status</label>
                        {rfqProductStatus(quote)}
                    </div>
                </div>
                <div className="features d-flex flex-md-column">
                    <div className="info-item mt-2">
                        <label className="font-14 text-muted">Product category</label>
                        <h5 className="color-333">{quote.productCategory}, {quote.productGroup}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Color</label>
                        <div className="color-picker">
                            <ul>
                            {
                              quote.colorWiseSizeQuantityPairList.map((color, i) => {
                                return(
                                  <li className="d-flex align-items-center" key={i}>
                                      <span
                                        className="circle-color mr-3"
                                        style={{background: color.hexCode}}
                                        data-placement="top"
                                        data-toggle="tooltip"
                                        data-original-title={color.name}>
                                      </span>
                                      <div className="font-20 color-333 ml-2">{color.name}</div>
                                  </li>
                                )
                              })
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Fabric details</label>
                        <h5 className="color-333">
                        <span>{quote.fabricComposition}</span></h5>
                    </div>
                </div>
                <div className="features d-flex flex-md-column">
                    <div className="info-item mt-2">
                        <label className="font-14 text-muted">Quantity</label>
                        <h5 className="color-333">{quote.quantity ? quote.quantity : '--'} pcs</h5>
                    </div>

                    <div className="info-item pr-2 d-flex flex-column">
                        <table className="text-center p-size-table">
                            <thead>
                            {
                              quote.colorWiseSizeQuantityPairList.length ? quote.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map((pair, j) => {
                                  return(
                                    <th>{pair.code}</th>
                                  )
                                }) :
                                <>
                                  <th>XS</th>
                                  <th>S</th>
                                  <th>M</th>
                                  <th>L</th>
                                  <th>XL</th>
                                </>
                              }
                            </thead>
                            <tbody className="text-center">
                                {
                                  quote.colorWiseSizeQuantityPairList.map((colorWithSize, i) => {
                                    return(
                                      <tr>
                                      {
                                        colorWithSize.sizeQuantityPairList.map((pair, j) => {
                                          return(
                                            <td>{pair.quantity}</td>
                                          )
                                        })
                                      }
                                      </tr>
                                    )
                                  })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="info-item">
                        <div className="size delivery-in-days">
                            <label className="font-14 text-muted">Delivery in</label>
                            <h5 className="color-333">{quote.deliveryTime ? quote.deliveryTime : '--'} Days</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
          quote.status === 'PRICE_GIVEN' ?
            <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                  <span className="font-15 valid-till">Price valid till <span className="font-weight-bold"> {getValidDateTill(quote.date, quote.time)}</span> </span>
                  <div className="pricewillbeupdated pt-2 pb-3">
                      <div>
                          <strong className="font-30">
                              ${quote.price ? quote.price : `—————`}
                          </strong>
                          <br/>
                          <span className="cursor-pointer font-14">
                          /Piece
                          {renderTooltip(quote.priceInfoText)}
                          </span>
                      </div>
                  </div>
                  {renderDisscussButton()}
              </div>
          </div> :
          quote.status === 'PRODUCT_SOLD' ? 
            <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
            { !quote.price?
                  <span className="font-14">Price will be updated 
                  <br/>within <span className="font-italic font-weight-bold">{timeDifference > 0 ? timeDifference : 0} hours</span>
                    {renderPriceUpdateBox(quote)}
                    {renderDisscussButton()}
                  </span> :
                  <div className="text-center">
                  <span className="font-15 valid-till">Price valid till <span className="font-weight-bold"> 
                      {getValidDateTill(quote.date, quote.time)}
                    </span> 
                  </span>
                  <div className="pricewillbeupdated pt-2 pb-3">
                      <div>
                          <strong className="font-30">
                              ${quote.price ? quote.price : `—————`}
                          </strong>
                          <br/>
                          <span className="cursor-pointer font-14">
                          /Piece
                          {renderTooltip(quote.priceInfoText)}
                          </span>
                      </div>
                  </div>
                  {renderDisscussButton()}
              </div>
            }
          </div>
      </div> :
          quote.status === 'ORDER_PLACED' ? 
          <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
            <span className="font-15 valid-till">Price confirmed</span>
            <br/>
                <strong className="font-30">${quote.price}</strong>
                <br/>
                <span className="cursor-pointer font-14">
                /Piece
                  {renderTooltip(quote.priceInfoText)}
                </span>
                <div className="pt-3">{renderDisscussButton()}</div>
            </div>
          </div>   :
          <div className="quote-price admin-quote-price d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                {
                  quote.status !== 'PRICE_GIVEN' ?
                      <span className="font-14">
                          Price will be updated <br/>
                          within <span className="font-italic font-weight-bold">{timeDifference > 0 ? timeDifference : 0} hours</span>
                      </span> :
                      <span className="font-16">
                          Price will be valid till <span className="font-italic font-weight-bold">{getValidDateTill(quote.date, quote.time)}</span>
                      </span>
               }
                  {renderPriceUpdateBox(quote)}
                  {renderDisscussButton()}
              </div>
          </div>
        }
    </div>
  )
}