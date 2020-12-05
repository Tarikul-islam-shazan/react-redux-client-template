import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import Modal from 'react-bootstrap/Modal'

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { UploadedItem } from '../../commonComponents/UploadedItem';

import { _storeData } from "./actions";
import { Image } from "../../commonComponents/Image";

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';


import Contents from '../design/productModal/NewProductModalContents';

class RequestForQuotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          numOfStyles : 1,
          titleError : '',
          nitexDesignList : [],
          myDesignList : [],
          loading : false,
          size : 10,
          pageNitex : 0,
          pageMy : 0,
          hasNextNitex : true,
          hasNextMy : true,
          colors : [
            // {
            //   id : 0,
            //   quantity : 0
            // }
          ],
          showProductAddModal: false,
          step: 0,
          formStep: 0,
          selectedStyleIndex: null
        };
    }

    componentDidMount = async() => {
      await this.renderNitexList()
      await this.renderMyList()
      await Http.GET('getColorType')
        .then(({data}) => {
          console.log('COLOR LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            this.setState({
              colors : data
            })
          }else{
            // toastWarning("Color List - no data found.");
          }
          loadjs(['/js/script.js']);
        })
        .catch(({response}) => {
            console.log('COLOR LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Couldn't fetch color list.");
            }
        });
    }

    onScrollToEnd = (flag) => {
      if(flag){
        const wrappedElement = document.getElementById('nitex-design');
        if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
          console.log('bottom reached');
          let { loading, pageNitex, hasNextNitex } = this.state;
          console.log("message",'bottom reached',loading, pageNitex, hasNextNitex)
          if(hasNextNitex && !loading){
            this.renderNitexList(pageNitex+1, true)
          }else{
            if(!hasNextNitex){
              // toastWarning("No more notification found.")
            }
          }

        }
      }else{
        const wrappedElement = document.getElementById('my-design');
        if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
          console.log('bottom reached');
          let { loading, pageMy, hasNextMy } = this.state;
          console.log("message",'bottom reached',loading, pageMy, hasNextMy)
          if(hasNextMy && !loading){
            this.renderMyList(pageMy+1, true)
          }else{
            if(!hasNextMy){
              // toastWarning("No more notification found.")
            }
          }

        }
      }
    }

    renderNitexList = ( page = 0 , merge = true ) => {
      this.setState({loading:true})
      let { size, nitexDesignList } = this.state;
      // let params = `?page=${page}&size=${size}`;
      let params = {
        page : page,
        size : size
      };

      Http.GET('getPickDesign',params)
        .then(({data}) => {
          console.log('nitexDesignList SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            if(merge){
              this.setState({
                nitexDesignList : [ ...nitexDesignList, ...data ],
                pageNitex : page,
                hasNextNitex : data.length === size ? true : false,
                loading:false
              })
            }else{
              this.setState({
                nitexDesignList : data,
                pageNitex : page,
                hasNextNitex : data.length === size ? true : false,
                loading:false
              })
            }

          }else{
            this.setState({
              hasNextNitex : false,
              loading:false
            })
            // toastWarning("Nitex Design List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(({response}) => {
            console.log('nitexDesignList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Couldn't fetch nitex designs.");
            }
        });
    }

    renderMyList = ( page = 0 , merge = true ) => {
      this.setState({loading:true})
      let { size, myDesignList } = this.state;

      let params = `?page=${page}&size=${size}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;

      Http.GET('getProductList',params)
        .then(({data}) => {
          console.log('myDesignList SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            if(merge){
              this.setState({
                myDesignList : [ ...myDesignList, ...data ],
                pageMy : page,
                hasNextMy : data.length === size ? true : false,
                loading:false
              })
            }else{
              this.setState({
                myDesignList : data,
                pageMy : page,
                hasNextMy : data.length === size ? true : false,
                loading:false
              })
            }

          }else{
            this.setState({
              hasNextMy : false,
              loading:false
            })
            // toastWarning("My Design List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(({response}) => {
            console.log('myDesignList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Couldn't fetch my designs.");
            }
        });
    }

    loadJsFiles = () => {
      loadjs(['/js/script.js','/js/custom.js']);
    }

    onChange = (e) => {
      if(e.target.name=='numberOfStyles'){
        let { styles, numberOfStyles, colorList } = this.props.rfq;
        let { colorError } = this.state;
        console.log("clicked",e.target.value-numberOfStyles)
        let temp = {
          myDesignList:0,
          nitexDesignList:0,
          fileError:'',
          note:'',
          noteError:'',
          designInspirationsFiles:[],
          otherFiles:[],
          colorList:[
            {
              id : '',
              quantity : ''
            }
          ],
          colorError:[
            {
              idError : '',
              quantityError : ''
            }
          ]
        };
        if(numberOfStyles<e.target.value){
          for(let i=0;i<(e.target.value-numberOfStyles);i++){
            styles.push(temp);
          }
        }else{
          for(let i=0;i<(numberOfStyles-e.target.value);i++){
            styles.pop();
          }
        }
        this.props._storeData('styles',styles);
        // this.props._storeData('colorList',colorList);
        this.setState({colorError})
      }
      this.props._storeData(e.target.name,e.target.value);

    }

    onChangeStyle = (e,i) => {
      let { styles } = this.props.rfq;
      styles[i][e.target.name] = e.target.value;
      // console.log(e.target.name,e.target.value)
      this.props._storeData('styles',styles);
    }

    onImageSelect = (type,i,itemId) => {
        let { styles } = this.props.rfq;
        if(type=='nitex'){
            if(styles[i].nitexDesignList==itemId){
              styles[i].nitexDesignList = 0;
            }else{
              styles[i].techPackFile = {};
              styles[i].myDesignList = 0;
              styles[i].nitexDesignList = itemId;
            }
        }else if(type=='my'){
            if(styles[i].myDesignList==itemId){
              styles[i].myDesignList = 0;
            }else{
              styles[i].nitexDesignList = 0;
              styles[i].techPackFile = {};
              styles[i].myDesignList = itemId;
            }
        }
        this.props._storeData('styles',styles)
    }

    submit = () => {
      let flag = true;
      let { rfq } = this.props;
      rfq.styles.map((item,i) => {
        if(item.myDesignList==0 && item.nitexDesignList==0 && ( item.techPackFile == null || !item.techPackFile.name )){
          flag = false;
          rfq.styles[i].fileError = 'Please choose an option from above';
        }else{
          rfq.styles[i].fileError = '';
        }
        // if(item.note==''){
        //   flag = false;
        //   rfq.styles[i].noteError = 'Note is required';
        // }else{
        //   rfq.styles[i].noteError = '';
        // }
      })
      this.props._storeData('styles',rfq.styles)
      if(rfq.title==''){
        flag = false;
        this.setState({
          titleError : 'Title is required'
        })
      }else{
        this.setState({
          titleError : ''
        })
      }
      if(flag){
        let body = {
          name : rfq.title,
          numOfStyles : rfq.numberOfStyles,
          notes : 'test',
          productDTOList : rfq.styles.map((item,i) => {
            let temp = {};
            temp.name = "Style "+(i+1);
            temp.note = item.note;
            // temp.colorDTOList = item.colorList;
            if(item.techPackFile && item.techPackFile.name){
              temp.productCreationType = 'FROM_TECH_PACK';
              temp.techPackDto = item.techPackFile;
            }
            if(item.nitexDesignList){
              temp.productCreationType = 'FROM_CATALOG';
              temp.id = item.nitexDesignList;
            }
            if(item.myDesignList){
              temp.productCreationType = 'FROM_CATALOG';
              temp.id = item.myDesignList;
            }
            // temp.documentDTOList = [...item.designInspirationsFiles, ...item.otherFiles];
            return temp;
          })
        }
        console.log("body from submit",body);
        // return;
        this.setState({loading:true})
        Http.POST('addRfq',body)
          .then(({data}) => {
            console.log('RFQ ADD SUCCESS: ', JSON.stringify(data));
            this.setState({loading:false})
            if(data.success){
              toastSuccess(data.message);
              // window.location.reload();
              this.props.history.push('/my-rfqs');
            }else{
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('RFQ ADD Error: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response!==undefined && response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Request wasn't successful.");
              }
          });
      }
    }

    removeFromArray = (keyName,styleIndex,itemIndex) => {
      console.log(keyName,styleIndex,itemIndex)
      let { styles } = this.props.rfq
      console.log(styles[styleIndex][keyName])
      styles[styleIndex][keyName] = styles[styleIndex][keyName].filter((item,i) => {
        return i!=itemIndex;
      })
      this.props._storeData('styles',styles)
    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    _goToFormStep = (formStep) => {
      this.setState({
        formStep
      })
    }

    _closeModal = async(product) => {
      let {selectedStyleIndex, myDesignList} = this.state;
      await this.setState({
        showProductAddModal: false,
        myDesignList: [product, ...myDesignList]
      })
      await this.onImageSelect('my', selectedStyleIndex, product.id)
      this.refs._myDesignList.scrollTo({top: 0, behavior: 'smooth'})
    }

    render() {
        let { myDesignList, nitexDesignList, titleError, showProductAddModal } = this.state;
        let { numberOfStyles, styles, colorList, title } = this.props.rfq;
        console.log("styles",styles)
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
            <section className="request-for-quote">
                <div className="heading">
                    <h1>Share your designs</h1>
                    <p>Share as many product designs as you like to get quotes in 24 hours</p>
                </div>


                <div className="quote-tab tech-pack">

                  <div id="ShareDesignDocuments" className="tab-pane">
                      <div className="row">
                          <div className="col-lg-12">
                              <div className="form-group">
                                  <label>Number of designs</label>
                                  <select className="nice-select" name="numberOfStyles" value={numberOfStyles} onClick={this.onChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div className="style-item">
                          <div className="accordion" id="accordionExample">

                          {
                            styles.map((item,i) => {
                              return (
                                <div className="card" key={i}>
                                    <div className="card-header" id={`#heading_${i}`}>
                                        <h2 className="mb-0">
                                            <button className="btn" type="button" data-toggle="collapse"
                                                data-target={`#collapse_${i}_SDC`} aria-expanded={i==0 ? "true" : "false"}
                                                aria-controls={`collapse_${i}_SDC`}>
                                                Design {i+1}
                                            </button>
                                        </h2>
                                    </div>
                                    <div id={`collapse_${i}_SDC`} className={ 'collapse' + ( i == 0 ? ' show' : '' ) } aria-labelledby={`heading_${i}`}
                                        data-parent="#accordionExample">
                                        <div className="card-body">

                                            <div className="form-group d-flex justify-content-between align-items-center">
                                                <div className="design-tile">
                                                    <label htmlFor="styleQuantity">Select design<span className="error">*</span></label>
                                                    <p>Note: Upload a tech pack or choose from product catalogs</p>
                                                </div>
                                                <div className="add-new m-0" onClick={() => this.setState({showProductAddModal: true, selectedStyleIndex: i})}>Add new</div>
                                            </div>

                                            <div className="drug-n-drop">
                                                    <div className="form-group">
                                                        <div className="share-design uploaded-img custom-scrollbar" id="my-design" ref="_myDesignList" onScroll={() => this.onScrollToEnd(0)}>
                                                          {
                                                            myDesignList.length ?
                                                            myDesignList.map((image,index) => {
                                                              return(
                                                                <Image selected={item.myDesignList==image.id ? 'active' : ''} item={image} key={index} onClick={()=>this.onImageSelect('my',i,image.id)} />
                                                              )
                                                            }):
                                                            <div className="not-found">
                                                                <h1 className="msg">Oops, no designs found here</h1>
                                                                <div className="illustration">
                                                                    <img src={require("../../assets/images/not-found.png")} alt=""/>
                                                                </div>
                                                            </div>
                                                          }

                                                        </div>
                                                        {
                                                          item.fileError ? <span className="error">{item.fileError}</span> : ''
                                                        }

                                                    </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label>Note</label>
                                                        <textarea name="" id="" rows="3"
                                                            placeholder="Give details or special notes..." value={item.note} name="note" onChange={(e) => this.onChangeStyle(e,i)}>
                                                        </textarea>
                                                        {
                                                          item.noteError ? <span className="error">{item.noteError}</span> : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              )
                            })
                          }
                          </div>
                      </div>
                      {this.loadJsFiles()}
                      <div className="form-row">
                          <div className="form-group col-md-12">
                              <label htmlFor="quantity">Give a name to your request</label>
                              <input type="text" className="form-control" value={title} name="title"
                                     onChange={this.onChange} placeholder="Enter here"/>
                              {
                                  titleError ? <span className="error">{titleError}</span> : ''
                              }
                          </div>
                      </div>
                      <div className="row mt-4">
                          <div className="col-lg-12">
                              <button className="btn-brand" onClick={this.submit}>Get quote</button>
                          </div>
                      </div>
                  </div>

                </div>
                <Modal
                  show={showProductAddModal}
                  onHide={() => this.setState({showProductAddModal: false})}
                  dialogClassName="modal-xl share-design-modal"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                {/*<Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                      </Modal.Title>
                  </Modal.Header>*/}
                  <Modal.Body>
                      <Contents _closeModal={this._closeModal} _goToStep={this._goToStep} formStep={this.state.formStep} _goToFormStep={this._goToFormStep}/>
                  </Modal.Body>
                </Modal>
            </section>
          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
  return {
		rfq: store.rfq
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


export default connect(mapStateToProps, mapDispatchToProps)(RequestForQuotation);
