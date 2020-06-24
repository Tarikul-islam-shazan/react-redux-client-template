import React, { Component } from 'react';
export const NewDevelopmentStep_0_Card = ({image,title,description,onClick,valueToBeChecked,value}) =>{
  return (
    <div className="col" onClick={(e) => onClick(value)}>
        <div className={'card text-center '+ (valueToBeChecked==value ? 'card-focus' : '')}>
            <img src={image} alt="development project" className="card-img-top img-fluid d-block mx-auto"/>
            <div className="card-body">
                <p className="card-title text-capitalize">{title}</p>
                <p className="card-text">{description}</p>
            </div>
            {
              valueToBeChecked==value ?
              <div className="card-checked">
                  <img src={require("../../../assets/icons/checked.png")} alt="check icon" className="img-fluid d-block mx-auto"/>
              </div>
              : <></>
            }
        </div>
    </div>
  )
}
