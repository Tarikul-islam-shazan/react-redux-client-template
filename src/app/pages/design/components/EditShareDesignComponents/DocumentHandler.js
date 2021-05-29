import React, { Component } from 'react';
import { renderImageOrIcon } from '../../../../commonComponents/renderImageOrIcon';
import { addImageSuffix, getImageExt, IMAGE_EXTS } from '../../../../services/Util';

export const DocumentHandler = ({data, title, name, classes, visibleDocType, setVisibleDocType, onFileSelect, onFileRemove}) => {
  if (!data.length) {
    return (
      <div class="item">
          <div class="type-of-img-name">
              <span class="font-20">{title}</span>
          </div>
          <div class={`uploader ${classes}`}>
              <label for={name} class="drag-upload">&nbsp;</label>
              <input type="file" class="file-upload" id={name} name={name} onChange={(e) => onFileSelect(e, e.target.name)} multiple/>
              {/*<div class="center-center">
                  <div id="loading-spinner"></div>
              </div>*/}
          </div>
      </div>
    )
  }

  return(
    <div class="item">
        <div class="type-of-img-name d-flex justify-content-between align-items-center">
            <span class="font-20">{title}</span>
            <span class="add-more-img">
                <div class="upload-btn-wrapper">
                  <button class="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g id="Group_11129" data-name="Group 11129" transform="translate(-750 -184)">
                        <g id="Rectangle_6032" data-name="Rectangle 6032" transform="translate(780 184) rotate(90)" fill="rgba(190,205,239,0.25)" stroke="#21242b" stroke-width="1" opacity="0.623">
                          <rect width="30" height="30" rx="4" stroke="none"/>
                          <rect x="0.5" y="0.5" width="29" height="29" rx="3.5" fill="none"/>
                        </g>
                        <path id="close_3_" data-name="close (3)" d="M4.834,4.15,8.843.142a.483.483,0,0,1,.684.684L5.517,4.834,9.526,8.843a.483.483,0,0,1-.684.684L4.834,5.517.825,9.526a.483.483,0,0,1-.684-.684L4.15,4.834.142.825A.483.483,0,0,1,.825.142Z" transform="translate(764.836 192) rotate(45)" fill="#472f91"/>
                      </g>
                    </svg>
                  </button>
                  <input type="file" name="myfile" name={name} onChange={(e) => onFileSelect(e, e.target.name)} multiple/>
                </div>
            </span>
        </div>

        <ul class="p-img-container">
        {
          data.map((item, i) => {
            if (IMAGE_EXTS.includes(getImageExt(item.docUrl))) {
              return(
                <li key={`responsive_${i}`}>
                    <div class="p-img">
                        {
                          renderImageOrIcon(item.docUrl, '_xthumbnail', item.name)
                        }
                        <div class="dlt" onClick={() => onFileRemove(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <g id="Group_11045" data-name="Group 11045" transform="translate(-396 -260)">
                                    <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(428 260) rotate(90)" fill="rgba(253,39,39,0.05)"></rect>
                                    <g id="delete" transform="translate(405.358 267.001)">
                                        <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"></path>
                                        <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"></path>
                                        <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"></path>
                                        <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </li>
              )
            } else {
              return(
                <li key={`responsive_${i}`} className="cursor-pointer">
                    <div class="files">
                        {
                          renderImageOrIcon(item.docUrl, '_xthumbnail', item.name)
                        }
                        <div class="dlt" onClick={() => onFileRemove(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <g id="Group_11045" data-name="Group 11045" transform="translate(-396 -260)">
                                    <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(428 260) rotate(90)" fill="rgba(253,39,39,0.05)"></rect>
                                    <g id="delete" transform="translate(405.358 267.001)">
                                        <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"></path>
                                        <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"></path>
                                        <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"></path>
                                        <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </li>
              )
            }

          })
        }
        </ul>
        {
          data.length > 1 ?
          <div class={`more-item font-18 brand-color text-underline mt-2 cursor-pointer ${visibleDocType === name ? `open` : ``}`} onClick={() => setVisibleDocType(name)}>{data.length - 1} more file</div>
          : <></>
        }
    </div>
  )
}
