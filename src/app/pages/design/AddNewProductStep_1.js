import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import loadjs from 'loadjs';

import { _storeData } from "../actions";
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class AddNewProductStep_1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          colors : [
            {
              id : 0,
              quantity : 0
            }
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
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            this.setState({
              colors : data
            })
          }else{
            toastError("Request wasn't successsful.");
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
                <div className="modal fade" id="AddNewProduct" tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <img src="assets/images/cancel.png" alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close" />
                                <section className="card-style-1">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12 col-6">
                                                <div className="section-header text-center">
                                                    <h5 className="section-title">Add New Product</h5>
                                                    <p className="section-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                                        invidunt ut a</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="add-new-product">
                                            <ul className="nav nav-tabs nav-justified">
                                                <li><a  className="active" data-toggle="tab" href="#FilltheForm">Fill the Form</a></li>
                                                <li><a data-toggle="tab" href="#UploadTechPack">Upload Tech Pack</a></li>
                                            </ul>

                                            <div className="tab-content">
                                                <div id="FilltheForm" className="tab-pane active">
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
                                                                <label>Product Name*</label>
                                                                <input type="text" placeholder="Enter product name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group group-option">
                                                                <label>Product type*</label>
                                                                <select>
                                                                    <option>Select product type</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3" disabled>3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Fabric composition*</label>
                                                                <select>
                                                                    <option>Select fabric composition</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3" disabled>3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label>Fabric weight (GSM)</label>
                                                                <select>
                                                                    <option>Select fabric weight (GSM)</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3" disabled>3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Color*</label>
                                                                <select>
                                                                    <option>Choose Color</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3" disabled>3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Total Quantity*</label>
                                                                <input type="text" placeholder="Enter Quantity" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <button className="btn-brand float-right mt-4">Next</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div id="UploadTechPack" className="tab-pane fade">
                                                <h3>Menu 1</h3>
                                                </div>
                                            </div>
                                        </div>
                                </section>
                            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddNewProductStep_1);
