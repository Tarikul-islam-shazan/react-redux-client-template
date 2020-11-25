import React, { Component } from 'react';
import { addImageSuffix } from '../../../services/Util';
export const RfqCard = ({item, onClick, selectedId, showStatus}) => {
  return(
    <div className="client-list" onClick={() => onClick(item.id)}>
        <div className={"list "+(item.id==selectedId ? 'active' : '')}>
            <div className="client-info">
                {
                  item.imageUrl ?
                  <img src={addImageSuffix(item.imageUrl, '_xicon')} alt={item.name}/>
                  :
                  <img src={require("../../../assets/images/default_product.svg")} alt={item.name}/>
                }
                <div className="info">
                 <h6>{item.name}</h6>
                 <span>{item.clientName}</span>
                </div>
            </div>
            <div className="time-respons">
                {
                  showStatus(item)
                }
            </div>
        </div>
    </div>
  )
}
