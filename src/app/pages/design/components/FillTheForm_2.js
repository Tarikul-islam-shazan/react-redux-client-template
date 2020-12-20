import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import { UploadedItem } from '../../../commonComponents/UploadedItem';

import { _storeData } from "../actions";

class FillTheForm_2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          productImageError : ''
        };
    }

    componentDidMount = async() => {
      loadjs(['/js/script.js','/js/custom.js']);
    }

    onFileSelect = (e,docType) => {
      // console.log("upload",e.target.name);
      // return;
      let { productImage, referenceImages, referenceProduct1, referenceProduct2 } = this.props.product;
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
  			"docMimeType" : file.type,
  			"documentType" : docType,
  			"print": false,
  			"base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        data.base64Str = reader.result;
        console.log(key,data);
        this.props._storeData(key,data)
        if(docType=='PRODUCT_DESIGN'){
          this.setState({
            productImageError : ''
          })
        }
        // console.log("base64",reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    onMultipleFileSelect = async(e,docType) => {
      let key = e.target.name;
      let arr = this.props.product[key];
      // let arr = referenceImages;
      let files = Array.from(e.target.files);
      // console.log(Array.from(e.target.files));
      // return;
      await files.map((item) => {
        let data = {
          "name": item.name,
    			"docMimeType" : item.type,
    			"documentType" : docType,
    			"print": false,
    			"base64Str":""
        }
        // console.log('data',data)
        let reader = new FileReader()
        reader.readAsDataURL(item)
        reader.onload = () => {
          data.base64Str = reader.result;
          arr.push(data);
          this.props._storeData(key,arr)
          // console.log(key,arr[0]);
          // console.log("base64",reader.result)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      })
      // console.log("data multiple",arr[0])
    }

    removeFromArray = (keyName,itemIndex) => {
      let data = this.props.product[keyName]
      data = data.filter((item,i) => {
        return i!=itemIndex;
      })
      this.props._storeData(keyName,data)
    }

    next = () => {
      let { productImage, referenceImages, referenceProduct1, referenceProduct2 } = this.props.product;
      if(productImage.name){
        this.props._goToFormStep(2)
      }else{
        this.productImageInput.scrollIntoView();
        this.productImageInput.focus();
        this.setState({
          productImageError : 'Product image is required'
        })
      }
    }

    render() {
        let { productImage, referenceImages, referenceProduct1, referenceProduct2 } = this.props.product;
        let { productImageError } = this.state;
        return (
          <>
            <div className="steps">
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-1" type="button" className="btn btn-circle btn-default done">1</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-2" type="button" className="btn btn-default btn-circle btn-success active-line">2</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-3" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-form">
                 <div className="row-box">
                  <div className="row-item">
                      <div className="row">
                          <div className="col-lg-4">
                              <div className="form-group">
                                  <label>Upload product image*</label>
                                  <div className="file file-style-2 btn">
                                      Choose file
                                      <input ref={(input) => { this.productImageInput = input; }} type="file" name="productImage" onChange={(e) => this.onFileSelect(e,'PRODUCT_DESIGN')} />
                                  </div>
                              </div>
                              {
                                productImageError ? <span className="error">{productImageError}</span> : ''
                              }
                          </div>
                          <div className="col-lg-8">
                            <div className="form-group">
                            {
                              productImage.name &&
                              <UploadedItem item={productImage} remove={() => this.props._storeData('productImage',{})} />
                            }
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="row-item">
                      <div className="row">
                          <div className="col-lg-4">
                              <div className="form-group">
                                  <label>Upload reference images</label>
                                  <div className="file file-style-2 btn">
                                      Choose files
                                      <input type="file" name="referenceImages" onChange={(e) => this.onMultipleFileSelect(e,'REFERENCE_IMAGE')} multiple/>
                                  </div>

                              </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="form-group">
                              {
                                referenceImages.map((item,_key) => {
                                  return(
                                    <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('referenceImages',_key)} />
                                  )
                                })
                              }
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="row-item">
                      <div className="row">
                          <div className="col-lg-4">
                              <div className="form-group">
                                  <label>Print Design Files</label>
                                  <div className="file file-style-2 btn">
                                      Choose file
                                      <input type="file" name="referenceProduct1" onChange={(e) => this.onMultipleFileSelect(e,'PRINT_DESIGN')} multiple />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="form-group">
                              {
                                referenceProduct1.map((item,_key) => {
                                  return(
                                    <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('referenceProduct1',_key)} />
                                  )
                                })
                              }
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="row-item">
                      <div className="row">
                          <div className="col-lg-4">
                              <div className="form-group">
                                  <label>Embroidery Design Files</label>
                                  <div className="file file-style-2 btn">
                                      Choose file
                                      <input type="file" name="referenceProduct2" onChange={(e) => this.onMultipleFileSelect(e,'EMBROIDERY_DESIGN')} multiple />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="form-group">
                              {
                                referenceProduct2.map((item,_key) => {
                                  return(
                                    <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('referenceProduct2',_key)} />
                                  )
                                })
                              }
                            </div>
                          </div>
                      </div>
                  </div>
                 </div>
              <div className="row">
                  <div className="col-lg-12">
                      <button className="btn-brand float-right mt-4" onClick={this.next}>Next</button>
                      <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={(e) => this.props._goToFormStep(0)}>Back</button>
                  </div>
              </div>
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
  return {
		product: store.product
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			_storeData
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(FillTheForm_2);
