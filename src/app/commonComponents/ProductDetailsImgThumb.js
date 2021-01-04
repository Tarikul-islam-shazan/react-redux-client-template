import React, { Component } from 'react';

const IMAGE_EXTENSION = ['jpg', 'jpeg', 'png'];

export const ProductDetailsImgThumb = ({item, index, showGallery, docs}) => {
  let splits = item.name.split('.');
  let extension = '';
  if (splits.length) {
    extension = splits[splits.length - 1];
  }
  if (IMAGE_EXTENSION.includes(extension)) {
    return <div className="ref-file mr-2" onPress={() => showGallery(docs, index)}><img src={item.docUrl} alt={item.name}/></div>
  }
  return(
    <div className="ref-file mr-2 download-file text-center d-flex align-items-center justify-content-center">
        <a href="#" className="ellipsis">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="17.596" height="18.769" viewBox="0 0 17.596 18.769">
                    <g id="noun_downlaod_3318602" transform="translate(0 0)" opacity="0.5">
                        <path id="Path_27862" data-name="Path 27862" d="M20.587,65.992a.586.586,0,0,0-.587.587v3.6a.586.586,0,0,0,.587.587H37.009a.587.587,0,0,0,.587-.587v-3.6a.587.587,0,1,0-1.173,0v3.011H21.173V66.579A.587.587,0,0,0,20.587,65.992Z" transform="translate(-20 -51.993)"/>
                        <path id="Path_27863" data-name="Path 27863" d="M37.226,18.258a.586.586,0,0,0-.587.587V31.461l-3.72-3.594a.586.586,0,0,0-.815.844l4.706,4.546h0l.007.006a.568.568,0,0,0,.073.047.556.556,0,0,0,.113.073.58.58,0,0,0,.222.045.6.6,0,0,0,.222-.045,56.792,56.792,0,0,1,.186-.12l4.713-4.554a.587.587,0,0,0-.816-.844L37.813,31.46V18.844A.586.586,0,0,0,37.226,18.258Z" transform="translate(-28.429 -18.258)"/>
                    </g>
                </svg>
                <span className="ellipsis w-100 d-block mt-2 font-12">{item.name}</span>
            </div>
        </a>
    </div>
  )
}
