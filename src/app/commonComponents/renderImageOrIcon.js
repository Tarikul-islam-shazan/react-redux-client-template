import React, { Component } from 'react';

import { PDF, DOC, XLSX, AI, DOCX, PPTX, PPT, CUSTOM_ICON } from './FileIcons';
import { addImageSuffix, getImageExt, IMAGE_EXTS } from '../services/Util';

export const renderImageOrIcon = (url, conversion, name = '') => {
  let ext = getImageExt(url);
  let result = [];
  let flag = true;
  if (IMAGE_EXTS.includes(ext)) {
      flag = false;
      result.push(<img src={addImageSuffix(url, conversion)} alt=""/>);
  } else {
      result.push(<CUSTOM_ICON url={url} ext={ext}/>);
  }

  let res = name.split('_');
  if (res.length > 1) {
      res.shift();
  }

  return (
    <div class="uplded-file d-flex flex-column justify-content-center align-items-center" onClick={() => download(url)}>
    {
      result
    }
    {
      flag ?
      <a href="#" class="font-18 text-underline brand-color font-weight-normal mt-3" style={{wordBreak: 'break-all', padding: 10}}>{res.join('_')}</a>
      :
      <></>
    }
    </div>
  );
}


const download = (url) => {
  const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';

    let splits = url.split('/');
    let name = 'sampleFile';
    if (splits.length) {
      name = splits[splits.length - 1];
    }
    link.setAttribute(
      'download',
      name,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
}
