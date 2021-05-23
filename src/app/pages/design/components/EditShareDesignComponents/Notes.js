import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

import { parseHtml } from '../../../../services/Util';

let toolbarConfig = {display: []};

export const Notes = ({data, flag, flagName, toggleFlag, onChange, onSubmit}) => {
  if (flag) {
    return (
      <>
        <div class="form-group">
            <div className="d-flex justify-content-between align-items-center position-relative">
                <label>Notes</label>
                <span className="p-edit cursor-pointer">
                    <span className="p-edit cursor-pointer" onClick={() => onSubmit(flagName)}>
                        <span className="d-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                                <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                                    <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538"
                                          transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b"
                                          stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                                    <path id="Path_29431" data-name="Path 29431"
                                          d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z"
                                          transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="1.5"></path>
                                </g>
                            </svg>
                        </span>
                            <div className="done">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                                <path id="Path_27878" data-name="Path 27878" d="M2444.531-5030.171l4.091,4.335,12.533-11.748"
                                      transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b"
                                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                </svg>
                            </div>
                    </span>
                 </span>
            </div>
            <RichTextEditor
              className="rich-text"
              toolbarConfig={toolbarConfig}
              value={data.note}
              placeholder="Write here....."
              onChange={(val) => onChange('note', val)}
              toolbarStyle={{display: 'none'}}
            />
        </div>
      </>
    )
  }
  return (
    <>
      <div class="form-group">
          <div className="d-flex justify-content-between align-items-center position-relative">
              <label>Notes</label>
              <span className="p-edit cursor-pointer" onClick={() => toggleFlag(flagName)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                      <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                        <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)"
                              fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"></path>
                        <path id="Path_29431" data-name="Path 29431"
                              d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z"
                              transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="1.5"></path>
                      </g>
                    </svg>
              </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: parseHtml(data.note ? data.note.toString('html') : '') }}/>
      </div>
    </>
  )
}
