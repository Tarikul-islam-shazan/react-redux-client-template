import React, { Component } from 'react';
const EmptyState = ({title, subTitle}) => {
  return(
    <div class="empty-state d-flex flex-column justify-content-center align-items-center p-4">
        <img src={require('../assets/images/empty-state.png')} alt=""/>
        <h2 class="font-weight-normal">{title}</h2>
        <p class="font-19">{subTitle}</p>
    </div>
  );
}

export default EmptyState;
