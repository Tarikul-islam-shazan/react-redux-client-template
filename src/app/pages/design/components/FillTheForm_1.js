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
            // toastWarning("Product Type List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            // console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            // toastError("Something went wrong! Please try again.");
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

    validate = async() => {
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
        await this.setState({
          nameError : 'Product name is required'
        })
        if (flag) {
          this.nameInput.scrollIntoView();
          this.nameInput.focus();
        }
        flag = false;
      }else{
        await this.setState({
          nameError : ''
        })
      }
      if(productType == ''){
        await this.setState({
          typeError : 'Product type is required'
        })
        if (flag) {
          this.nameInput.scrollIntoView(); // couldn't scroll to select component
          // this.productTypeInput.focus();
        }
        flag = false;
      }else{
        await this.setState({
          typeError : ''
        })
      }
      if(fabricComposition == ''){
        await this.setState({
          compositionError : 'Fabric composition is required'
        })
        if (flag) {
          this.compositionInput.scrollIntoView();
          this.compositionInput.focus();
        }
        flag = false;
      }else{
        await this.setState({
          compositionError : ''
        })
      }
      if(fabricWeight == ''){
        await this.setState({
          weightError : 'Fabric weight is required'
        })
        if (flag) {
          this.weightInput.scrollIntoView();
          this.weightInput.focus();
        }
        flag = false;
      }else{
        await this.setState({
          weightError : ''
        })
      }
      let colorErr = await this.hasErrorColor(flag);
      // console.log("colorErr",colorErr);
      if(flag && !colorErr){
        return true;
      }else{
        return false;
      }
      // return flag;
    }

    next = async() => {
      // this.props._goToFormStep(1)
      let isValid = await this.validate();
      if(isValid){
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

    hasErrorColor = (validateFlag = true) => {
      let { colorList } = this.props.product;
      let colorError = [];
      let flag = false;
      colorList.map((item,i) => {
        let temp = {
          idError : '',
          quantityError : ''
        };
        if(item.id==''){
          if (!flag && validateFlag) {
            this['colorInput_' + i].scrollIntoView(); // couldn't scroll to select component
            // this['colorSelect_' + i].focus();
          }
          flag = true;
          temp.idError = 'Color is required';
        }
        if(item.quantity==''){
          if (!flag && validateFlag) {
            this['colorInput_' + i].scrollIntoView();
            this['colorInput_' + i].focus();
          }
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
                          <label>Design name*</label>
                          <input ref={(input) => { this.nameInput = input; }} type="text" name="name" value={name} onChange={this.onChange} placeholder="Enter design name"/>
                          {
                            nameError ? <span className="error">{nameError}</span> : ''
                          }
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="form-group group-option">
                          <label>Product type*</label>
                          <select ref={(input) => { this.productTypeInput = input; }} className="nice-select" name="productType" value={productType} onClick={this.onChange}>
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
                          <input ref={(input) => { this.compositionInput = input; }} type="text" name="fabricComposition" value={fabricComposition} onChange={this.onChange} placeholder="60% Cotton 40% Polyester (CVC)"/>
                          {
                            compositionError ? <span className="error">{compositionError}</span> : ''
                          }
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="form-group">
                          <label>Fabric weight (GSM)*</label>
                          <input ref={(input) => { this.weightInput = input; }} type="text" name="fabricWeight" value={fabricWeight} onChange={this.onChange} placeholder="120"/>
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
                                    <select ref={(input) => { this['colorSelect_' + i] = input; }} className="nice-select" name="id" value={item.id} onClick={(e) => this.onColorChange(e,i)}>
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
                                    <input ref={(input) => { this['colorInput_' + i] = input; }} type="text" placeholder="Enter Quantity" name="quantity" value={item.quantity} onChange={(e) => this.onColorChange(e,i)}/>
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
