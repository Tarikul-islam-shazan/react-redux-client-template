import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';
import Modal from 'react-bootstrap/Modal'

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { _storeData } from "../design/actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { MeasurementTable } from './components/MeasurementTable'
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import ColorRowWithPicker from "./components/ColorRowWithPicker";

import {Title} from "./components/EditShareDesignComponents/Title";
import {ColorAndFabrication} from "./components/EditShareDesignComponents/ColorAndFabrication";
import {DocumentHandler} from "./components/EditShareDesignComponents/DocumentHandler";
import {Notes} from "./components/EditShareDesignComponents/Notes";
import {MeasurementChart} from "./components/EditShareDesignComponents/MeasurementChart";
import {ImageItem} from "./components/EditShareDesignComponents/ImageItem";

class EditShareDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
          designDetails: {},
          designDocuments: {},
          productTypeList: [],
          editTitle: false,
          editColorAndFabrication: false,
          editNotes: false,

          showProgressModal: false,

          uploadInProgressDocs: {},
          visibleDocType: ''
        };
    }

    componentDidMount = async() => {
        document.title = "Share Design Edit - Nitex";
        let id = this.props.match.params.id;
        this.getDesignDetails(id);
        this.getDesignDocuments(id);
        this.getProductTypes();
    }

    getDesignDetails = async(id) => {
      await Http.GET('getShareDesignDetails', id)
        .then(({data}) => {
          console.log('getShareDesignDetails SUCCESS: ', data);
          if(data){
            this.setState({designDetails: data})
          }
        })
        .catch(({response}) => {
            console.log('getShareDesignDetails ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getDesignDocuments = async(id) => {
      await Http.GET('getDesignImages', id)
        .then(({data}) => {
          console.log('getDesignImages SUCCESS: ', data);
          if(data){
            this.setState({
              designDocuments: data
            })
          }
        })
        .catch(({response}) => {
            console.log('getDesignImages ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
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

    toggleFlag = (sectionName) => {
      let temp = this.state[sectionName];
      this.setState({
        [sectionName]: !temp
      })
    }

    onChange = (name, value) => {
      let {designDetails} = this.state;
      designDetails[name] = value;
      this.setState({
        designDetails
      })
    }

    addColor = () => {
        let {designDetails} = this.state;
        if (designDetails.colors) {
          designDetails.colors.push({
            hexCode: '',
            name: ''
          })
        }
        this.setState({designDetails});
    }

    removeColor = (index) => {
        let {designDetails} = this.state;
        designDetails.colors = designDetails.colors.filter((color, i) => i != index);
        this.setState({designDetails});
    }

    onFileSelect = async(e, docType) => {
      let files = Array.from(e.target.files);
      if (files.length) {
        this.setState({
          showProgressModal: true
        })
      }
      await files.map((item) => {
        let data = {
          "name": item.name,
    			"docMimeType" : item.type,
    			"documentType" : docType,
    			"print": false,
    			"base64Str":""
        }

        // if (!this.isValidFile(item, docType)) {
        //     toastWarning(`${item.name} - type or size invalid.`)
        //     return;
        // }

        let reader = new FileReader()
        reader.readAsDataURL(item)
        reader.onload = () => {
          data.base64Str = reader.result;
          this.uploadFile(data);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      })
    }

    uploadFile = async(doc) => {
      let id = this.props.match.params.id;
      let {uploadInProgressDocs, designDocuments} = this.state;
      uploadInProgressDocs[doc.name] = {progress: 0, status: 'UPLOADING'};
      await this.setState({
        uploadInProgressDocs
      })
      Http.UPLOAD_WITH_PROGRESS('uploadDocumentInProduct', doc, id, this.showUploadProgress)
      .then(({data}) => {
        console.log('uploadDocument POST SUCCESS: ', data);
        if (data.id) {
          let images = [];
          if (designDocuments[doc.documentType]) {
            images = designDocuments[doc.documentType];
          }
          images = [data.payload, ...images];

          designDocuments[doc.documentType] = images;
          uploadInProgressDocs[doc.name] = {progress: 100, status: 'SUCCESS'};

          this.setState({
            uploadInProgressDocs,
            designDocuments
          })
        } else {
          uploadInProgressDocs[doc.name] = {progress: 100, status: 'FAILED'};
          this.setState({
            uploadInProgressDocs
          })
        }
      })
      .catch(({response}) => {
          console.log('uploadDocument ERROR: ', response);
          uploadInProgressDocs[doc.name] = {progress: 100, status: 'FAILED'};
          this.setState({
            uploadInProgressDocs
          })
      });
    }

    showUploadProgress = (data, doc) => {
        let {uploadInProgressDocs} = this.state;
        uploadInProgressDocs[doc.name].progress = (data.loaded / data.total) * 100;
        this.setState({
          uploadInProgressDocs
        })
    }

    onFileRemove = (deletedDoc) => {
      let productId = this.props.match.params.id;
      let {designDocuments} = this.state;
      Http.DELETE('removeProductDocument', {}, `${productId}/${deletedDoc.id}`)
      .then(({data}) => {
        if (designDocuments[deletedDoc.docType]) {
          designDocuments[deletedDoc.docType] = designDocuments[deletedDoc.docType].filter((doc) => doc.id !== deletedDoc.id);
          this.setState({
            designDocuments
          })
        }
        console.log('uploadDocument POST SUCCESS: ', data);
      })
      .catch(({response}) => {
          console.log('uploadDocument ERROR: ', response);
      });
    }

    setVisibleDocType = (docType) => {
      this.setState({
        visibleDocType: docType
      })
    }

    renderProgressBars = () => {
      let {uploadInProgressDocs} = this.state;
      let result = [];
      for (const [key, data] of Object.entries(uploadInProgressDocs)) {
        result.push(
          <div className="row">
            <div className="col-md-4">
              <p style={{wordBreak: 'break-all'}}>{key}</p>
            </div>
            <div className="col-md-8">
              <div class="progress">
                  <div class={`progress-bar ${data.status === `SUCCESS` ? `bg-success` : (data.status === 'FAILED' ? `bg-danger` : ``)}`} role="progressbar" style={{width: `${data.progress}%`}} aria-valuenow={data.progress} aria-valuemin="0" aria-valuemax="100">{data.status}</div>
              </div>
            </div>
          </div>
        )
      }
      return result;
    }

    updateDetails = (sectionName) => {
      let productId = this.props.match.params.id;
      let {designDetails} = this.state;
      let body = {};

      if (sectionName === 'editTitle') {
        body.name = designDetails.name;
      } else if (sectionName === 'editColorAndFabrication') {
        body.productTypeId = designDetails.productTypeId;
        body.fabricType = designDetails.fabricType;
        body.fabricDetails = designDetails.fabricDetails;
        body.colors = designDetails.colors.map((colorObj) => {
          return ({
            hexCode: colorObj.hexCode,
            name: colorObj.name
          })
        });
      }

      Http.PUT('updateDesignDetails', body, productId)
      .then(({data}) => {
        console.log('uploadDocument POST SUCCESS: ', data);
        if (data.success) {
          toastSuccess("Updated successfully.")
          this.toggleFlag(sectionName);
        }
      })
      .catch(({response}) => {
          console.log('uploadDocument ERROR: ', response);
          toastError("Error occured.")
      });
    }

    updateNoteAndSize = (sectionName, measurementChart = null) => {
      let productId = this.props.match.params.id;
      let {designDetails} = this.state;
      let body = {};
      body.note = designDetails.note;
      body.sizeDTO = {
        sizeText: JSON.stringify({
          sizeTableRows : measurementChart
        })
      }
      // if (sectionName === 'editNotes') {
      //   body.note = designDetails.note;
      // } else if (sectionName === 'editMeasurementChart') {
      //   body.sizeDTO = {
      //       sizeText: JSON.stringify({
      //         sizeTableRows : measurementChart
      //       })
      //     }
      // }



      Http.PUT('updateSizeTable', body, productId)
      .then(({data}) => {
        console.log('uploadDocument POST SUCCESS: ', data);
        if (data.success) {
          toastSuccess("Updated successfully.");
          if (sectionName === 'editMeasurementChart' && designDetails.sizeTable) {
              designDetails.sizeTable.sizeTableRows = measurementChart;
              this.setState({
                designDetails
              })
          } else {
            this.toggleFlag(sectionName);
          }
        }
      })
      .catch(({response}) => {
          console.log('uploadDocument ERROR: ', response);
          toastError("Error occured.")
      });
    }

    render() {
        let {designDetails, designDocuments, productTypeList, editTitle, editColorAndFabrication, editNotes, showProgressModal, visibleDocType} = this.state;
        return (
          <>
            <div class="desgin-name-header d-flex justify-content-between align-items-center flex-column flex-sm-row">

                <Title data={designDetails} flag={editTitle} flagName='editTitle' toggleFlag={this.toggleFlag} onChange={this.onChange} onSubmit={this.updateDetails}/>

                <div class="flex-grow-1 text-right add-another-product" >
                    <span class="font-18 text-underline cursor-pointer brand-color" onClick={() => this.props.history.push('/design/share')}>+Add another product</span>
                </div>

            </div>

            <section class="product-img-and-info">
                <div class="product-images d-flex justify-content-between">
                    {
                      designDocuments.PRODUCT_DESIGN && designDocuments.PRODUCT_DESIGN.length ?
                      <div class="item">
                          <div class="type-of-img-name d-flex justify-content-between align-items-center">
                              <span class="font-20">Feature Image</span>
                          </div>
                          <div class="p-img">
                              <img src={designDocuments.PRODUCT_DESIGN[0].docUrl} alt=""/>
                              <div class="dlt" onClick={() => this.onFileRemove(designDocuments.PRODUCT_DESIGN[0])}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                      <g id="Group_11045" data-name="Group 11045" transform="translate(-396 -260)">
                                        <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(428 260) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                                        <g id="delete" transform="translate(405.358 267.001)">
                                          <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                                          <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                                        </g>
                                      </g>
                                    </svg>
                              </div>
                          </div>
                      </div> :
                      <div class="item">
                          <div class="type-of-img-name">
                              <span class="font-20">Feature Image</span>
                          </div>
                          <div class="uploader">
                              <label for="drag-upload" class="drag-upload">&nbsp;</label>
                              <input type="file" class="file-upload" id="drag-upload" name="PRODUCT_DESIGN" onChange={(e) => this.onFileSelect(e, e.target.name)}/>
                              {/*<div class="center-center">
                                  <div id="loading-spinner"></div>
                              </div>*/}
                          </div>
                      </div>
                    }

                    <DocumentHandler
                      data={designDocuments.REFERENCE_IMAGE ? designDocuments.REFERENCE_IMAGE : []}
                      title='Reference Image'
                      name='REFERENCE_IMAGE'
                      visibleDocType={visibleDocType}
                      setVisibleDocType={this.setVisibleDocType}
                      onFileSelect={this.onFileSelect}
                      onFileRemove={this.onFileRemove}/>

                    <DocumentHandler
                      data={designDocuments.EMBELLISHMENT ? designDocuments.EMBELLISHMENT : []}
                      title='Embellishment file'
                      name='EMBELLISHMENT'
                      visibleDocType={visibleDocType}
                      setVisibleDocType={this.setVisibleDocType}
                      onFileSelect={this.onFileSelect}
                      onFileRemove={this.onFileRemove}/>

                    <DocumentHandler
                      data={designDocuments.ACCESSORIES_DESIGN ? designDocuments.ACCESSORIES_DESIGN : []}
                      title='Accesories'
                      name='ACCESSORIES_DESIGN'
                      visibleDocType={visibleDocType}
                      setVisibleDocType={this.setVisibleDocType}
                      onFileSelect={this.onFileSelect}
                      onFileRemove={this.onFileRemove}/>

                    <DocumentHandler
                      data={designDocuments.OTHER ? designDocuments.OTHER : []}
                      title='Other'
                      name='OTHER'
                      visibleDocType={visibleDocType}
                      setVisibleDocType={this.setVisibleDocType}
                      onFileSelect={this.onFileSelect}
                      onFileRemove={this.onFileRemove}/>
                </div>

                <div class="product-info d-flex justify-content-between align-items-start flex-column flex-xl-row">

                    <ColorAndFabrication
                      data={designDetails}
                      productTypeList={productTypeList}
                      flag={editColorAndFabrication}
                      flagName='editColorAndFabrication'
                      toggleFlag={this.toggleFlag}
                      addColor={this.addColor}
                      removeColor={this.removeColor}
                      onChange={this.onChange}
                      onSubmit={this.updateDetails}/>

                    <div class="product-notes flex-grow-1">
                        {
                            visibleDocType ?
                            <div class="more-files">
                                <div class="type-of-img-name d-flex justify-content-between align-items-center">
                                    <span class="font-20">{visibleDocType.replace(/_/g, ' ')}</span>
                                    <span class="close-pop cursor-pointer" onClick={() => this.setState({visibleDocType: ''})}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="51.282" height="51.282" viewBox="0 0 51.282 51.282">
                                            <g id="Group_11113" data-name="Group 11113" transform="translate(-7253.316 1861.454) rotate(45)">
                                              <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3867.015 -6463.247) rotate(90)" fill="#f2f2f2" stroke="#21242b" stroke-width="1">
                                                <rect width="36.262" height="36.262" rx="18" stroke="none"/>
                                                <rect x="0.5" y="0.5" width="35.262" height="35.262" rx="17.5" fill="none"/>
                                              </g>
                                              <path id="close_3_" data-name="close (3)" d="M5.747,4.934,10.512.168a.575.575,0,0,1,.813.813L6.559,5.747l4.766,4.766a.575.575,0,0,1-.813.813L5.747,6.559.981,11.325a.575.575,0,0,1-.813-.813L4.934,5.747.168.981A.575.575,0,0,1,.981.168Z" transform="translate(3848.689 -6453.438) rotate(45)" fill="#21242b" stroke="#21242b" stroke-width="0.25"/>
                                            </g>
                                          </svg>
                                    </span>
                                </div>
                                <div class="product-images">
                                {
                                  designDocuments[visibleDocType] && designDocuments[visibleDocType].map((doc, i) => {
                                    return (
                                      <ImageItem key={i} doc={doc} remove={this.onFileRemove}/>
                                    )
                                  })
                                }
                                </div>
                            </div> : <></>
                        }
                        <Notes data={designDetails} flag={editNotes} flagName='editNotes' toggleFlag={this.toggleFlag} onChange={this.onChange} onSubmit={this.updateNoteAndSize}/>

                        <MeasurementChart data={designDetails} onChange={this.onChange} onSubmit={this.updateNoteAndSize}/>

                    </div>
                </div>

                <Modal
                  show={showProgressModal}
                  onHide={() => this.setState({showProgressModal: false, uploadInProgressDocs: {}})}
                >
                  <Modal.Body>
                      <h5>Please wait...</h5>
                      {this.renderProgressBars()}
                  </Modal.Body>
                </Modal>

            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditShareDesign);
