import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addImageSuffix } from '../services/Util';

export const NotificationCard = ({item, markRead}) =>{



  return(
    <li>
        <a href="#" onClick={() => markRead(item.id, item.isSeen, generateUrl(item))} className={!item.isSeen ? 'active' : ''}>
            <div className="notify-list">
                {loadIcon(item)}
                <div className="info">
                    <div className="name">{item.text}</div>
                    <div className="post-time">{item.createdTime}</div>
                    {renderTag(item)}
                </div>
                {
                  item.notificationImagePath ?
                  <img src={addImageSuffix(item.notificationImagePath, '_xicon')} className="product" />
                  :
                  <img src={require("../assets/images/default_product.jpg")} className="product" />
                }
            </div>
        </a>
    </li>
  )
}

const generateUrl = (item) => {
  if(
    item.notificationEvent == 'NEW_RFQ_ADDED' ||
    item.notificationEvent == 'RFQ_STATUS_UPDATED' ||
    item.notificationEvent == 'RFQ_EXECUTIVE_ADDED' ||
    item.notificationEvent == 'RFQ_PRODUCT_MESSAGE'
  ){
    return "/my-rfqs?rfqId=" + item.rfqId;
  }else if(
    item.notificationEvent == 'NEW_PRODUCT_ARRIVED'
  ){
    if(item.productId){
      return "/my-products/" + item.productId;
    }else{
      return "/my-products";
    }
  }else if(
    item.notificationEvent == 'NEW_PROJECT_ADDED' ||
    item.notificationEvent == 'PROJECT_STATUS_UPDATED' ||
    item.notificationEvent == 'PROJECT_MEMBER_ADDED' ||
    item.notificationEvent == 'PROJECT_MANAGER_ADDED' ||
    item.notificationEvent == 'PROJECT_ALERT'
  ){
    if(item.projectId){
      return "/my-project-details/" + item.projectId;
    }else{
      return "/my-project";
    }
  }else if(
    item.notificationEvent == 'MEMBER_MENTIONED_AT_POST' ||
    item.notificationEvent == 'DELIVERABLE_STATUS_UPDATED' ||
    item.notificationEvent == 'DELIVERABLE_ALERT' ||
    item.notificationEvent == 'DELIVERABLE_MESSAGE' ||
    item.notificationEvent == 'NEW_POST_ON_PROJECT' ||
    item.notificationEvent == 'PROJECT_STATUS_UPDATED'
  ){
    if(item.projectId && item.postId){
      return "/my-project-details/" + item.projectId + '?tab=2&postId='+item.postId;
    }
    else{
      return "/my-project";
    }
  }
  else if(
      item.notificationEvent == 'INVOICE_PAYMENT_ADDED' ||
      item.notificationEvent == 'NEW_INVOICE_ADDED'
  ){
    return "/my-project-details/" + item.projectId + '?tab=3';
  }
}

const loadIcon = (item) => {
  switch(item.notificationEvent) {
    case 'NEW_PRODUCT_ARRIVED':
      return (
        <img className="type" src={require("../assets/images/icons/new-arrived.png")}/>
      )
      break;
    case 'PROJECT_STATUS_UPDATED':
      return (
        <img className="type" src={require("../assets/images/icons/approved.png")}/>
      )
      break;
    case 'DELIVERABLE_ALERT':
      return (
        <img className="type" src={require("../assets/images/icons/deadline.png")}/>
      )
      break;
    case 'NEW_INVOICE_ADDED':
      return (
        <img className="type" src={require("../assets/images/icons/invoice.png")}/>
      )
      break;
    case 'PROJECT_ALERT':
      return (
        <img className="type" src={require("../assets/images/icons/progress.png")}/>
      )
      break;
    default:
      if(item.profileImagePath){
        return (
          <img className="type" src={item.profileImagePath}/>
        )
      }else{
        return (
          <img className="type" src={require("../assets/images/pro_pic_default.png")}/>
        )
      }
      break;
      // code block
  }

}

const renderTag = (item) => {
  if(item.notificationCategory=='PRODUCT'){
    return(
      <div className="tag product">{item.notificationCategory}</div>
    )
  }else if(item.notificationCategory=='RFQ'){
    return(
      <div className="tag quatation">{item.notificationCategory}</div>
    )
  }else if(item.notificationCategory=='PROJECT'){
    return(
      <div className="tag project">{item.notificationCategory}</div>
    )
  }else{
    return(
      <div className="tag product">{item.notificationCategory ? item.notificationCategory.replace(/_/g, " ") : item.notificationCategory}</div>
    )
  }
}
