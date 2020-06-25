import React, { Component } from 'react';
export const UploadedItem = ({item,remove}) => {
  return(
    <div className="demo-product-card">
        <a onClick={remove} className="cross">
            <img src={require("../assets/icons/remove.png")} alt="remove"/>
        </a>
        <div>
            <div className="txt-overflow">
                <p>{item.name}</p>
            </div>
        </div>
        <img src={item.base64Str} alt={item.name} className="img-fluid"/>
    </div>
  );
}

export const UploadedItemDoc = ({item,remove}) => {
  return(
    <div className="demo-product-card">
        <a onClick={remove} className="cross">
            <img src={require("../assets/icons/remove.png")} alt="remove"/>
        </a>
        <div>
            <div className="txt-overflow">
                <p>{item.name}</p>
            </div>
        </div>
        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFonYuAtDdjmVMxYDBSe9gKbavEie26Zijkt-MJiFBAlWlOx9e&usqp=CAU'} alt={item.name} className="img-fluid"/>
    </div>
  );
}
