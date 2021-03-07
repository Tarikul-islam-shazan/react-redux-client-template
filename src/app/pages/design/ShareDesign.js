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
        	colors:[{
            hexCode: '',
            name: ''
          }],
        	documentIds:[],
          productDesignDoc: {},
          productTypeList: [],
        };
    }

    componentDidMount = async() => {
        document.title = "Share Design - Nitex";
        this.getProductTypes()
    }

    getProductTypes = async() => {
        await Http.GET('getProductTypeWithGroup')
        .then(({data}) => {
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
                arr[0] = obj;
                continue;
              }
              let flag = true;
              for(let j = 0 ; j < arr.length ; j++){
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
                arr[arr.length] = obj;
              }
            }
            this.setState({
              productTypeList : arr
            })
          }
          loadjs(['/js/script.js']);
        })
        .catch(response => {
        });
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
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
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            data.base64Str = reader.result;
            this.setState({
              productDesignDoc: data
            })
            Http.UPLOAD_WITH_PROGRESS('uploadDocument', data, '', this.showUploadProgress)
            .then(({data}) => {
              console.log('uploadDocument POST SUCCESS: ', data);
              this.setState({
                documentIds: [data.id]
              })
            })
            .catch(({response}) => {
                console.log('uploadDocument ERROR: ', JSON.stringify(response));
            });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
    }

    showUploadProgress = (data, doc) => {
        // console.log("data from showUploadProgress", data)
        console.log('uploadDocument progress amount: ', (data.loaded / data.total) * 100, doc);
    }

    addColor = () => {
        let {colors} = this.state;
        colors.push({
          hexCode: '',
          name: ''
        })
        this.setState({colors});
    }

    removeColor = (index) => {
        let {colors} = this.state;
        colors = colors.filter((color, i) => i != index);
        this.setState({colors});
    }

    submit = () => {
        let {
          name, fabricType, fabricTypeId, fabricDetails, productTypeId, tableJson, note, colors, documentIds, productDesignDoc
        } = this.state;
        let body = {
          	name,
          	fabricType,
          	// fabricTypeId: 2, //need to make dynamic
          	fabricDetails,
          	productTypeId,
          	// tableJson, //need details
          	note,
          	colors,
          	documentIds
        }
        Http.POST('shareDesign', body)
        .then(({data}) => {
          console.log('shareDesign POST SUCCESS: ', data);
          this.props.history.push('/design/edit/' + data.id)
        })
        .catch(({response}) => {
            console.log('shareDesign ERROR: ', JSON.stringify(response));
        });
    }

    render() {
        let {
          name, fabricType, fabricTypeId, fabricDetails, productTypeId, tableJson, note, colors, documentIds, productDesignDoc,
          productTypeList, typeError
        } = this.state;
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
                                          <div className="uploaded-img-banner">
                                              <img className="border-0" src={productDesignDoc.base64Str} alt=""/>
                                              <div className="banner-close">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="32.604"
                                                           height="32.604" viewBox="0 0 32.604 32.604">
                                                          <g id="Group_11390" data-name="Group 11390"
                                                             transform="translate(61.557 -265.911) rotate(45)">
                                                              <path id="Path_27710" data-name="Path 27710"
                                                                    d="M2135.273,2351v38.108"
                                                                    transform="translate(-1967.718 -2138.497)"
                                                                    fill="none" stroke="#fff" strokeLinecap="round"
                                                                    strokeWidth="4"></path>
                                                              <path id="Path_27711" data-name="Path 27711"
                                                                    d="M0,0V38.109"
                                                                    transform="translate(186.609 231.555) rotate(90)"
                                                                    fill="none" stroke="#fff" strokeLinecap="round"
                                                                    strokeWidth="4"></path>
                                                          </g>
                                                      </svg>
                                                  </div>
                                          </div>
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
                                        <input type="text" placeholder="Enter design name" class="bg-gray-light border-0" name="name" value={name} onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Product type*</label>
                                        <select className="w-100 bg-gray-light border-0" name="productTypeId" value={productTypeId} onClick={this.onChange}>
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
                                          typeError ? <span className="error">{typeError}</span> : ''
                                        }
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Fabric type</label>
                                        <input type="text" placeholder="Fabric type" class="bg-gray-light border-0" name="fabricType" value={fabricType} onChange={this.onChange}/>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Fabric details</label>
                                        <input type="text" placeholder="Enter fabric details" class="bg-gray-light border-0" name="fabricDetails" value={fabricDetails} onChange={this.onChange}/>
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
                                                        <span class="brand-color font-18 semibold cursor-pointer" onClick={this.addColor}>+Add color</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                              colors.map((item, i) => {
                                                return(
                                                  <ColorRowWithPicker item={item} key={i} index={i} data={colors} onChangeColor={this.onChange} remove={this.removeColor} />
                                                )
                                              })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label for="">Note</label>
                                        <textarea name="note" value={note} onChange={this.onChange} rows="4" placeholder="Additional note" class="bg-gray-light border-0"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <button class="btn-brand m-0 brand-bg-color" onClick={this.submit}>Submit</button>
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
