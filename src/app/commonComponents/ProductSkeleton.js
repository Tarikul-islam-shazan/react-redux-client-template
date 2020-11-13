import React, { Component } from 'react';

export const ProductSkeleton = () => {
    return(
      <div className="card product-card">
          <div className="product-skeleton">
             <div className="img"></div>
             <div className="line"></div>
             <div className="cat"></div>
             <div className="action">
               <div className="line"></div>
               <div className="line"></div>
             </div>
           </div>
       </div>
    )
}

export const CreateSkeletons = ({iterations}) => {
    let res = [];
    for (let i = 0; i < iterations; i++) {
        res.push(<ProductSkeleton />)
    }
    return res;
}
