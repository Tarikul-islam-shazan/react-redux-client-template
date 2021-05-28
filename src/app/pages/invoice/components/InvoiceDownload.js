import React, { useEffect } from 'react';
import { invoiceStatus, changeDateFormat } from '../../../services/Util';

function InvoiceDownload ({invoiceData}) {
    const toAddress = invoiceData?.toAddress ? invoiceData.toAddress.address : {};
    const fromAddress = invoiceData?.fromAddress ? invoiceData.fromAddress : {};

      useEffect(() => {
        if(invoiceData){
          window.print()
        }
      },[invoiceData])

    return (
     invoiceData &&
        <>
          <div className="wraper container-fluid">
            <div className="admin-view-invoice">
              <div className="d-flex flex-column flex-sm-row justify-content-between header-sec">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="89.202" height="70.562" viewBox="0 0 89.202 70.562">
                    <g id="Group_10643" data-name="Group 10643" transform="translate(0.01 0.001)">
                      <path id="Path_27704" data-name="Path 27704" d="M886.251,176.143,857.4,204.777a6.911,6.911,0,0,1-10.414-.821l-6.374-8.658a6.913,6.913,0,0,0-10.3-.933v.016l-.443.443-.163.163-3.7,3.711,3.466,4.814L845.314,225a6.913,6.913,0,0,0,10.416.821L885.1,196.435a12.225,12.225,0,0,0,3.55-8.527h0a13.643,13.643,0,0,0-.382-3.466Z" transform="translate(-799.464 -157.25)" fill="#f47920" />
                      <path id="Path_27705" data-name="Path 27705" d="M810.228,214.376,838.5,186.07a6.913,6.913,0,0,1,10.416.821l6.374,8.658a6.913,6.913,0,0,0,10.169,1.052l.737-.739,3.713-3.732-3.482-4.8L850.61,165.86a6.922,6.922,0,0,0-10.433-.837L810.8,194.411l-.065.065A11.661,11.661,0,0,0,808,205.485Z" transform="translate(-807.604 -163.037)" fill="#472f91" />
                      <line id="Line_56" data-name="Line 56" x1="2.736" y1="3.778" transform="translate(30.013 46.256)" fill="none" />
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="font-15 text-right">
                    {fromAddress &&
                      <>
                        {fromAddress.invoiceAddress} <br />
                        {fromAddress.country} {fromAddress.postalCode} <br />
                        {fromAddress.email} <br/>
                        {fromAddress.phoneNumber} <br/> www.nitex.com
                      </>
                    }
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between header-sec">
                <div>
                  <div className="header-title mb-4 text-left">Invoice No: <strong className="text-black">{invoiceData.invoiceNo}</strong></div>
                  <div className="d-flex terms">
                    <span className="color-gray term text-left"><span>Invoice Date:</span> <strong className="semibold text-black"> {invoiceData.date? changeDateFormat(invoiceData.date) : 'N/A'}</strong></span>
                    <span className="color-gray term text-left"><span>Due date:</span> <strong className="semibold text-black"> {invoiceData.dueDate? changeDateFormat(invoiceData.dueDate) : 'N/A'}</strong></span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-column flex-sm-row">
                  <div className="text-center mr-0 mr-sm-5">
                    <span className="white-space-nowrap">Payment status</span> <br />
                    <span className="badge-custom mt-2 d-inline-block">{invoiceStatus(invoiceData)}</span>
                  </div>
                </div>
              </div>
              <div className="stepper">
                <div className="recipient-from d-flex flex-column flex-sm-row justify-content-between">
                  <div>
                    <div className="font-15 semibold mb-3">Bill From</div>
                    { fromAddress &&
                        <address>
                            <div className="name">{fromAddress.name}</div>
                            <span className="address">{fromAddress.invoiceAddress}</span>
                            <span className="address">{fromAddress.country} {fromAddress.postalCode}</span>
                            <span>{fromAddress.email}</span>
                            <span className="phone">{fromAddress.phoneNumber}</span>
                        </address>
                    }
                  </div>
                  <div>
                    <div className="font-15 semibold mb-3">Bill To</div>
                    { toAddress &&
                        <address>
                          <div className="name">{toAddress.fullName}</div>
                          <span className="address">{toAddress.address}</span>
                          <span className="mail">{toAddress.email}</span>
                          <span className="phone">{toAddress.phoneNo}</span>
                        </address>
                    }
                  </div>
                </div>
                <h3 className="font-28 semibold mb-3">List of items</h3>
                {/*\Table*/}
                <div className="row">
                  <div className="col-sm-12">
                    <table className="table invoice-table table-responsive-xl">
                      <tbody>
                            {
                                invoiceData.itemWisePrice ?
                                  invoiceData.itemWisePrice.map((item, i) => {
                                    return(
                                      <tr key={i}>
                                          <td>{item.itemName}</td>
                                          <td>
                                              <span>Quantity</span> <br/>
                                              <strong>{item.quantity} pc</strong>
                                          </td>
                                          <td>
                                              <span>Unit price</span> <br/>
                                              <strong>${item.unitPrice}</strong>
                                          </td>
                                          <td>
                                              <span>Total price</span> <br/>
                                              <strong>${item.price}</strong>
                                          </td>
                                      </tr>
                                    )
                                  }) : <></>
                                }
                      </tbody>
                    </table>
                  </div>
                </div>
                {/*\Footer Table*/}
                <div className="row mt-5">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="semibold">Notes</label>
                      <article className="invoice-note">
                        <p>{invoiceData.note}</p>
                      </article>
                    </div>
                  </div>
                  <div className="col-md-2" />
                  <div className="col-md-4">
                    <table className="table mt-0 mt-xl-4 invoice-table sub-total">
                      <tbody>
                        <tr>
                          <td className="font-18">Sub total</td>
                          <td className="text-right"><strong>{invoiceData.amount}</strong></td>
                        </tr>
                        <tr>
                          <td className="semibold color-gray font-18">Tax</td>
                          <td className="text-right">0.00</td>
                        </tr>
                        <tr>
                          <td className="semibold font-18">TOTAL</td>
                          <td className="text-right"><strong>${invoiceData.amount}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> 
    )
}
export default InvoiceDownload;