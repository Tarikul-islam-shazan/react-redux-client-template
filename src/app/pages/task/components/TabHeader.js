import React, { Component } from 'react';

export const TabHeader = ({title, value, selectedTab, selfName, onClick}) => {
  return (
    <li onClick={() => onClick(selfName)} className={`${selectedTab === selfName ? `active` : ``}`}>
      {`${title} `}
      {
        selfName !== 'COMPLETE' && value ?
        <span className="task-count">{value !== undefined ? (value > 99 ? `99+` : value) : `--`}</span>
        : <></>
      }
    </li>
  )
}
