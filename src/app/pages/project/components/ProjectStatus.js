import React, { Component } from 'react';
import { projectStatus, addImageSuffix, convertTimeToLocal } from '../../../services/Util';

export const ProjectStatus = ({data}) => {
  return(
    <div className="project-status-container">
        <div className="project-statistic">
            <div className="ps-item">
                <span className="project-name">Project name</span>
                <h6>{data.name ? data.name : 'N/A'}</h6>
            </div>
            <div className="ps-item">
                <span className="start-date">Start date</span>
                <h6>{data.startDate ? convertTimeToLocal(data.startDate, '', 'DD.MM.YYYY') : 'N/A'}</h6>
            </div>
            <div className="ps-item">
                <span className="end-date">End date</span>
                <h6>{data.endDate ? convertTimeToLocal(data.endDate, '', 'DD.MM.YYYY') : 'N/A'}</h6>
            </div>
            <div className="ps-item">
                <span className="time-left">Time left</span>
                <h6>{data.timeLeft ? (Math.abs(data.timeLeft) + ' ' + 'days') : 'N/A'}</h6>
            </div>
            <div className="ps-item">
                <span className="total-style">Total styles</span>
                <h6>{data.totalStyles ? data.totalStyles : 'N/A'}</h6>
            </div>
            <div className="ps-item">
                <span className="total-valuation">Total valuation</span>
                <h6>{data.totalValuation ? data.totalValuation : 'N/A'}</h6>
            </div>
            <div className="ps-item">
              {
                projectStatus(data)
              }

            </div>
        </div>
        <div className="project-status">
            <div className="head">
                <label>Project status</label>
                <div className="percentage">{`${data.percentageComplete}%`}</div>
            </div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${data.percentageComplete}%`}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div className="project-team-members">
            <label>Team members</label>
            <div className="members">
                <div className="member">
                  {
                    data.projectManagerResponse && data.projectManagerResponse.profilePicDocument && data.projectManagerResponse.profilePicDocument.docUrl ?
                    <img src={addImageSuffix(data.projectManagerResponse.profilePicDocument.docUrl, '_xicon')} alt=""/>
                    :
                    <img src={require("../../../assets/images/pro_pic_default.png")} alt=""/>
                  }
                  <h6>Project manager</h6>
                </div>
                <div className="member other-member">
                    {
                      data.projectMemberResponseList &&
                      data.projectMemberResponseList.map((item,i)=>{
                        return(
                          item.profilePicDocument.docUrl ?
                          <img key={i} src={addImageSuffix(item.profilePicDocument.docUrl, '_xicon')} alt=""/> :
                          <img src={require("../../../assets/images/pro_pic_default.png")} alt=""/>
                        )
                      })
                    }
                    {/*<div className="more-img">+15px</div>*/}
                    <h6>Other members</h6>
                </div>
            </div>
        </div>
    </div>
  )
}
