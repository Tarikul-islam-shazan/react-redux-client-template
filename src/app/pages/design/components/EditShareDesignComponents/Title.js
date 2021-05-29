import React, { Component } from 'react';

export const Title = ({data, errors, flag, flagName, toggleFlag, onChange, onSubmit}) => {
  if (flag) {
    return (
      <div className="name">
           <div className="name-display d-flex justify-content-between align-items-center">

              <div className="edit-design-name w-100">
                    <input type="text" className={`bg-gray-light ${errors.nameError ? `error2` : ``}`} placeholder="Enter design name" name="name" value={data.name} onChange={(e) => onChange(e.target.name, e.target.value)}/>
                    {
                      errors.nameError ? <label className="error">{errors.nameError}</label> : <></>
                    }
                    <span className="done cursor-pointer" onClick={() => onSubmit(flagName)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                          <path id="Path_27880" data-name="Path 27880" d="M2444.531-5030.171l4.091,4.335,12.533-11.748" transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                    </span>
              </div>

           </div>
      </div>
    )
  }
  return(
    <div className="name">
         <div className="name-display d-flex justify-content-between align-items-center">

            <h4 className="font-26 semibold d-flex">{data.name}
                <span className="cursor-pointer pl-3" onClick={() => toggleFlag(flagName)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                        <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                          <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                          <path id="Path_29431" data-name="Path 29431" d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z" transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        </g>
                      </svg>
                </span>
            </h4>
         </div>
    </div>
  )
}
