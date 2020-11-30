import React, { Component } from 'react';
export const CancellableImage = ({src,close}) => {
  let flag = 1;
  // console.log("from image component",item)
  return (
    <div className="img-item">
      <button id = "x" onClick={close}>X</button>
      <img src={src} />
    </div>
  )
}
