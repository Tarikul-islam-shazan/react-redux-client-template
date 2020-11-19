import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { UploadedItem } from '../../commonComponents/UploadedItem';

import { _storeData } from "./actions";
import { Image } from "../../commonComponents/Image";

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

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
          ]
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

    onFileUpload = (e,i,docType) => {
      // console.log("upload",e.target.name);
      // return;
      let { styles } = this.props.rfq;
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
        styles[i][key] = data;
        styles[i].myDesignList = 0;
        styles[i].nitexDesignList = 0;
        this.props._storeData('styles',styles)
        // console.log("base64",reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    onMultipleFileSelect = async(e,docType,i) => {
      console.log("index",i)
      let { styles } = this.props.rfq;
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
          styles[i][key].push(data);
          console.log("styles from multi",styles);
          this.props._storeData('styles',styles)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      })
      // console.log("data multiple",arr[0])
    }

    addColorObj = async(i) => {
      let { styles } = this.props.rfq;
      let { colorError } = this.state;
      styles[i].colorList.push({
        id : '',
        quantity : ''
      })
      styles[i].colorError.push({
        idError : '',
        quantityError : ''
      })
      this.props._storeData('styles',styles)
      loadjs(['/js/script.js']);
    }

    removeColorObj = async(i) => {
      let { styles } = this.props.rfq;
      styles[i].colorList.pop();
      styles[i].colorError.pop();
      this.props._storeData('styles',styles)
      loadjs(['/js/script.js']);
    }

    onColorChange = ( e , i, j ) => {
      console.log("indexes",i+"  "+j)
      let { styles } = this.props.rfq;
      styles[i].colorList[j][e.target.name] = e.target.value;
      this.props._storeData('styles',styles)
      console.log("styles",styles)
      loadjs(['/js/script.js']);
    }

    hasErrorColor = () => {
      let { styles } = this.props.rfq;
      let colorError = [];
      let flag = false;
      let result = styles;
      styles.map((item,i)=>{
        item.colorList.map((colorObj,j)=>{
          if(colorObj.id == ''){
            flag = true;
            result[i].colorError[j].idError = 'Color is required'
          }else{
            result[i].colorError[j].idError = ''
          }
          if(colorObj.quantity == ''){
            flag = true;
            result[i].colorError[j].quantityError = 'Quantity is required'
          }else{
            result[i].colorError[j].quantityError = ''
          }
        })
      })
      this.props._storeData('styles',result)
      return flag;
    }

    onImageSelect = (type,i,itemId) => {
      let { styles } = this.props.rfq;
      if(type=='nitex'){
      //   if(styles[i].nitexDesignList.includes(itemId)){
      //     styles[i].nitexDesignList = styles[i].nitexDesignList.filter((item)=>{
      //       return item!=itemId;
      //     })
      //   }else{
      //     styles[i].nitexDesignList.push(itemId)
      //   }
      if(styles[i].nitexDesignList==itemId){
        styles[i].nitexDesignList = 0;
      }else{
        styles[i].techPackFile = {};
        styles[i].myDesignList = 0;
        styles[i].nitexDesignList = itemId;
      }
      }else if(type=='my'){
        // if(styles[i].myDesignList.includes(itemId)){
        //   styles[i].myDesignList = styles[i].myDesignList.map((item)=>{
        //     return item!=itemId;
        //   })
        // }else{
        //   styles[i].myDesignList.push(itemId)
        // }
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
      if(!this.hasErrorColor() && flag){
        let body = {
          name : rfq.title,
          numOfStyles : rfq.numberOfStyles,
          notes : 'test',
          productDTOList : rfq.styles.map((item,i) => {
            let temp = {};
            temp.name = "Style "+(i+1);
            temp.note = item.note;
            temp.colorDTOList = item.colorList;
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
            temp.documentDTOList = [...item.designInspirationsFiles, ...item.otherFiles];
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
              window.location.reload();
              // this.props.history.push('/quote-request');
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

    render() {
        let { myDesignList, nitexDesignList, titleError } = this.state;
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
                                                Designs {i+1}
                                            </button>
                                        </h2>
                                    </div>
                                    <div id={`collapse_${i}_SDC`} className={ 'collapse' + ( i == 0 ? ' show' : '' ) } aria-labelledby={`heading_${i}`}
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="styleQuantity">Select design<span className="error">*</span></label>
                                                <p>Note: Upload a tech pack or choose from product catalogs</p>
                                            </div>

                                            <div className="drug-n-drop">
                                                <div className="development-step-1">
                                                    <div className="form-group">
                                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active" data-toggle="tab" href={`#techpack_${i}`} role="tab">Upload tech pack</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-toggle="tab" href={`#nitex_${i}`} role="tab">Choose From nitex</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-toggle="tab" href={`#design_${i}`} role="tab">Choose your product</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content align-self-center" id="myTabContent">
                                                            <div className="tab-pane fade show active" id={`techpack_${i}`} role="tabpanel">
                                                                {

                                                                  item.techPackFile && item.techPackFile.name ?
                                                                  <p style={{color:'black'}}>{item.techPackFile.name}</p>
                                                                  :
                                                                  <>
                                                                    <h5>Drag and Drop File</h5>
                                                                    <br /> Or
                                                                    <br />
                                                                    <br /> Upload your detailed tech pack here
                                                                    <br />
                                                                    <br />
                                                                  </>
                                                                }

                                                                <div className="file btn">
                                                                    Choose file
                                                                    <input type="file" name="techPackFile" onChange={(e) => this.onFileUpload(e,i,'TECH_PACK_DESIGN')}/>
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id={`nitex_${i}`} role="tabpanel">
                                                                <div className="uploaded-img" id="nitex-design" onScroll={() => this.onScrollToEnd(1)}>
                                                                  {
                                                                    nitexDesignList.length ?
                                                                    nitexDesignList.map((image,index) => {
                                                                      return(
                                                                        <Image selected={item.nitexDesignList == image.id ? 'active' : ''} item={image} key={index} onClick={()=>this.onImageSelect('nitex',i,image.id)} />
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
                                                            </div>
                                                            <div className="tab-pane fade" id={`design_${i}`} role="tabpanel">
                                                                <div className="uploaded-img" id="my-design" onScroll={() => this.onScrollToEnd(0)}>
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
                                                            </div>
                                                        </div>
                                                        {
                                                          item.fileError ? <span className="error">{item.fileError}</span> : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                              item.colorList.map(( color , j ) => {
                                                return(
                                                  <div className="row" key={j}>
                                                    {
                                                      this.state.colors.length ?
                                                      <>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Color*</label>
                                                                <select className="nice-select" name="id" value={color.id} onClick={(e) => this.onColorChange(e,i,j)}>
                                                                    <option value="">Choose Color</option>
                                                                    {
                                                                      this.state.colors.map((colorObj,k) => (
                                                                        <option key={k} value={colorObj.id}>{colorObj.name}</option>
                                                                      ))
                                                                    }
                                                                </select>
                                                                {
                                                                  item.colorError[j].idError ? <span className="error">{item.colorError[j].idError}</span> : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Quantity*</label>
                                                                <input type="text" placeholder="Enter Quantity" name="quantity" value={color.quantity} onChange={(e) => this.onColorChange(e,i,j)}/>
                                                                {
                                                                  item.colorError[j].quantityError ? <span className="error">{item.colorError[j].quantityError}</span> : ''
                                                                }
                                                            </div>
                                                        </div>
                                                      </>:
                                                      <div className="col-lg-12">
                                                        <p>No color list found.</p>
                                                      </div>
                                                    }

                                                  </div>
                                                )
                                              })
                                            }

                                            <div className="col-lg-12">
                                                <div className="add-new color" onClick={() => this.addColorObj(i)}>
                                                    <span>Add color</span>
                                                </div>
                                                {
                                                  item.colorList.length > 1 ?
                                                  <div className="add-new reduce color" onClick={() => this.removeColorObj(i)} style={{marginLeft:10,color:'red'}}>
                                                      <span>Remove color</span>
                                                  </div> :
                                                  <></>
                                                }
                                            </div>

                                            <div className="design-upload">
                                                 <div className="row">
                                                    <div className="col-md-4 col-lg-4">
                                                        <div className="form-group">
                                                            <label>Design inspirations</label>
                                                            <p className="form-text text-muted">You can upload multiple files here</p>
                                                        </div>
                                                      <div className="row no-gutters">
                                                          <div className="col-lg-8">
                                                              <label className="btn btn-nitex-default">
                                                                  Upload
                                                                  <input type="file" name="designInspirationsFiles" onChange={(e) => this.onMultipleFileSelect(e,'DESIGN_INSPIRATION',i)} multiple hidden/>
                                                              </label>
                                                          </div>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-8">
                                                    {
                                                      item.designInspirationsFiles.map((item,_key) => {
                                                        return(
                                                          <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('designInspirationsFiles',i,_key)} />
                                                        )
                                                      })
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="design-upload">
                                                 <div className="row">
                                                    <div className="col-md-4 col-lg-4">
                                                        <div className="form-group">
                                                            <label>Accessories files</label>
                                                             <p className="form-text text-muted">You can upload multiple files here</p>
                                                        </div>
                                                        <div className="row no-gutters">
                                                            <div className="col-lg-8">
                                                                <label className="btn btn-nitex-default">
                                                                    Upload
                                                                    <input type="file" name="otherFiles" onChange={(e) => this.onMultipleFileSelect(e,'ACCESSORIES_DESIGN',i)} multiple hidden/>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-8">
                                                    {
                                                      item.otherFiles.map((item,_key) => {
                                                        return(
                                                          <UploadedItem key={_key} item={item} remove={() => this.removeFromArray('otherFiles',i,_key)} />
                                                        )
                                                      })
                                                    }

                                                    </div>
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
