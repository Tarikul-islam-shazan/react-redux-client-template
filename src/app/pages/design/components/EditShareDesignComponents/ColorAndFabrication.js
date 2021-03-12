import React, { Component } from 'react';
import ColorRowWithPicker from "../ColorRowWithPicker";

export const ColorAndFabrication = ({data, errors, productTypeList, flag, flagName, toggleFlag, addColor, removeColor, onChange, onSubmit, classes}) => {
  let productTypeName = '';

  productTypeList.map((item) => {
    item.types.map((item2)=>{
      if (item2.id == data.productTypeId) {
        productTypeName = item2.name;
      }
    })
  })

  const onChangeColor = (e) => {
    onChange(e.target.name, e.target.value)
  }

  if (flag) {
    return (
      <div className={classes}>
          <span className="p-edit cursor-pointer" onClick={() => onSubmit(flagName)}>
               <span className="d-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                      <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                        <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        <path id="Path_29431" data-name="Path 29431" d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z" transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                      </g>
                    </svg>
               </span>
                <div className="done">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                      <path id="Path_27878" data-name="Path 27878" d="M2444.531-5030.171l4.091,4.335,12.533-11.748" transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </div>
          </span>
          <div className="form-group">
              <label>Product type*</label>
              <select className={`w-100 bg-gray-light border-0 ${errors.productTypeIdError ? `error2` : ``}`} name="productTypeId" value={data.productTypeId} onClick={(e) => onChange(e.target.name, e.target.value)}>
                  <option value="">Select product type</option>
                  {
                    productTypeList.map((item,i) => {
                      let res = [];
                      res.push(<option key={i} value="" disabled>{item.groupName}</option>)
                      item.types.map((item2,j)=>{
                        res.push(
                          <option key={j+1000} value={item2.id}>{item2.name}</option>
                        )
                      })
                      return res;
                    })
                  }
              </select>
              {
                errors.productTypeIdError ? <label className="error">{errors.productTypeIdError}</label> : <></>
              }
          </div>
          <div className="form-group">
              <label>Fabric type</label>
              <input type="text" className={errors.fabricTypeError ? 'error2' : ''} placeholder="Enter fabric type" name="fabricType" value={data.fabricType} onChange={(e) => onChange(e.target.name, e.target.value)}/>
              {
                errors.fabricTypeError ? <label className="error">{errors.fabricTypeError}</label> : <></>
              }
          </div>
          <div className="form-group">
              <label>Fabric details</label>
              <input type="text" className={errors.fabricDetailsError ? 'error2' : ''} placeholder="Enter fabric details" name="fabricDetails" value={data.fabricDetails} onChange={(e) => onChange(e.target.name, e.target.value)}/>
              {
                errors.fabricDetailsError ? <label className="error">{errors.fabricDetailsError}</label> : <></>
              }
          </div>
          <div className="form-group">
                  <table className="w-100 pick-color-table">
                      <thead>
                          <tr>
                              <th><label>Color</label></th>
                              <th><label>Color name</label></th>
                              <th className="text-right">
                                  <span className="cursor-pointer" onClick={addColor}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                          <g id="Group_11133" data-name="Group 11133" transform="translate(-421 -880)">
                                              <g id="Rectangle_6032" data-name="Rectangle 6032" transform="translate(451 880) rotate(90)" fill="rgba(190,205,239,0.25)" stroke="#21242b" stroke-width="1" opacity="0.623">
                                              <rect width="30" height="30" rx="4" stroke="none"/>
                                              <rect x="0.5" y="0.5" width="29" height="29" rx="3.5" fill="none"/>
                                              </g>
                                              <path id="close_3_" data-name="close (3)" d="M4.834,4.15,8.843.142a.483.483,0,0,1,.684.684L5.517,4.834,9.526,8.843a.483.483,0,0,1-.684.684L4.834,5.517.825,9.526a.483.483,0,0,1-.684-.684L4.15,4.834.142.825A.483.483,0,0,1,.825.142Z" transform="translate(435.836 888) rotate(45)" fill="#472f91"/>
                                          </g>
                                      </svg>
                                  </span>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                        data.colors && data.colors.map((colorObj, i) => {
                          return (
                            <ColorRowWithPicker item={colorObj} key={i} index={i} data={data.colors} onChangeColor={onChangeColor} remove={removeColor} />
                          )
                        })
                      }
                      </tbody>
                  </table>
          </div>
      </div>
    )
  }
  return(
    <div className={classes}>
        <span className="p-edit cursor-pointer" onClick={() => toggleFlag(flagName)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                  <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                  <path id="Path_29431" data-name="Path 29431" d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z" transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                </g>
              </svg>
        </span>
        <div className="form-group">
            <label>Product type*</label>
            <span>{productTypeName}</span>
        </div>
        <div className="form-group">
            <label>Fabric type</label>
            <span>{data.fabricType}</span>
        </div>
        <div className="form-group">
            <label>Fabric details</label>
            <span>{data.fabricDetails}</span>
        </div>
        <div className="form-group">
            <label>Color</label>
            {
              data.colors && data.colors.map((colorObj, i) => {
                return (
                  <div className="mb-2">
                      <span>
                          <span className="color-circle mr-2" style={{background: colorObj.hexCode}}></span>
                          {colorObj.hexCode} - {colorObj.name}
                      </span>
                  </div>
                )
              })
            }
        </div>
    </div>
  )
}
