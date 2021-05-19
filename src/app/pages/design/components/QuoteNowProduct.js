import React, { useState, useEffect } from "react";
import { addImageSuffix } from '../../../services/Util';
import {fetchGeneralSettingsData} from '../../../actions';

export const QuoteNowProduct = ({product, index, onChange, remove}) => {
  const [defaultValue, setDefaultValue] = useState({
    TURN_AROUND_TIME: "",
    MOQ: "",
  });

  const fetchData = async () => {
    const keys = ['MOQ', 'TURN_AROUND_TIME']
    const data = await fetchGeneralSettingsData(keys);
    if (data) {
    setDefaultValue({
        TURN_AROUND_TIME: data["TURN_AROUND_TIME"]
          ? data["TURN_AROUND_TIME"].value
          : "",
        MOQ: data["MOQ"] ? data["MOQ"].value : "",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  let flag = 1;
  let total = 0;
 
  const getTotal = (sizeQuantityPairList) => {
    sizeQuantityPairList.map((pair, key) => {
      if (pair.quantity) {
        total += parseInt(pair.quantity);
      }
    })
    return total;
  }
  return(
    <div className="quote-list mb-3 d-flex justify-content-between align-items-start">
        <div className="dlt" onClick={() => remove(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <g id="Group_11204" data-name="Group 11204" transform="translate(-1233 -282)">
                    <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(1265 282) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                    <g id="delete" transform="translate(1242.358 289.001)">
                        <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                        <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                        <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                        <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                    </g>
                </g>
            </svg>
        </div>
        <div className="quote-info d-flex">
          {
            product.documentResponseList.length > 0 ?
            product.documentResponseList.map((doc,i) => {
              if(doc.docType=='PRODUCT_DESIGN' && flag){
                flag = 0;
                return (
                  <a href="#"><img src={addImageSuffix(doc.docUrl, '_xthumbnail')} alt="" className="radius-3"/></a>
                )
              }
              if(product.documentResponseList.length==i+1 && flag){
                return(
                  <a href="#"><img src={product.documentResponseList[0].docUrl} alt="" className="radius-3"/></a>
                )
              }
            })
            :
            <a href="#"><img src={require("../../../assets/images/default_product.svg")} alt="" className="radius-3"/></a>
          }
            <div className="info-right ml-4">
                <a href="#" className="font-weight-bold m-0 mt-2 font-20 ellipse-2-line">{product.name ? product.name : 'N/A'}</a>
                <div className="features add-quote-list d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Product category</label>
                        <h5 className="font-18 semibold">{product.productType}, {product.productGroup}</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">MOQ</label>
                        <h5 className="font-18 semibold">
                          {product.minimumOrderQuantity ? product.minimumOrderQuantity : product.minimumOrderQuantity=defaultValue.MOQ} pcs
                        </h5>
                    </div>
                </div>
                <div className="features add-quote-list d-flex flex-column flex-sm-row">
                    <div className="info-item mr-5">
                        <label className="font-14 text-muted">Fabric details</label>
                        <h5 className="font-18 semibold">{product.fabricComposition} {product.fabricWeight} GSM</h5>
                    </div>
                    <div className="info-item">
                        <label className="font-14 text-muted">Delivery in</label>
                        <h5 className="font-18 semibold">
                          {product.turnAroundTime ? product.turnAroundTime : defaultValue.TURN_AROUND_TIME} Days
                        </h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="size-n-color d-flex align-items-center justify-content-center flex-column">
            <div className="sizes d-flex  align-items-center mb-2">
                <div className="size">
                    <label className="text-center">&nbsp;</label>
                </div>
                <div className="size">
                    <label className="text-center">XS</label>
                </div>
                <div className="size">
                    <label className="text-center">S</label>
                </div>
                <div className="size">
                    <label className="text-center">M</label>
                </div>
                <div className="size">
                    <label className="text-center">L</label>
                </div>
                <div className="size">
                    <label className="text-center">XL</label>
                </div>
                <div className="size total">
                    <label className="text-right">Total</label>
                </div>
            </div>
        {
          product.colorWiseSizeQuantityPairList.map((colorWithSize, colorIndex) => {
            return(
              <div class="sizes d-flex  align-items-center">
                  <div class="size">
                      <div class="product-color" style={{background: colorWithSize.hexCode}}></div>
                  </div>
                  {
                    colorWithSize.sizeQuantityPairList.map((pair, key) => {
                      return(
                        <div className="size">
                            <input type="text" placeholder="00" value={pair.quantity} onChange={(e) => onChange(index, colorIndex, pair.code, e.target.value)} className="bg-gray-light"/>
                        </div>
                      )
                    })
                  }
                  <div className="size total">
                      <input type="text" placeholder="00" value={getTotal(colorWithSize.sizeQuantityPairList)} className="bg-blue-light" disabled/>
                  </div>
              </div>
            )
          })
        }
        <p className="error">{product.error}</p>
        </div>
    </div>
  )
}
