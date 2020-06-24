import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';

import { _storeData } from "../actions";
import { LOADER_STYLE, LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

class UploadTechPack extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          colors : [
            // {
            //   id : 0,
            //   quantity : 0
            // }
          ],
          colorError : [{
            idError : '',
            quantityError : ''
          }]
        };
    }

    componentDidMount = async() => {
      await Http.GET('getColorType')
        .then(({data}) => {
          console.log('getColorType SUCCESS: ', data);
          // localStorage.removeItem('token');
          this.setState({loading:false})
          if(data.length>0){
            this.setState({
              colors : data
            })
          }else{
            // toastError("Request wasn't successsful.");
          }
          loadjs(['/js/script.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    addColorObj = async() => {
      let { colorListTP } = this.props.product;
      let { colorError } = this.state;
      colorListTP.push({
        id : '',
        quantity : ''
      })
      colorError.push({
        idError : '',
        quantityError : ''
      })
      await this.setState({
        colorError
      })
      this.props._storeData('colorListTP',colorListTP)
      loadjs(['/js/script.js']);
    }

    removeColorObj = async() => {
      let { colorListTP } = this.props.product;
      let { colorError } = this.state;
      colorListTP.pop();
      colorError.pop();
      await this.setState({
        colorError
      })
      this.props._storeData('colorListTP',colorListTP)
      loadjs(['/js/script.js']);
    }

    onColorChange = ( e , index ) => {
      let { colorListTP } = this.props.product;
      colorListTP[index][e.target.name] = e.target.value;
      this.props._storeData('colorListTP',colorListTP)
      loadjs(['/js/script.js']);
    }

    hasErrorColor = () => {
      let { colorListTP } = this.props.product;
      let colorError = [];
      let flag = false;
      colorListTP.map((item,i) => {
        let temp = {
          idError : '',
          quantityError : ''
        };
        if(item.id==''){
          flag = true;
          temp.idError = 'Color is required';
        }
        if(item.quantity==''){
          flag = true;
          temp.quantityError = 'Quantity is required';
        }
        colorError.push(temp);
      })
      // console.log("colorError from validation",colorError);
      this.setState({
        colorError
      })
      return flag;
    }

    onFileSelect = (e,docType) => {
      // console.log("upload",e.target.name);
      // return;
      let { techPackFile, productImageList, referenceImageList } = this.props.product;
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
        // console.log("base64",reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    onMultipleFileSelect = async(e,docType) => {
      let { productImageList, referenceImageList } = this.props.product;
      let arr = [];
      let files = Array.from(e.target.files);
      let key = e.target.name;
      console.log(Array.from(e.target.files));
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

    onChange = (e) => {
      this.props._storeData(e.target.name,e.target.value)
    }

    submit = () => {
      let { techPackName, colorListTP, productImageList, referenceImageList, techPackFile } = this.props.product;
      if(techPackName == ''){
        this.setState({
          techPackNameError : 'Product Name is required'
        })
      }else{
        this.setState({
          techPackNameError : ''
        })
      }
      if(this.hasErrorColor() || !techPackName){

      }else{
        let body = {
          name : techPackName,
          productCreationType : "FROM_TECH_PACK",
          techPackDto : techPackFile,
          colorDTOList : colorListTP,
          documentDTOList : [...productImageList,...referenceImageList]
        };

        console.log("body",body);
        // return;
        this.setState({loading:true})
        Http.POST('addProduct',body)
          .then(({data}) => {
            console.log('addProduct SUCCESS: ', JSON.stringify(data));
            // localStorage.removeItem('token');
            this.setState({loading:false})
            if(data.success){
              toastSuccess(data.message);
              this.props._goToStep(1)
            }else{
              toastError(data.message);
            }

          })
          .catch(response => {
              console.log('LOGIN Error: ', JSON.stringify(response));
              this.setState({loading:false})
              toastError("Something went wrong! Please try again.");
          });
      }
    }

    render() {
        let { colorListTP, productImageList, referenceImageList, techPackFile, techPackName } = this.props.product;
        // console.log("from render", productImageList[0]);
        let { colorError, techPackNameError } = this.state;
        return (
            <LoadingOverlay
              active={this.state.loading}
              styles={{
                overlay: (base) => ({
                  ...base,
                  background: LOADER_OVERLAY_BACKGROUND
                }),
                spinner: (base) => ({
                  ...base,
                  width: LOADER_WIDTH,
                  position: LOADER_POSITION,
                  top: LOADER_TOP,
                  left: LOADER_LEFT,
                  marginTop: LOADER_MARGIN_TOP,
                  marginLeft: LOADER_MARGIN_LEFT,
                  '& svg circle': {
                    stroke: LOADER_COLOR
                  }
                }),
                content: (base) => ({
                  ...base,
                  color: LOADER_COLOR
                })
              }}
              spinner
              text={LOADER_TEXT}>
                <div className="modal-form">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Product Name*</label>
                                <input type="text" name="techPackName" value={techPackName} onChange={this.onChange} placeholder="Enter product name"/>
                                {
                                  techPackNameError ? <span className="error">{techPackNameError}</span> : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="drug-n-drop">
                        <div className="head-title">
                            <h4>Drag and drop file</h4>
                            <span>or</span>
                            <p>Upload your detail Tech Pack here</p>
                        </div>
                        <div className="file btn">
                            Choose file
                            <input type="file" name="techPackFile" onChange={(e) => this.onFileSelect(e,'PRODUCT_DESIGN')} />
                        </div>
                        <span style={{paddingLeft:10}}>{techPackFile.name}</span>
                    </div>
                    <div className="row-box">
                     <div className="row-item">
                         <div className="row">
                             <div className="col-lg-3">
                                 <div className="form-group">
                                     <label>Upload product image</label>
                                     <div className="file file-style-2 btn">
                                         Choose file
                                         <input type="file" name="productImageList" onChange={(e) => this.onMultipleFileSelect(e,'PRODUCT_DESIGN')} multiple />
                                     </div>
                                 </div>
                             </div>
                             <div className="col-lg-9">
                                 <div className="form-group">
                                    {
                                      productImageList.map((item,i) => {
                                        return(
                                          <div className="demo-product-card" key={i}>
                                              <span>{item.name}</span>
                                              <img src={item.base64Str} alt={item.name} style={{height:50,width:80}}/>
                                              <div className="close-demo"></div>
                                          </div>
                                        )
                                      })
                                    }
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="row-item">
                         <div className="row">
                             <div className="col-lg-3">
                                 <div className="form-group">
                                     <label>Upload reference Images</label>
                                     <div className="file file-style-2 btn">
                                         Choose file
                                         <input type="file" name="referenceImageList" onChange={(e) => this.onMultipleFileSelect(e,'PRODUCT_DESIGN')} multiple />
                                     </div>
                                 </div>
                             </div>
                             <div className="col-lg-9">
                                <div className="form-group">
                                  {
                                    referenceImageList.map((item,i) => {
                                      return(
                                        <div className="demo-product-card" key={i}>
                                            <span>{item.name}</span>
                                            <img src={item.base64Str} alt={item.name} style={{height:50,width:80}}/>
                                            <div className="close-demo"></div>
                                        </div>
                                      )
                                    })
                                  }
                                    {/*<div className="demo-product-card uploading">
                                        <span>Demo product</span>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}></div>
                                          </div>
                                        <div className="close-demo"></div>
                                    </div>*/}
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                 <div className="row mt-4">
                 {
                   colorListTP.map(( item , i ) => {
                     return(
                       <React.Fragment key={i}>
                        {
                          this.state.colors.length ?
                          <>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Color*</label>
                                    <select className="nice-select" name="id" value={item.id} onClick={(e) => this.onColorChange(e,i)}>
                                        <option value="">Choose Color</option>
                                        {
                                          this.state.colors.map((item,i) => (
                                            <option key={i} value={item.id}>{item.name}</option>
                                          ))
                                        }
                                    </select>
                                    {
                                      colorError[i].idError ? <span style={{color:'red'}}>{colorError[i].idError}</span> : ''
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Total Quantity*</label>
                                    <input type="text" placeholder="Enter Quantity" name="quantity" value={item.quantity} onChange={(e) => this.onColorChange(e,i)}/>
                                    {
                                      colorError[i].quantityError ? <span style={{color:'red'}}>{colorError[i].quantityError}</span> : ''
                                    }
                                </div>
                            </div>
                          </> :
                          <div className="col-lg-12">
                            <p>No color list found.</p>
                          </div>
                        }

                       </React.Fragment>
                     )
                   })
                 }
                </div>
                <div className="row">
                    <div className="col-md-12">
                      <div className="add-new color" onClick={this.addColorObj}>
                          <span>Add Color</span>
                      </div>
                      {
                        colorListTP.length > 1 ?
                        <div className="add-new reduce color" onClick={this.removeColorObj} style={{marginLeft:10,color:'red'}}>
                            <span>Reduce Color</span>
                        </div> :
                        <></>
                      }
                    </div>
                </div>
                 <div className="row">
                     <div className="col-lg-12">
                         <button className="btn-brand float-right" onClick={this.submit}>Submit</button>
                     </div>
                 </div>
               </div>
            </LoadingOverlay>
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


export default connect(mapStateToProps, mapDispatchToProps)(UploadTechPack);
