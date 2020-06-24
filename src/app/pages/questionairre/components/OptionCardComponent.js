import React, { Component } from 'react';
export const QuestionnaireOption = ({image,title,onClick,valueToBeChecked,value}) =>{
  return (
    <div className="col">
        <div className="card" onClick={() => onClick(value)}>
            <img src={image} alt="other" className="card-img-top img-fluid d-block mx-auto"/>
            <div className="card-body">
                <p className="card-text">{title}</p>
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
