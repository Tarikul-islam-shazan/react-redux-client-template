import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../../commonComponents/Toast';

import { _storeData } from "../actions";
import { LOADER_STYLE, LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

class FillTheForm_1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          productType : [],
          colors : [
            // {
            //   id : 0,
            //   quantity : 0
            // }
          ],
          nameError : '',
          typeError : '',
          colorError : [{
            idError : '',
            quantityError : ''
          }],
        };
    }

    componentDidMount = async() => {
      await Http.GET('getProductTypeWithGroup')
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          let arr = [];
          if(data.length>0){
            for(let i = 0 ; i < data.length ; i++){
              let obj = {
                groupId : 0,
                groupName : '',
                types : []
              };
              if(i==0){
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                // console.log("object==>"+i,obj)
                arr[0] = obj;
                // console.log("arr==>"+i,arr)
                continue;
              }
              let flag = true;
              for(let j = 0 ; j < arr.length ; j++){
                console.log("from internal array==>"+i,arr)
                if(data[i].productGroup.id == arr[j].groupId){
                  arr[j].types[arr[j].types.length] = data[i];
                  flag = false;
                  break;
                }
              }
              if(flag){
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                console.log("object inside flag==>"+i,obj)
                arr[arr.length] = obj;
                console.log("arr inside flag==>"+i,arr)
              }
            }
            this.setState({
              productType : arr
            })
          }else{
            toastWarning("Product Type List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
      await Http.GET('getColorType')
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            this.setState({
              colors : data
            })
          }else{
            // toastWarning("Color List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    _setData = (key,val) => {
      // console.log("clicked",profession)
      // this.props._storeData(key,val)
    }

    onChange = (e) => {
      this.props._storeData(e.target.name,e.target.value)
      if(e.target.name == 'productType'){
        this.props._storeData('accessoriesList',[])
        this.props._storeData('measurementChart',[])
      }
    }

    validate = () => {
      let flag = true;
      // return true;
      let {
        name, productType, fabricComposition,
        fabricWeight, colorList,
        // documentList,
        accessoriesList, measurementChart,
        tempColorId, tempQuantity
      } = this.props.product;
      if(name == ''){
        this.setState({
          nameError : 'Product Name is required'
        })
      }else{
        this.setState({
          nameError : ''
        })
      }
      if(productType == ''){
        this.setState({
          typeError : 'Product Type is required'
        })
      }else{
        this.setState({
          typeError : ''
        })
      }
      if(fabricComposition == ''){
        this.setState({
          compositionError : 'Fabric Composition is required'
        })
      }else{
        this.setState({
          compositionError : ''
        })
      }
      if(fabricWeight == ''){
        this.setState({
          weightError : 'Fabric Weight is required'
        })
      }else{
        this.setState({
          weightError : ''
        })
      }
      let colorErr = this.hasErrorColor();
      // console.log("colorErr",colorErr);
      if(name && productType && fabricComposition && fabricWeight && !colorErr){
        return true;
      }else{
        return false;
      }
      // return flag;
    }

    next = () => {
      // this.props._goToFormStep(1)
      if(this.validate()){
        this.props._goToFormStep(1)
      }
    }

    addColorObj = async() => {
      let { colorList } = this.props.product;
      let { colorError } = this.state;
      colorList.push({
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
      this.props._storeData('colorList',colorList)
      loadjs(['/js/script.js']);
    }

    removeColorObj = async() => {
      let { colorList } = this.props.product;
      let { colorError } = this.state;
      colorList.pop();
      colorError.pop();
      await this.setState({
        colorError
      })
      this.props._storeData('colorList',colorList)
      loadjs(['/js/script.js']);
    }

    onColorChange = ( e , index ) => {
      let { colorList } = this.props.product;
      colorList[index][e.target.name] = e.target.value;
      this.props._storeData('colorList',colorList)
      loadjs(['/js/script.js']);
    }

    hasErrorColor = () => {
      let { colorList } = this.props.product;
      let colorError = [];
      let flag = false;
      colorList.map((item,i) => {
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

    render() {
        let {
          name, productType, fabricComposition,
          fabricWeight, colorList,
          // documentList,
          accessoriesList, measurementChart,
          tempColorId, tempQuantity
        } = this.props.product;
        let { nameError, typeError, compositionError, weightError, colorError, quantityError } = this.state;
        console.log("productType",productType);
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
                            <a href="#step-1" type="button" className="btn btn-circle btn-default btn-success">1</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-2" type="button" className="btn btn-default btn-circle" disabled="disabled">2</a>
                        </div>
                        <div className="stepwizard-step col-xs-3">
                            <a href="#step-3" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-form">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="form-group">
                          <label>Product name*</label>
                          <input type="text" name="name" value={name} onChange={this.onChange} placeholder="Enter product name"/>
                          {
                            nameError ? <span className="error">{nameError}</span> : ''
                          }
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="form-group group-option">
                          <label>Product type*</label>
                          <select className="nice-select" name="productType" value={productType} onClick={this.onChange}>
                              <option value="">Select product type</option>
                              {
                                this.state.productType.map((item,i) => {
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
                            typeError ? <span className="error">{typeError}</span> : ''
                          }
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="form-group">
                          <label>Fabric composition*</label>
                          <select className="nice-select" name="fabricComposition" value={fabricComposition} onClick={this.onChange}>
                              <option value="">Select fabric composition</option>
                              <option value="100% Cotton S/J">100% Cotton S/J</option>
                              <option value="100% Cotton Pique">100% Cotton Pique</option>
                              <option value="98% Cotton 2% Elastane">98% Cotton 2% Elastane</option>
                              <option value="95% Cotton 5% Elastane">95% Cotton 5% Elastane</option>
                              <option value="99% Cotton 1% Elastane">99% Cotton 1% Elastane</option>
                              <option value="98% Polyester 2% Elastane">98% Polyester 2% Elastane</option>
                              <option value="65% Cotton 35% Polyester (CVC)">65% Cotton 35% Polyester (CVC)</option>
                              <option value="70% Cotton 30% Polyester (CVC)">70% Cotton 30% Polyester (CVC)</option>
                              <option value="60% Cotton 40% Polyester (CVC)">60% Cotton 40% Polyester (CVC)</option>
                              <option value="100% Cotton Poplin">100% Cotton Poplin</option>
                              <option value="100% Linen">100% Linen</option>
                              <option value="100% Tencel">100% Tencel</option>
                              <option value="100% Rayon">100% Rayon</option>
                              <option value="98% Tencel 2% Elastane">98% Tencel 2% Elastane</option>
                              <option value="95% Tencel 5% Elastane">95% Tencel 5% Elastane</option>
                              <option value="100% Polyester">100% Polyester</option>
                              <option value="70% Polyester 30% Cotton">70% Polyester 30% Cotton</option>
                              <option value="100% Viscose">100% Viscose</option>
                              <option value="50% Cotton 50% Viscose">50% Cotton 50% Viscose</option>
                              <option value="50% Cotton 50% Modal">50% Cotton 50% Modal</option>
                              <option value="50% Modal 50% Viscose">50% Modal 50% Viscose</option>
                              <option value="90% Cotton 10% Viscose">90% Cotton 10% Viscose</option>
                              <option value="95% Cotton 15% Viscose">95% Cotton 15% Viscose</option>
                              <option value="98% Cotton 2% Viscose">98% Cotton 2% Viscose</option>
                              <option value="80% Cotton 18% Polyester 2% Elastane">80% Cotton 18% Polyester 2% Elastane</option>
                              <option value="85% Cotton 13% Polyester 2% Elastane">85% Cotton 13% Polyester 2% Elastane</option>
                              <option value="70% Cotton 28% Polyester 2% Elastane">70% Cotton 28% Polyester 2% Elastane</option>
                              <option value="80% Cotton 15% Polyester 5% Elastane">80% Cotton 15% Polyester 5% Elastane</option>
                              <option value="70% Cotton 25% Polyester 5% Elastane">70% Cotton 25% Polyester 5% Elastane</option>
                              <option value="Other">Other</option>
                          </select>
                          {
                            compositionError ? <span className="error">{compositionError}</span> : ''
                          }
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="form-group">
                          <label>Fabric weight (GSM)</label>
                          <select className="nice-select" value={fabricWeight} name="fabricWeight" onClick={this.onChange}>
                              <option value="">Select fabric weight (GSM)</option>
                              <option value="120">120</option>
                              <option value="145">145</option>
                              <option value="160">160</option>
                              <option value="190">190</option>
                              <option value="270">270</option>
                              <option value="Other">Other</option>
                          </select>
                          {
                            weightError ? <span className="error">{weightError}</span> : ''
                          }
                      </div>
                  </div>
                  {
                    colorList.map(( item , i ) => {
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
                                      colorError[i].idError ? <span className="error">{colorError[i].idError}</span> : ''
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Quantity*</label>
                                    <input type="text" placeholder="Enter Quantity" name="quantity" value={item.quantity} onChange={(e) => this.onColorChange(e,i)}/>
                                    {
                                      colorError[i].quantityError ? <span className="error">{colorError[i].quantityError}</span> : ''
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

                  <div className="col-lg-12">
                      <div className="add-new color" onClick={this.addColorObj}>
                          <span>Add Color</span>
                      </div>
                      {
                        colorList.length > 1 ?
                        <div className="add-new reduce color" onClick={this.removeColorObj} style={{marginLeft:10,color:'red'}}>
                            <span>Reduce Color</span>
                        </div> :
                        <></>
                      }
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <button className="btn-brand float-right mt-4" onClick={this.next}>Next</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(FillTheForm_1);
