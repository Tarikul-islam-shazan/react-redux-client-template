import React, { Component } from 'react';
export const Image = ({selected,item,onClick}) => {
  let flag = 1;
  // console.log("from image component",item)
  return (
    <div className={`item ${selected}`} onClick={onClick}>
        <div className="card">
        {
          item.designDocuments.length > 0 ?
          item.designDocuments.map((doc,i) => {
            if(doc.docType=='PRODUCT_DESIGN' && flag){
              flag = 0;
              return (
                <img key={i} src={item.designDocuments[0].docUrl} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
              )
            }
          })
          :
          <img src={require("../assets/images/demo_product1.png")} alt=""/>
        }
          <div className="card-body">
              <h5 className="card-title text-capitalize">{item.name}</h5>
          </div>
        </div>
    </div>
  )
}
