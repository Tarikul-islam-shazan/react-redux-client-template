import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { UploadedItem } from '../../../commonComponents/UploadedItem';

import { _storeData } from "../actions";
import { Image } from "../../../commonComponents/Image";
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

class NewDevelopmentStep_1 extends Component {

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

    componentDidMount = async() => {
      await this.renderNitexList()
      await this.renderMyList()
      await Http.GET('getColorType')
        .then(({data}) => {
          console.log('COLOR LIST SUCCESS: ', data);
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
            console.log('COLOR LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
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
          // localStorage.removeItem('token');
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
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('nitexDesignList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    renderMyList = ( page = 0 , merge = true ) => {
      this.setState({loading:true})
      let { size, myDesignList } = this.state;
      let params = `?page=${page}&size=${size}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;
      Http.GET('getProductList',params)
        .then(({data}) => {
          console.log('myDesignList SUCCESS: ', data);
          // localStorage.removeItem('token');
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
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('myDesignList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    loadJsFiles = () => {
      loadjs(['/js/script.js','/js/custom.js']);
    }

    onChange = (e) => {
      if(e.target.name=='numberOfStyles'){
        let { styles, numberOfStyles, colorList } = this.props.project;
        let { colorError } = this.state;
        console.log("clicked",e.target.value-numberOfStyles)
        let temp = {
          myDesignList:0,
          nitexDesignList:0,
          fileError:'',
          developmentType:'',
          developmentTypeError:'',
          designInspirationsFiles:[],
          otherFiles:[],
          note:'',
          noteError:'',
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
      let { styles } = this.props.project;
      styles[i][e.target.name] = e.target.value;
      console.log(e.target.name,e.target.value)
      this.props._storeData('styles',styles);
    }

    onFileUpload = (e,i,docType) => {
      // console.log("upload",e.target.name);
      // return;
      let { styles } = this.props.project;
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

    addColorObj = async(i) => {
      let { styles } = this.props.project;
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
      let { styles } = this.props.project;
      styles[i].colorList.pop();
      styles[i].colorError.pop();
      this.props._storeData('styles',styles)
      loadjs(['/js/script.js']);
    }

    onColorChange = ( e , i, j ) => {
      console.log("indexes",i+"  "+j)
      let { styles } = this.props.project;
      styles[i].colorList[j][e.target.name] = e.target.value;
      this.props._storeData('styles',styles)
      console.log("styles",styles)
      loadjs(['/js/script.js']);
    }

    hasErrorColor = () => {
      let { styles } = this.props.project;
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
      let { styles } = this.props.project;
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

    onMultipleFileSelect = async(e,docType,i) => {
      console.log("index",i)
      let { styles } = this.props.project;
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

    submit = () => {
      let flag = true;
      let { project } = this.props;
      project.styles.map((item,i) => {
        if(item.myDesignList==0 && item.nitexDesignList==0 && ( item.techPackFile == null || !item.techPackFile.name )){
          flag = false;
          project.styles[i].fileError = 'Please choose an option from above';
        }else{
          project.styles[i].fileError = '';
        }
        // if(item.note==''){ //making note/description not mandatory
        //   flag = false;
        //   project.styles[i].noteError = 'Description is required';
        // }else{
        //   project.styles[i].noteError = '';
        // }
        if(item.developmentType=='' && project.project_type == 'DEVELOPMENT'){
          flag = false;
          project.styles[i].developmentTypeError = 'Sample type is required';
        }else{
          project.styles[i].developmentTypeError = '';
        }
      })
      this.props._storeData('styles',project.styles)
      if(project.title==''){
        flag = false;
        this.setState({
          titleError : 'Title is required'
        })
      }else{
        this.setState({
          titleError : ''
        })
      }
      // this.props._goToStep(2)

      if(!this.hasErrorColor() && flag){
        this.props._goToStep(2)
      }
    }

    removeFromArray = (keyName,styleIndex,itemIndex) => {
      console.log(keyName,styleIndex,itemIndex)
      let { styles } = this.props.project
      console.log(styles[styleIndex][keyName])
      styles[styleIndex][keyName] = styles[styleIndex][keyName].filter((item,i) => {
        return i!=itemIndex;
      })
      this.props._storeData('styles',styles)
    }

    render() {
        let { myDesignList, nitexDesignList, titleError } = this.state;
        let { numberOfStyles, styles, colorList, title, project_type } = this.props.project;
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
            <div className="modal-dialog modal-xl">
                <div className="modal-content development1-modal">
                    <div className="modal-body">
                        <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="section-header text-center">
                                            <h5 className="section-title">New project</h5>
                                            <p className="section-subtitle">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 col-md-12">
                                        <div className="section-content development-step-1">
                                            <div className="form-steps text-center mb-4 mt-2">
                                                <ul>
                                                    <li className="step active">1</li>
                                                    <li className="step">2</li>
                                                </ul>
                                            </div>
                                            <form>
                                                <div className="form-row">
                                                  <div className="form-group col-md-12">
                                                      <label for="quantity">Project title*</label>
                                                      <input type="text" className="form-control" value={title} name="title" onChange={this.onChange} placeholder="Project Title"/>
                                                      {
                                                        titleError ? <span style={{color:'red'}}>{titleError}</span> : ''
                                                      }
                                                  </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label>Number of products</label>
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
                                                <div className="accordion" id="accordionExample">
                                                {
                                                  styles.map((item,i) => {
                                                    return(
                                                      <div className="card" key={i}>
                                                          <div className="card-header" id={`headingPro_${i}`} data-toggle="collapse" data-target={`#collapsePro_${i}`}>
                                                              <p className="mb-0">
                                                                  Product {i+1}
                                                              </p>
                                                          </div>

                                                          <div id={`collapsePro_${i}`} className={"card-body collapse "+i==0?'show':''} data-parent="#accordionExample">
                                                              <div className="form-group" style={{marginTop:20}}>
                                                                  <label htmlFor="productDescription">Product description</label>
                                                                  <p className="form-text text-muted">
                                                                      <b>Note: </b>
                                                                      Describe your product idea for us
                                                                  </p>
                                                                  <textarea className="form-control" name="note" onChange={(e) => this.onChangeStyle(e,i)} rows="4" placeholder="Write details..."/>
                                                                  {
                                                                    item.noteError ? <span style={{color:'red'}}>{item.noteError}</span> : ''
                                                                  }
                                                              </div>

                                                              <div className="form-group">
                                                                  <label htmlFor="note">Select product*</label>
                                                                  <p className="form-text text-muted">
                                                                      <b>Note: </b>
                                                                      Upload a tech pack or choose from product catalogs
                                                                  </p>
                                                                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                                      <li className="nav-item">
                                                                          <a className="nav-link active" data-toggle="tab" href={`#techpack_pro_${i}`} role="tab">Upload tech pack</a>
                                                                      </li>
                                                                      {
                                                                        project_type != 'SUPERVISION' &&
                                                                        <li className="nav-item">
                                                                            <a className="nav-link" data-toggle="tab" href={`#nitex_pro_${i}`} role="tab">Choose from nitex</a>
                                                                        </li>
                                                                      }
                                                                      <li className="nav-item">
                                                                          <a className="nav-link" data-toggle="tab" href={`#design_pro_${i}`} role="tab">Choose your product</a>
                                                                      </li>
                                                                  </ul>
                                                                  <div className="tab-content align-self-center" id="myTabContent">
                                                                      <div className="tab-pane fade show active" id={`techpack_pro_${i}`} role="tabpanel">
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
                                                                          <label className="btn btn-outline-nitex btn-outline" style={{display: "inline"}}>
                                                                              Choose File
                                                                              <input type="file" hidden  name="techPackFile" onChange={(e) => this.onFileUpload(e,i,'TECH_PACK_DESIGN')}/>
                                                                          </label>
                                                                      </div>
                                                                      {
                                                                        project_type != 'SUPERVISION' &&
                                                                        <div className="tab-pane fade" id={`nitex_pro_${i}`} role="tabpanel">
                                                                          <div className="uploaded-img" id="nitex-design" onScroll={() => this.onScrollToEnd(1)}>
                                                                            {
                                                                              nitexDesignList.length ?
                                                                              nitexDesignList.map((image,index) => {
                                                                                return(
                                                                                  <Image selected={item.nitexDesignList == image.id ? 'active' : ''} item={image} key={index} onClick={()=>this.onImageSelect('nitex',i,image.id)} />
                                                                                )
                                                                              }) :
                                                                              <p>No design list found.</p>
                                                                            }
                                                                          </div>
                                                                        </div>
                                                                      }
                                                                      <div className="tab-pane fade" id={`design_pro_${i}`} role="tabpanel">
                                                                        <div className="uploaded-img" id="my-design" onScroll={() => this.onScrollToEnd(0)}>
                                                                          {
                                                                            myDesignList.length ?
                                                                            myDesignList.map((image,index) => {
                                                                              return(
                                                                                <Image selected={item.myDesignList==image.id ? 'active' : ''} item={image} key={index} onClick={()=>this.onImageSelect('my',i,image.id)} />
                                                                              )
                                                                            }) :
                                                                            <p>No design list found.</p>
                                                                          }
                                                                        </div>
                                                                      </div>
                                                                  </div>
                                                                  {
                                                                    item.fileError ? <span style={{color:'red'}}>{item.fileError}</span> : ''
                                                                  }
                                                              </div>
                                                              {
                                                                project_type == 'DEVELOPMENT' &&
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-12">
                                                                        <label htmlFor="sampleType">Sample type</label>
                                                                        <select className="nice-select" name="developmentType" value={item.developmentType} onClick={(e) => this.onChangeStyle(e,i)}>
                                                                            <option value="">Select Sample type</option>
                                                                            <option value="FIT">FIT</option>
                                                                            <option value="STYLING">STYLING</option>
                                                                            <option value="PROTO">PROTOTYPE</option>
                                                                            <option value="PRE_PRODUCTION">PRE PRODUCTION</option>
                                                                            <option value="SALESMAN">SALESMAN</option>
                                                                            <option value="SHIPPING">SHIPPING</option>
                                                                        </select>
                                                                        {
                                                                          item.developmentTypeError ? <span style={{color:'red'}}>{item.developmentTypeError}</span> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                              }
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
                                                                                    item.colorError[j].idError ? <span style={{color:'red'}}>{item.colorError[j].idError}</span> : ''
                                                                                  }
                                                                              </div>
                                                                          </div>
                                                                          <div className="col-lg-6">
                                                                              <div className="form-group">
                                                                                  <label>Quantity*</label>
                                                                                  <input type="text" placeholder="Enter Quantity" name="quantity" value={color.quantity} onChange={(e) => this.onColorChange(e,i,j)}/>
                                                                                  {
                                                                                    item.colorError[j].quantityError ? <span style={{color:'red'}}>{item.colorError[j].quantityError}</span> : ''
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
                                                                  <div className="row align-items-center">

                                                                      <div className="form-group col-sm-12 col-md-12  col-lg-3">
                                                                          <label>Product inspirations</label>
                                                                          <p className="form-text text-muted" style={{paddingBottom: '15px'}}>You can upload multiple files here</p>
                                                                          <label className="btn btn-nitex-default" style={{display: "inline"}}>
                                                                              Upload
                                                                              <input type="file" name="designInspirationsFiles" onChange={(e) => this.onMultipleFileSelect(e,'REFERENCE_IMAGE',i)} multiple hidden/>
                                                                          </label>
                                                                      </div>
                                                                      <div className="col-sm-12 col-md-12  col-lg-9">
                                                                          <div className="form-group">
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
                                                              </div>

                                                              <div className="design-upload">
                                                                  <div className="row align-items-center">
                                                                      <div className="form-group col-sm-12 col-md-12  col-lg-3">
                                                                          <label>Accessories files</label>
                                                                          <p className="form-text text-muted" style={{paddingBottom: '15px'}}>You can upload multiple files here</p>
                                                                          <label className="btn btn-nitex-default" style={{display: 'inline', padding: '11px 33px'}}>
                                                                              Upload
                                                                              <input type="file" name="otherFiles" onChange={(e) => this.onMultipleFileSelect(e,'ACCESSORIES_DESIGN',i)} multiple hidden/>
                                                                          </label>
                                                                      </div>
                                                                      <div className="col-sm-12 col-md-12  col-lg-9">
                                                                          <div className="form-group">
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
                                                              </div>
                                                          </div>
                                                      </div>
                                                    )
                                                  })
                                                }
                                                </div>
                                            </form>
                                            {this.loadJsFiles()}
                                            <div className="form-row">
                                                <div className="col-md-3 ml-auto text-right">
                                                    <button className="btn btn-nitex-default btn-block mt-5" onClick={this.submit}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
  return {
		project: store.project
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentStep_1);
