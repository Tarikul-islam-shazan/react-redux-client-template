import React, { Component } from 'react';
import { invoiceStatus } from '../../../services/Util';
import moment from 'moment';

export const InvoiceItem = ({invoice, remove}) => {
  return (
      <tr>
          <td>{invoice.invoiceNo}</td>
          <td>{invoice.orderId}</td>
          <td>${invoice.amount}</td>
          <td>{invoice.dateCreated ? moment(invoice.dateCreated, 'DD/MM/YYYY').format('DD MMM, YY') : 'N/A'}</td>
          <td>{invoice.dueDate ? moment(invoice.dueDate, 'DD/MM/YYYY').format('DD MMM, YY') : 'N/A'}</td>
          <td>
             <div class="paypal">
                 <svg xmlns="http://www.w3.org/2000/svg" width="123" height="32" viewBox="0 0 123 32">
                     <g id="Group_11223" data-name="Group 11223" transform="translate(-1212 -295)">
                         <rect id="Rectangle_6225" data-name="Rectangle 6225" width="123" height="32" rx="16" transform="translate(1212 295)" fill="#263b80" opacity="0.05"/>
                         <g id="paypal-logo" transform="translate(1243 283.265)">
                             <g id="Group_11135" data-name="Group 11135" transform="translate(0 19.726)">
                                 <g id="Group_11134" data-name="Group 11134">
                                     <path id="Path_6" data-name="Path 6" d="M12.008,21.056a2.716,2.716,0,0,0-1-1.075A4.669,4.669,0,0,0,9.425,19.4a12.958,12.958,0,0,0-2.154-.17l-3.81,0a.955.955,0,0,0-.877.7L.02,31.094a.54.54,0,0,0,.552.694H2.4a.934.934,0,0,0,.876-.694L3.9,28.383a.935.935,0,0,1,.874-.692h.522a8.641,8.641,0,0,0,5.2-1.372A4.271,4.271,0,0,0,12.358,22.7,3.394,3.394,0,0,0,12.008,21.056ZM8.072,24.7a3.837,3.837,0,0,1-2.307.606H5.319a.544.544,0,0,1-.554-.7l.549-2.371a.923.923,0,0,1,.869-.692l.6,0a2.92,2.92,0,0,1,1.587.355,1.207,1.207,0,0,1,.526,1.087A1.975,1.975,0,0,1,8.072,24.7Z" transform="translate(0 -19.229)" fill="#263b80"/>
                                 </g>
                             </g>
                             <g id="Group_11141" data-name="Group 11141" transform="translate(11.346 22.568)">
                                 <g id="Group_11140" data-name="Group 11140">
                                     <path id="Path_9" data-name="Path 9" d="M18,21.949a6.925,6.925,0,0,0-3.261-.582,14.414,14.414,0,0,0-2.207.171c-.546.084-.6.1-.936.173a1.07,1.07,0,0,0-.8.844l-.223.918c-.126.586.211.564.352.514a9.483,9.483,0,0,1,1.091-.322,7.823,7.823,0,0,1,1.709-.229,4.5,4.5,0,0,1,1.66.234.838.838,0,0,1,.55.829l-.032.258-.263.162c-1.035.065-1.784.161-2.691.292a8.348,8.348,0,0,0-2.314.637,3.6,3.6,0,0,0-1.571,1.239A3.376,3.376,0,0,0,8.537,29,2.255,2.255,0,0,0,9.28,30.73a2.789,2.789,0,0,0,1.923.657,5.246,5.246,0,0,0,1.146-.106l.884-.3.748-.415.688-.455.009.013-.069.292,0,.012v0a.543.543,0,0,0,.488.683l.007.008h1.694l.024-.011a.944.944,0,0,0,.785-.683l1.33-5.759L19,24.2l.032-.44A1.925,1.925,0,0,0,18,21.949Zm-2.942,6.475-.284.375-.718.371a2.555,2.555,0,0,1-.954.206,2.19,2.19,0,0,1-1.039-.2l-.352-.684a1.368,1.368,0,0,1,.267-.89l.773-.526a6.689,6.689,0,0,1,1.2-.271c.417-.052,1.241-.146,1.349-.149l.126.222C15.4,27,15.167,27.983,15.056,28.424Z" transform="translate(-8.537 -21.367)" fill="#263b80"/>
                                 </g>
                             </g>
                             <g id="Group_11143" data-name="Group 11143" transform="translate(44.489 22.574)">
                                 <g id="Group_11142" data-name="Group 11142">
                                     <path id="Path_10" data-name="Path 10" d="M42.936,21.955a6.939,6.939,0,0,0-3.26-.583,13.893,13.893,0,0,0-2.206.175c-.548.08-.6.1-.94.169a1.067,1.067,0,0,0-.8.845l-.223.917c-.125.586.2.56.359.514a10.81,10.81,0,0,1,1.082-.323,8.161,8.161,0,0,1,1.713-.229,4.481,4.481,0,0,1,1.656.235.837.837,0,0,1,.55.828l-.028.257-.26.166c-1.046.062-1.8.158-2.694.29a8.35,8.35,0,0,0-2.315.637A3.594,3.594,0,0,0,34,27.095a3.334,3.334,0,0,0-.524,1.9,2.229,2.229,0,0,0,.747,1.736,2.792,2.792,0,0,0,1.919.661,5.084,5.084,0,0,0,1.144-.108l.881-.3.755-.415.683-.46.012.015-.062.3-.007.005,0,.005a.534.534,0,0,0,.485.683l0,.007h1.693l.028-.009a.934.934,0,0,0,.776-.688l1.334-5.751.07-.472.039-.441A1.922,1.922,0,0,0,42.936,21.955ZM40,28.43l-.3.379-.711.368a2.585,2.585,0,0,1-.95.206,2.125,2.125,0,0,1-1.038-.2l-.356-.682a1.426,1.426,0,0,1,.26-.893,1.87,1.87,0,0,1,.781-.525,6.779,6.779,0,0,1,1.2-.27c.415-.052,1.236-.149,1.342-.15l.129.222C40.345,27.012,40.109,27.987,40,28.43Z" transform="translate(-33.475 -21.372)" fill="#263b80"/>
                                 </g>
                             </g>
                             <g id="Group_11145" data-name="Group 11145" transform="translate(33.137 19.766)">
                                 <g id="Group_11144" data-name="Group 11144">
                                     <path id="Path_11" data-name="Path 11" d="M36.942,21.088a2.823,2.823,0,0,0-1-1.079,4.479,4.479,0,0,0-1.586-.582,12.545,12.545,0,0,0-2.146-.167l-3.816,0a.948.948,0,0,0-.871.694L24.953,31.127a.541.541,0,0,0,.55.692l1.827,0a.946.946,0,0,0,.877-.691l.618-2.713a.946.946,0,0,1,.877-.692h.522a8.687,8.687,0,0,0,5.212-1.37,4.319,4.319,0,0,0,1.855-3.624A3.56,3.56,0,0,0,36.942,21.088Zm-3.935,3.653a3.885,3.885,0,0,1-2.3.6H30.25a.546.546,0,0,1-.558-.7l.553-2.367a.928.928,0,0,1,.872-.692l.591,0a2.954,2.954,0,0,1,1.587.354,1.217,1.217,0,0,1,.53,1.087A2,2,0,0,1,33.007,24.741Z" transform="translate(-24.934 -19.259)" fill="#263b80"/>
                                 </g>
                             </g>
                             <g id="Group_11147" data-name="Group 11147" transform="translate(55.281 19.866)">
                                 <g id="Group_11146" data-name="Group 11146">
                                     <path id="Path_12" data-name="Path 12" d="M47.106,20.02a.534.534,0,0,0-.548-.686H44.924a.926.926,0,0,0-.784.554l-.09.141-.082.361L41.683,30.776l-.074.319,0,.008a.517.517,0,0,0,.459.649l.028.039h1.7a.927.927,0,0,0,.787-.564l.088-.133,2.443-11.072Z" transform="translate(-41.595 -19.334)" fill="#263b80"/>
                                 </g>
                             </g>
                             <g id="Group_11149" data-name="Group 11149" transform="translate(22.451 22.707)">
                                 <g id="Group_11148" data-name="Group 11148">
                                     <path id="Path_13" data-name="Path 13" d="M27.649,21.472c-.432.005-2.188,0-2.188,0a1.582,1.582,0,0,0-1.148.7S21.7,26.653,21.446,27.1l-.3,0-.813-4.9a1,1,0,0,0-.994-.715l-1.635,0a.539.539,0,0,0-.546.7s1.241,7.064,1.49,8.726c.116.917-.015,1.08-.015,1.08L17.014,34.8c-.239.383-.11.7.282.7l1.89,0A1.527,1.527,0,0,0,20.33,34.8l7.27-12.3S28.3,21.457,27.649,21.472Z" transform="translate(-16.893 -21.472)" fill="#263b80"/>
                                 </g>
                             </g>
                         </g>
                     </g>
                 </svg>
             </div>
          </td>
          <td>
          {
            invoiceStatus(invoice)
          }
          </td>
          <td colspan="2">
              <div class="d-flex align-items-center">
                  <button type="button" class="pay action brand-bg-color text-white w-50 m-0">Pay</button>
                  <div class="option">
                      <div class="dropdown">
                          <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
                                  <g id="Group_11227" data-name="Group 11227" transform="translate(-1811.5 -564.5)">
                                      <path id="Path_29420" data-name="Path 29420" d="M19.5,18A1.5,1.5,0,1,1,18,16.5,1.5,1.5,0,0,1,19.5,18Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                      <path id="Path_29421" data-name="Path 29421" d="M19.5,7.5A1.5,1.5,0,1,1,18,6,1.5,1.5,0,0,1,19.5,7.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                      <path id="Path_29422" data-name="Path 29422" d="M19.5,28.5A1.5,1.5,0,1,1,18,27,1.5,1.5,0,0,1,19.5,28.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                  </g>
                              </svg>

                              <ul class="dropdown-menu dropdown-menu-right shadow-lg" role="menu" aria-labelledby="menu1" x-placement="bottom-end" style={{position: 'absolute', transform: 'translate3d(-102px, 51px, 0px)', top: 0, left: 0, willChange: 'transform'}}>
                                  <li role="presentation" class="px-4 pb-3 pt-3"><a role="menuitem" tabindex="-1" href="#" class="font-weight-normal  text-black">Get Quotes</a></li>
                                  <li role="presentation" class="px-4 pb-3"><a role="menuitem" tabindex="-1" href="#" class="font-weight-normal  text-black">Delete</a></li>
                              </ul>
                          </button>
                      </div>
                  </div>
              </div>
          </td>
      </tr>
  )
}
