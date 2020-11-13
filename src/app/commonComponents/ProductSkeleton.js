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

export const RfqSkeleton = () => {
    return(
      <div className="client-list">
        <div className="skeleton quote-list-left">
          <div className="client-info">
            <div className="img"></div>
            <div className="info">
              <div className="line"></div>
              <div className="cat"></div>
            </div>
          </div>
          <div className="button-skel"></div>
        </div>
      </div>
    )
}

export const RfqProductSkeleton = () => {
    return(
      <tr>
        <td colspan="6">
          <div className="skeleton quote-list-table">
            <div className="cheque-skel"></div>
            <div className="cat"></div>
            <div className="line"></div>
            <div className="cat"></div>
            <div className="button-skel"></div>
            <div className="button-skel big"></div>
          </div>
        </td>
      </tr>
    )
}

export const ProjectSkeleton = () => {
    return(
        <div className="skeleton project-list">
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
            <div className="project-list-item">
                <div className="cat"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}

export const CreateSkeletons = ({iterations, children}) => {
    let res = [];
    for (let i = 0; i < iterations; i++) {
        res.push(children)
    }
    return res;
}
