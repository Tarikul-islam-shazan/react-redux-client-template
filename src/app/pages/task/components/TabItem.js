import React, { Component } from 'react';
import { addImageSuffix, changeDateFormat } from '../../../services/Util';

export const TabItem = ({item, selectedTab, onRowClick}) => {
  return (
    <div className="row items-row align-items-center" onClick={() => onRowClick(item)}>
        <div className="col-4 d-flex align-items-center px-0 style-info">
          <div className="task-image">
          {
            item.stepProduct && item.stepProduct.image &&
            <img src={addImageSuffix(item.stepProduct.image, '_xthumbnail')} alt={item.stepProduct.name}/>
          }
          </div>
          <p>{item.stepName}</p>
        </div>
        <div className="col-2 pr-0"><p><a href={`/designs/view/${item.stepProduct ? item.stepProduct.id : ``}`} target="_blank">{item.stepProduct ? item.stepProduct.name : ''}</a></p></div>
        <div className="col-2 pl-0"><p><a href={`/orders/view/${item.orderId}`} target="_blank">{item.orderName}</a></p></div>
        {
          showStatus(item, selectedTab)
        }
        <div className="col-2"><p>{item.brandResponse ? item.brandResponse.name : ''}</p></div>
    </div>
  )
}

const showStatus = (item, tab) => {
  if (tab === 'OVERDUE') {
    return (
      <div className="col-2">
        <span className="status-btn overdue">
          {changeDateFormat(item.endDate, 'YYYY-MM-DD', 'MMM-DD')} <img src={require('../../../assets/images/icons/overdue-icon.svg')} alt=""/>
        </span>
        <span className="time-count overdue-time-count">+{getTimeCount(Math.abs(item.dueInHour))}</span>
      </div>
    )
  }
  if (tab === 'COMPLETE') {
    return (
      <div className="col-2"><span className="status-btn completed">{changeDateFormat(item.endDate, 'YYYY-MM-DD', 'MMM-DD')} <img src={require('../../../assets/images/icons/completed-icon.svg')} alt=""/></span> <span className="time-count"></span> </div>
    )
  }
  if (item.dueInHour > 0 && item.dueInHour < 24) {
    return (
       <div className="col-2"><span className="status-btn due-soon">{changeDateFormat(item.endDate, 'YYYY-MM-DD', 'MMM-DD')} <img src={require('../../../assets/images/icons/due-soon-icon.svg')} alt=""/></span> <span className="time-count due-soon-time-count">-{Math.abs(item.dueInHour)}h</span> </div>
    )
  }

  return (
    <div className="col-2"><span className="status-btn start-today">{changeDateFormat(item.endDate, 'YYYY-MM-DD', 'MMM-DD')} <img src={require('../../../assets/images/icons/start-today.svg')} alt=""/></span> <span className="time-count start-time-count">-{getTimeCount(Math.abs(item.dueInHour))}</span> </div>
  )
}

const getTimeCount = (hrs) => {
  if (hrs < 24) {
    return `${hrs}h`;
  } else if (hrs < (24*7)) {
    return `${parseInt(hrs/24)}d`;
  } else {
    return `${parseInt(hrs/(24*7))}w`;
  }
}
