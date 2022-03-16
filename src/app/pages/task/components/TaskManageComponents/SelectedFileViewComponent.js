import React, { Component } from 'react';
import { parseHtml, IMAGE_EXTS, getImageExt } from '../../../../services/Util';

export const SelectedFileViewComponent = ({file, showRemoveOption, index, remove}) => {
  let ext = getImageExt(file.name);
    if ( IMAGE_EXTS.includes(ext)) {
    return (
      <div className="item">
      {
        showRemoveOption ?
        <div className="close" onClick={() => remove(index)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#8B8B8B"></circle>
                <path d="M11.5 5.205L10.795 4.5L8 7.295L5.205 4.5L4.5 5.205L7.295 8L4.5 10.795L5.205 11.5L8 8.705L10.795 11.5L11.5 10.795L8.705 8L11.5 5.205Z" fill="white"></path>
            </svg>
        </div> : <></>
      }

          <a href={file.docUrl} target="_blank">
              <img src={showRemoveOption ? file.base64Str : file.docUrl} alt=""/>
          </a>
      </div>
    )
  }

  return (
    <div className="item file-item">
        {
            showRemoveOption ?
                <div className="close" onClick={() => remove(index)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#8B8B8B"></circle>
                        <path d="M11.5 5.205L10.795 4.5L8 7.295L5.205 4.5L4.5 5.205L7.295 8L4.5 10.795L5.205 11.5L8 8.705L10.795 11.5L11.5 10.795L8.705 8L11.5 5.205Z" fill="white"></path>
                    </svg>
                </div> : <></>
        }
        <a href={file.docUrl} target="_blank">
            <span>{ext}</span>
        </a>
    </div>
  )

}
