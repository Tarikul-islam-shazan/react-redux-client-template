import React, { Component } from 'react';
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
                                    Project name
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
                                        <img src={require('../../../assets/icons/calendar_end.png')} alt="calendar end" />
                                    </span>
                                    End date
                                </th>
                                <th scope="col">
                                    <span>
                                        <img src={require('../../../assets/icons/cloth_style.png')} alt="cloth style" />
                                    </span>
                                    Total styles
                                </th>
                                <th scope="col">
                                    <span>
                                        <img src={require('../../../assets/icons/date_time.png')} alt="date and time" />
                                    </span>
                                    Days left
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-focus">
                            <tr>
                                <td className="fs-medium">{item.name}</td>
                                <td className="fs-medium">{item.orderId}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.totalStyles}</td>
                                <td>{item.timeLeft ? Math.abs(item.timeLeft) : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
