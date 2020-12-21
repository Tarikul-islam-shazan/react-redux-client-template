import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import { _storeData } from "./actions";
import { UploadedItem } from '../../../commonComponents/UploadedItem';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../../commonComponents/Toast';
import { LOADER_STYLE, LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

class FillTheForm_2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          accessories : [],
          measurementTable:{}
        };
    }

    componentDidMount = async() => {
      console.log("productType",this.props.product.productType)
      let { productType, measurementChart, accessoriesList } = this.props.product;
      if(productType){
        if(measurementChart.length == 0 || accessoriesList.length == 0){
          this.setState({
            loading : true
          })
        }
        accessoriesList.length == 0 && await Http.GET('getAccessoriesList',this.props.product.productType)
          .then(({data}) => {
            console.log('getAccessoriesList SUCCESS: ', data);
            this.setState({
              loading:false
            })
            if(data.length>0){
              this.setState({
                accessories : data
              })
            }else{
              toastWarning("Accessories List - no data found.");
            }
            loadjs(['/js/script.js','/js/custom.js']);
          })
          .catch(({response}) => {
              console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
        measurementChart.length == 0 && await Http.GET('getSizeTableData',this.props.product.productType)
          .then(({data}) => {
            console.log('getSizeTableData SUCCESS: ', data);
            this.setState({
              loading:false
            })
            if(data && data.sizeTableRows){
              this.props._storeData('measurementChart', data.sizeTableRows);
            }else{
              toastWarning("Size table List - no data found.");
              // toastError("Request wasn't successsful.");
            }
            loadjs(['/js/script.js','/js/custom.js']);
          })
          .catch(({response}) => {
              console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }else{
        loadjs(['/js/script.js','/js/custom.js']);
      }
    }

    onFileSelect = (e,docType) => {
      // console.log("upload",e.target.name);
      // return;
      let { productImage, referenceImages, referenceProduct1, referenceProduct2, accessoriesImages } = this.props.product;
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

    onClickAccessories = (e) => {
      // console.log(e.target.name,e.target.value)
      let { accessories } = this.state;
      let { accessoriesList } = this.props.product;
      let flag = false;
      accessoriesList = accessoriesList.filter((item) => {
        if(item.id == e.target.value){
          flag = true;
        }
        return item.id != e.target.value;
      })
      if(!flag){
        accessories.map((item) => {
          if(item.id==e.target.value){
            accessoriesList.push(item);
          }
        })
      }
      this.props._storeData(e.target.name,accessoriesList)
    }

    validateMeasurementChart = (chartList) => {
      let flag = true;
      chartList.map((item,i) => {
        if(item.code==""){
          flag = false;
        }
        if(item.quantity==""){
          flag = false;
        }
        for (const [key, value] of Object.entries(item.measurement)) {
            if(value==""){
              flag = false;
              break;
            }
        }
      })
      return flag;
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
      // console.log("entered",data)
      this.props._storeData(keyName,data)
    }

    submit = () => {
      let {
        name, productType, fabricComposition,
        fabricWeight, colorList,
        // documentList,
        accessoriesList, measurementChart,
        tempColorId, tempQuantity, productImage, referenceImages, referenceProduct1, referenceProduct2, accessoriesImages
      } = this.props.product;

      if(!this.validateMeasurementChart(measurementChart)){
        this.setState({
          tableError : 'All table fields required'
        });
        return ;
      }else{
        this.setState({
          tableError : ''
        });
      }
      console.log(this.validateMeasurementChart(measurementChart));
      // return;
      let documentDTOList = [];

      if(productImage.name){
        documentDTOList.push(productImage);
      }

      if(referenceImages.length){
        documentDTOList = [...documentDTOList,...referenceImages];
      }

      if(referenceProduct1.length){
        documentDTOList = [...documentDTOList,...referenceProduct1];
      }

      if(referenceProduct2.length){
        documentDTOList = [...documentDTOList,...referenceProduct2];
      }

      if(accessoriesImages.length){
        documentDTOList = [...documentDTOList,...accessoriesImages];
      }
      let total = 0;
      colorList.map((item)=>{
        total += parseInt(item.quantity);
      })

      let body = {
        numOfColor : 1,
        name : name,
        note : "Test Note",
        productTypeId : productType,
        productCreationType : "CUSTOM",
        fabricComposition : fabricComposition,
        fabricWeight : fabricWeight,
        totalQuantity : total,
        colorDTOList : colorList,
        size:{
      		sizeText: JSON.stringify({
            sizeTableRows : measurementChart
          })
      	},
        // status: "COMPLETED",
        accessories : accessoriesList,
        documentDTOList : documentDTOList
      };

      console.log("body",body);
      // return;
      this.setState({loading:true})
      Http.POST('addProduct',body)
        .then(({data}) => {
          console.log('LOGIN SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false})
          if(data.success){
            toastSuccess(data.message);
            this.props._closeModal(data.payload)
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

    renderHeader = (obj) => {
      let arr = [];
      for (const [key, value] of Object.entries(obj)) {
          arr.push(<td key={key}>{key}</td>)
      }
      return arr;
    }

    onMeasurementChange = (e,index) => {
      let { measurementChart } = this.props.product;
      if(e.target.name == 'code' || e.target.name == 'amount'){
        measurementChart[index][e.target.name] = e.target.value;
      }else{
        measurementChart[index].measurement[e.target.name] = e.target.value;
      }
      this.props._storeData('measurementChart',measurementChart)
    }

    addTableObj = async() => {
      let { measurementChart } = this.props.product;
      let temp = {
        code : '',
        amount : '',
        measurement : {}
      };
      if(measurementChart.length>0){
        for (const [key, value] of Object.entries(measurementChart[0].measurement)) {
            temp.measurement[key] = '';
        }
      }
      console.log("temp",temp)
      measurementChart.push(temp);
      this.props._storeData('measurementChart',measurementChart)
    }

    removeTableObj = async() => {
      let { measurementChart } = this.props.product;
      measurementChart.pop();
      this.props._storeData('measurementChart',measurementChart)
    }

    render() {
        let { measurementChart, accessoriesList, accessoriesImages } = this.props.product;
        let { tableError } = this.state;
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
            <div className="steps">
                <div className="stepwizard">
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-1" type="button" className="btn btn-circle btn-default done">1</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-2" type="button" className="btn btn-default btn-circle btn-success active-line done">2</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-3" type="button" className="btn btn-default btn-circle btn-success active-line">3</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-form">
              <div className="style-item">
                  <div className="accordion" id="accordionExample">
                      <div className="card upload-step-3">
                          <div id="collapseOneFTFS_3" className="collapse show" aria-labelledby="headingOneFTFS_3" data-parent="#accordionExample">
                              <div className="card-body p-0">
                                  <div className="row-item">
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label>Choose accessories</label>
                                                  <select className="nice-select" name="accessoriesList" onClick={this.onClickAccessories}>
                                                      <option value="">Accessories</option>
                                                      {
                                                        this.state.accessories.map((item,i) => {
                                                          return(<option key={i} value={item.id}>{item.name}</option>)
                                                        })
                                                      }
                                                  </select>
                                              </div>
                                          </div>
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label> </label>
                                                  <ol className="order-list" style={{textAlign:'left',color:'black',margin:10}}>
                                                      {
                                                        accessoriesList.map((item,i) => {
                                                          return(
                                                            <li key={i}>{item.name}</li>
                                                          )
                                                        })
                                                      }
                                                  </ol>
                                              </div>
                                          </div>
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label> </label>
                                                  <div className="file file-style-2 btn" style={{marginTop:10}}>
                                                      Upload
                                                      <input type="file" name="accessoriesImages" accept=".doc,.docx,.xlsx,application/pdf,image/*" onChange={(e) => this.onMultipleFileSelect(e,'ACCESSORIES_DESIGN')} multiple/>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-12">
                                        {
                                          accessoriesImages.map((item,_key) => {
                                            return(
                                              <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('accessoriesImages',_key)} />
                                            )
                                          })
                                        }
                                        </div>
                                      </div>
                                  </div>
                                  <div className="row-item">
                                      <div className="row">
                                          <div className="col-lg-12">
                                              <label>Measurement chart</label>
                                              {
                                                tableError ? <label className="error">{tableError}</label> : ''
                                              }
                                              <div className="table-responsive">
                                                <table className="table table-bordered measurement-chart">
                                                    <thead>
                                                        <tr>
                                                            <th>Size</th>
                                                            {
                                                              measurementChart.length > 0 ? this.renderHeader(measurementChart[0].measurement) : <></>
                                                            }
                                                            <th>Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                      measurementChart.map((item,i) => {
                                                        let arr = [];
                                                        for (const [key, value] of Object.entries(item.measurement)) {
                                                            arr.push(
                                                              <td key={key}>
                                                                <input type="text" name={key} value={value} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Size"/>
                                                              </td>
                                                              )
                                                        }
                                                        return (
                                                          <tr key={i}>
                                                              <td>
                                                                <input type="text" name="code" value={item.code} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Code"/>
                                                              </td>
                                                              {arr}
                                                              <td>
                                                                <input type="text" name="amount" value={item.amount} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Quantity"/>
                                                              </td>
                                                          </tr>
                                                        )
                                                      })
                                                    }
                                                    </tbody>
                                                </table>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="row mt-5" style={{textAlign:'left'}}>
                                        <div className="col-lg-12">
                                            <div className="add-new color" onClick={this.addTableObj}>
                                                <span>Add size</span>
                                            </div>
                                            {
                                              measurementChart.length > 1 ?
                                              <div className="add-new reduce color" onClick={this.removeTableObj} style={{marginLeft:10,color:'red'}}>
                                                  <span>Remove size</span>
                                              </div> :
                                              <></>
                                            }
                                        </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <button className="btn-brand float-right mt-4" href="#" onClick={this.submit}>Submit</button>
                      <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={(e) => this.props._goToFormStep(1)}>Back</button>
                  </div>
              </div>
            </div>

          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
  return {
		product: store.shareDesignProduct
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
