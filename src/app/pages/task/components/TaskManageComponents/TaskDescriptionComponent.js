import React, { Component } from 'react';

export const TaskDescriptionComponent = ({data, flag, flagName, toggleFlag, onChange, update, cancel}) => {

  const toggle = () => {
    if (!flag) {
      toggleFlag(flagName);
    }
  }

  return (
    <div className={`short-note ${flag ? `open` : ``}`} onClick={toggle}>
        <textarea name="stepDescription" cols="30" rows="4" disabled={!flag} value={data.stepDescription} onChange={(e) => onChange('stepDescription', e.target.value)}/>
        <div className="save-note">
            <button onClick={() => update(flagName)}>Save</button>
            <div className="close-note cursor-pointer" onClick={cancel}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 1.91L12.59 0.5L7 6.09L1.41 0.5L0 1.91L5.59 7.5L0 13.09L1.41 14.5L7 8.91L12.59 14.5L14 13.09L8.41 7.5L14 1.91Z" fill="#222222"/>
                </svg>
            </div>
        </div>
    </div>
  )
}
