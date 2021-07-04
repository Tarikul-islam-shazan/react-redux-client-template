import React, { Component } from 'react';

export const TableTitleComponent = ({title, classes, orderFlags, onClick, type}) => {
  return (
    <div className={`${classes} ${orderFlags[type] ? `click` : ``}`}>
      <p>{title} <img onClick={() => onClick(type)} src={require('../../../assets/images/icons/down-arrow.png')} alt="arrow"/></p>
    </div>
  )
}
