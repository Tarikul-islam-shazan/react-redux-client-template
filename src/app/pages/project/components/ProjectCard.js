import React, { Component } from 'react';
import { convertTimeToLocal } from '../../../services/Util';
export const ProjectCard = ({item, onClick}) => {
  return(
    <div className="row">
        <div className="col">
            <div className="card my-project-card mb-2">
                <div className="table-responsive">
                    <table className="table table-borderless" onClick={() => onClick(item.orderId)}>
                        <thead>
                            <tr>
                                <th scope="col">
                                    Order title
                                </th>
                                <th scope="col">Order ID</th>
                                <th scope="col">
                                    <span>
                                        <img src={require('../../../assets/icons/calendar_start.png')} alt="calendar start" />
                                    </span>
                                    Start date
                                </th>
                                <th scope="col">
                                    <span>
                                        <img src={require('../../../assets/icons/date_time.png')} alt="date and time" />
                                    </span>
                                    Days left
                                </th>
                                {/*<th scope="col">*/}
                                {/*    <span>*/}
                                {/*        <img src={require('../../../assets/icons/calendar_end.png')} alt="calendar end" />*/}
                                {/*    </span>*/}
                                {/*    End date*/}
                                {/*</th>*/}
                                <th scope="col">
                                    <span>
                                        <img src={require('../../../assets/icons/cloth_style.png')} alt="cloth style" />
                                    </span>
                                    Total designs
                                </th>
                                {/*<th scope="col">*/}
                                {/*    Order value*/}
                                {/*</th>*/}
                                {/*<th scope="col">*/}
                                {/*    Progress*/}
                                {/*</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fs-medium">{item.name}</td>
                                <td className="fs-medium">{item.orderId}</td>
                                <td>{item.startDate ? convertTimeToLocal(item.startDate, '', 'DD.MM.YYYY') : 'N/A'}</td>
                                <td>{item.timeLeft ? Math.abs(item.timeLeft) : 'N/A'}</td>
                                {/*<td>{item.endDate ? convertTimeToLocal(item.endDate, '', 'DD.MM.YYYY') : 'N/A'}</td>*/}
                                <td>{item.totalStyles}</td>
                                {/*<td>Value added here</td>*/}
                                {/*<td>*/}
                                {/*    <div className="project-status checklist-status">*/}
                                {/*        <div className="head"> */}
                                {/*            <div className="percentage">75%</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="progress">*/}
                                {/*            <div className="progress-bar" role="progressbar" style="width: 75%"*/}
                                {/*                 aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</td>*/}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
