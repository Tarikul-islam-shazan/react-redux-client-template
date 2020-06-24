import React, { Component } from 'react';
export const CancellableImage = ({src,close}) => {
  let flag = 1;
  // console.log("from image component",item)
  return (
    <>
      <button id = "x" onClick={close}
        style={{position:'absolute',background:'white',color:'red',top:'-10',right:'-10',borderRadius:15,fontSize:11}}
        >
          X
      </button>
      <img src={src} style={{height:50,width:50,margin:5,border:'solid 1px black'}} />
    </>
  )
}
