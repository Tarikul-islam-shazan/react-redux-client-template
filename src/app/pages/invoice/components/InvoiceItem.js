import React, { Component } from 'react';
import { invoiceStatus } from '../../../services/Util';
import moment from 'moment';
import {Dropdown} from 'react-bootstrap';

export const InvoiceItem = ({invoice, details, remove, payInvoice}) => {
  return (
      <tr>
          <td>{invoice.invoiceNo}</td>
          <td>{invoice.orderRefNumber}</td>
          <td>${invoice.amount}</td>
          <td>{invoice.dateCreated ? moment(invoice.dateCreated, 'DD/MM/YYYY').format('DD MMM, YY') : 'N/A'}</td>
          <td>{invoice.dueDate ? moment(invoice.dueDate, 'DD/MM/YYYY').format('DD MMM, YY') : 'N/A'}</td>
          <td>
          {
            invoiceStatus(invoice)
          }
          </td>
          <td colspan="2">
              <div class="d-flex align-items-center justify-content-center">
                  <button type="button" class="pay brand-bg-color text-white w-50 m-0" onClick={() => payInvoice(invoice.id)}>Pay</button>
                  <div className="option">
                      <div className="dropdown">
                          <Dropdown className="card-options">
                              <Dropdown.Toggle variant="default" id="dropdown-basic">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
                                      <g id="Group_11227" data-name="Group 11227" transform="translate(-1811.5 -564.5)">
                                          <path id="Path_29420" data-name="Path 29420" d="M19.5,18A1.5,1.5,0,1,1,18,16.5,1.5,1.5,0,0,1,19.5,18Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                          <path id="Path_29421" data-name="Path 29421" d="M19.5,7.5A1.5,1.5,0,1,1,18,6,1.5,1.5,0,0,1,19.5,7.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                          <path id="Path_29422" data-name="Path 29422" d="M19.5,28.5A1.5,1.5,0,1,1,18,27,1.5,1.5,0,0,1,19.5,28.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                      </g>
                                  </svg>
                              </Dropdown.Toggle>

                              <Dropdown.Menu alignRight className="dropdown-menu dropdown-menu-right shadow-lg">
                                  <Dropdown.Item href="#" className="px-4 py-3 font-weight-normal text-black font-15" onClick={() => details(invoice.id)}>Details</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                      </div>
                  </div>
              </div>
          </td>
      </tr>
  )
}
