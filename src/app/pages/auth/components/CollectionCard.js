import React, { Component } from 'react';
import { addImageSuffix } from '../../../services/Util';
export const CollectionCard = ({collection, remove, edit, details}) => {
  return(
    <tr>
        <td>{collection.collectionName}</td>
        <td>{collection.numOfDesign}</td>
        <td>{collection.privacy}</td>
        <td>{collection.dateCreated}</td>
        <td>{collection.createdBy}</td>
        <td>
            <button type="button" class="action bg-transparent" onClick={() => details(collection.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18">
                    <g id="eye" transform="translate(1 1)">
                        <path id="Path_29452" data-name="Path 29452" d="M1,12S5,4,12,4s11,8,11,8-4,8-11,8S1,12,1,12Z" transform="translate(-1 -4)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <circle id="Ellipse_181" data-name="Ellipse 181" cx="3" cy="3" r="3" transform="translate(8.288 5)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                </svg>
            </button>
            <button type="button" class="action bg-transparent" onClick={() => edit(collection.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.311" height="22.121" viewBox="0 0 22.311 22.121">
                    <g id="edit" transform="translate(1 1)">
                        <path id="Path_29453" data-name="Path 29453" d="M11,4H4A2,2,0,0,0,2,6V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V13" transform="translate(-2 -1.879)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <path id="Path_29454" data-name="Path 29454" d="M18.5,2.5a2.121,2.121,0,0,1,3,3L12,15,8,16l1-4Z" transform="translate(-2 -1.879)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                </svg>

            </button>
            <button type="button" class="action bg-transparent" onClick={() => remove(collection.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
                    <g id="trash-2" transform="translate(1 1)">
                        <path id="Path_29455" data-name="Path 29455" d="M3,6H21" transform="translate(-3 -2)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <path id="Path_29456" data-name="Path 29456" d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" transform="translate(-3 -2)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <line id="Line_346" data-name="Line 346" y2="6" transform="translate(7.288 9)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <line id="Line_347" data-name="Line 347" y2="6" transform="translate(11.288 9)" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </g>
                </svg>
            </button>
        </td>
    </tr>
  )
}
