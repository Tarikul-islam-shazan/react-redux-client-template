import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { _storeData } from "../design/actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { MeasurementTable } from './components/MeasurementTable'
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import ColorRowWithPicker from "./components/ColorRowWithPicker";

class ShareDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
        	fabricType: '',
        	fabricTypeId: '',
        	fabricDetails: '',
        	productTypeId: '',
        	tableJson: null,
        	note: '',
        	colors:[],
        	documentIds:[],
          productDesignDoc: {}
        };
    }

    componentDidMount = async() => {
      document.title = "Share Design - Nitex";
    }

    onFileUpload = (e, docType) => {
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
  			"docMimeType" : file.type,
  			"documentType" : docType,
  			"base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
          data.base64Str = reader.result;
          this.setState({
            productDesignDoc: data
          })
          // Http.UPLOAD_WITH_PROGRESS('uploadDocument', data, '', this.showUploadProgress)
          // .then(({data}) => {
          //   console.log('uploadDocument POST SUCCESS: ', data);
          // })
          // .catch(({response}) => {
          //     console.log('uploadDocument ERROR: ', JSON.stringify(response));
          // });
          axios.post('http://testapi-v2.nitex.com/doc/add', data, {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            onUploadProgress: data => {
              //Set the progress value to show the progress bar
              this.showUploadProgress(data)
            }
          })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    showUploadProgress = (data) => {
      console.log("data from showUploadProgress", data)
    }

    render() {
        let {name, fabricType, fabricTypeId, fabricDetails, productTypeId, tableJson, note, colors, documentIds, productDesignDoc} = this.state;
        return (
          <>
            <div>
                <h4>Share your design</h4>
                <p class="color-gray">Get costing on any designs you like to manufacture for your label</p>
            </div>

            <div class="share-your-design-form">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <div class="uploader mt-3 mb-4">
                                    {
                                      productDesignDoc && productDesignDoc.name ?
                                      <img src={productDesignDoc.base64Str} alt=""/>
                                      :
                                      <>
                                        <label for="drag-upload" class="drag-upload">&nbsp;</label>
                                        <input type="file" id="drag-upload" class="file-upload"  name="productDesignDoc" onChange={(e) => this.onFileUpload(e,'PRODUCT_DESIGN')}/>
                                      </>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="stepper m-0">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Design name*</label>
                                        <input type="text" placeholder="Enter design name" class="bg-gray-light border-0"/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Product type*</label>
                                        <select class="w-100 bg-gray-light border-0">
                                            <option>Select product types </option>
                                            <option value="2">2</option>
                                            <option value="3" disabled>3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Fabric type</label>
                                        <select class="w-100 bg-gray-light border-0">
                                            <option>Select fabric types </option>
                                            <option value="2">2</option>
                                            <option value="3" disabled>3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Fabric details</label>
                                        <input type="text" placeholder="Enter fabric details" class="bg-gray-light border-0"/>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <table class="w-100 pick-color-table">
                                            <thead>
                                                <tr>
                                                    <th><label>Color</label></th>
                                                    <th><label>Color name</label></th>
                                                    <th class="text-right">
                                                        <span class="brand-color font-18 semibold cursor-pointer">+Add color</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ColorRowWithPicker />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Note</label>
                                        <textarea name="" id="" rows="4" placeholder="Additional note" class="bg-gray-light border-0"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <button class="btn-brand m-0 brand-bg-color">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareDesign);
