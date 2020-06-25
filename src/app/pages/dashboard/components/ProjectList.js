import React, { Component } from 'react';
import { projectStatus } from '../../../services/Util';

export const ProjectList = ({data,showProjectDetails}) =>{
  return (
    <div className="card-body p-0">
        <div className="table-responsive">
            <table className="table project-table mb-0">
                <thead>
                    <tr>
                        <th scope="col">SL No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Start Day</th>
                        <th scope="col">Days Left</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    data.map((item,i) => {
                      return(
                        <tr key={i} onClick={()=>showProjectDetails(item.orderId)}>
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
                            <td style={{textAlign:'center'}}>{item.startDate ? item.startDate : 'N/A'}</td>
                            <td style={{textAlign:'center'}}>{item.timeLeft ? Math.abs(item.timeLeft) : 'N/A'}</td>
                            <td>
                                {
                                  projectStatus(item)
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
