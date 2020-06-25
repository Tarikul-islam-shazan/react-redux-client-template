import React, { Component } from 'react';
import { rfqStatus } from '../../../services/Util';

export const RfqList = ({data,showRfqDetails}) =>{
  return (
    <div className="card-body p-0">
      <div className="table-responsive">
          <table className="table rfq-table mb-0">
              <thead>
                  <tr>
                      <th scope="col">SL No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Products</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    data.map((item,i) => {
                      return(
                        <tr key={i} onClick={() => showRfqDetails(item.id)}>
                            <td>{i+1}</td>
                            <td>
                                <p className="mb-0" style={{position: 'relative'}}>
                                    {item.name}
                                    {
                                      item.numberOfNotification ?
                                      <span id="numberBadge" className="notify-badge">{item.numberOfNotification}</span>
                                      :<></>
                                    }
                                </p>
                            </td>
                            <td style={{textAlign:'center'}}>{item.productType ? item.productType : 'N/A'}</td>
                            <td style={{textAlign:'center'}}>{item.dateAdded ? item.dateAdded : 'N/A'}</td>
                            <td>
                                {
                                  rfqStatus(item)
                                }
                            </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
          </table>
      </div>
    </div>
  )
}
