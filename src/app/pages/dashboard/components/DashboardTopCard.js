import React, { Component } from 'react';

export const DashboardTopCard = ({ title , value , image, clsName }) => {
  return (
    <div className="col dc">
        <div className="dashboard-card">
            <div className="row align items-center">
                <div className="col mr-auto">
                    <h2 className="card-number">{value}</h2>
                    <span className="card-topics">{title}</span>
                </div>
                <div className="col-auto">
                    <div className={clsName}>
                        <img src={image} alt="start"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
