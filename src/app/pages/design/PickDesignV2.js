import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import loadjs from "loadjs";
import Carousel from 'react-elastic-carousel';
import LoadingOverlay from 'react-loading-overlay';

import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';
import {ProductSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { _getKey } from '../../services/Util';

class PickDesignV2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          groupwiseProductList : [],
          loading : false,
          designList : [],
          page : 0,
          size : 20,
          search : '',
          sort : 'favCount,desc',
          productTypeId : '',
          popular : [],
          trending : [],
          nitexSuggestion : [],
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
        };
    }

    handleScroll = async() => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading, designList, size } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading && designList.length){
          let data = await this.renderList(page+1)
          if(data.length>0){
            this.setState({
              designList : [ ...designList, ...data ],
              page : page+1,
              hasNext : data.length === size ? true : false,
              loading:false
            })
          }else{
            this.setState({
              // designList : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Product List - no data found.");
          }
        }else if(designList.length){
          if(!hasNext){
            // toastWarning("No more data found.")
          }
        }
        // this.setState({
        //     message: 'bottom reached'
        // });
      } else {

        }
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount = async() => {
      document.title = "Explore designs - Nitex - The easiest clothing manufacturing software";
      window.addEventListener("scroll", this.handleScroll);
      loadjs(['/js/custom.js']);
      // await this.setCategories()
      // let designList = await this.renderList();
      // this.setState({
      //   designList,
      //   hasNext: designList.length === this.state.size ? true : false
      // })
    }

    setCategories = () => {
      Http.GET('getProductTypeWithGroupWithData')
        .then(({data}) => {
          console.log('getProductTypeWithGroup SUCCESS: ', data);
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
                arr[arr.length] = obj;
              }
            }
            this.setState({
              groupwiseProductList : arr
            })
          }else{
            toastWarning("Product Group List - no data found.");
          }
        })
        .catch(({response}) => {
            // console.log('PRODUCT LIST ERROR: ', response);
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }


    renderList = async(page = 0) => {
      this.setState({loading:true})
      let { size, designList, search, sort, productTypeId } = this.state;
      // let params = `?page=${page}&size=${size}`;
      let params = {
        page : page,
        size : size,
        search : search,
        // filterBy : filterBy,
        productTypeId : productTypeId,
        sort : sort
      };
      let result = [];
      await Http.GET('getPickDesign',params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            // if(merge){
            //   this.setState({
            //     designList : [ ...designList, ...data ],
            //     page : page+1
            //   })
            // }else{
            //   this.setState({
            //     designList : data,
            //     page : page+1
            //   })
            // }
            result = data;
          }else{
            // toastWarning("Product List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
        return result;
    }

    onChange = async(e) => {
      // console.log(this.state.sort);
      // let designList = [];
      this.setState({
        [e.target.name] : e.target.value,
        page : 0,
        hasNext : true,
        productTypeId : ''
        // size : 100
      },async(name)=>{
        let designList = await this.renderList();
        await this.setState({
          designList,
          hasNext: designList.length === this.state.size ? true : false
        })
      })
      if(e.target.name=='search'){
        return;
      }

    }

    onChangeSrchText = (e) => {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    keyPressed = async(e) => {
      // console.log("entered")
      if(e.key==='Enter'){
        this._search()
      }
    }

    _search = async() => {
      this.setState({
        page : 0,
        hasNext : true,
        productTypeId : ''
        // size : 100
      })
      let designList = await this.renderList();
      await this.setState({
        designList,
        hasNext : designList.length === this.state.size ? true : false
      })
    }

    setProductType = async(productTypeId) => {
      console.log(productTypeId)
      await this.setState({
        productTypeId,
        page : 0,
        hasNext : true,
        // size : 100,
        search : ''
      })
      let designList = await this.renderList();
      await this.setState({
        designList,
        hasNext : designList.length === this.state.size ? true : false
      })
    }

    details = (id = 0) => {
        window.open('/my-products/' + id, "_blank");
    }

    likeProduct = (id) => {
      this.setState({
        loading:true
      })

      Http.POST( 'likeProduct' , {} , id )
        .then(({data}) => {
          console.log('likeProduct SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false})
          if(data.success){
            // toastSuccess(data.message);
            let { designList } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                return item;
              }
              return item;
            })
            this.setState({
              designList
            })
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('LOGIN Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    unlikeProduct = (id) => {
      this.setState({
        loading:true
      })

      Http.POST( 'unlikeProduct' , {} , id )
        .then(({data}) => {
          console.log('unlikeProduct SUCCESS: ', JSON.stringify(data));
          if(data.success){
            // toastSuccess(data.message);
            let { designList } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })
            this.setState({
              designList
            })
          }else{
            toastError(data.message);
          }
          this.setState({loading:false})
        })
        .catch(({response}) => {
            console.log('unlikeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        let { designList, groupwiseProductList, popular, trending, nitexSuggestion, productTypeId, sort } = this.state;
        return (
          <div className="explore-design">

              <div className="filter-container explore-design-filter">
                  <div id="catItem" className="cat-menu d-none d-xl-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18">
                          <g id="menu_5_" data-name="menu (5)" transform="translate(-2.5 -5)">
                              <line id="Line_53" data-name="Line 53" x2="18" transform="translate(6.5 14)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_54" data-name="Line 54" x2="24" transform="translate(3.5 6)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_55" data-name="Line 55" x2="9" transform="translate(11.5 22)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                      </svg>
                  </div>
                  <div className="cat-menu cat-mobile-menu d-block d-xl-none" data-toggle="modal" data-target="#CatMenuMobile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18">
                          <g id="menu_5_" data-name="menu (5)" transform="translate(-2.5 -5)">
                              <line id="Line_53" data-name="Line 53" x2="18" transform="translate(6.5 14)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_54" data-name="Line 54" x2="24" transform="translate(3.5 6)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_55" data-name="Line 55" x2="9" transform="translate(11.5 22)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                      </svg>
                  </div>
                  <div className="search flex-grow-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">
                          <path id="Path_23797" data-name="Path 23797" d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z" transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2" stroke-width="0.5"/>
                      </svg>
                      <input type="search" placeholder="Product name, collection name" className="w-100"/>

                      <ul className="filter-tag">
                          <li className="active">
                              <a href="">Men’s wear</a>
                              <div className="close-tag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                      </g>
                                  </svg>
                              </div>
                          </li>
                          <li>
                              <a href="">Polo t-shirt</a>
                              <div className="close-tag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                      </g>
                                  </svg>
                              </div>
                          </li>
                          <li>
                              <a href="">Men’s wear</a>
                              <div className="close-tag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                      </g>
                                  </svg>
                              </div>
                          </li>
                          <li>
                              <a href="">Men’s wear</a>
                              <div className="close-tag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                      </g>
                                  </svg>
                              </div>
                          </li>
                          <li>
                              <a href="">Men’s wear</a>
                              <div className="close-tag">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                      </g>
                                  </svg>
                              </div>
                          </li>

                      </ul>
                  </div>
                  <div className="filter-cat" style={{display: 'none'}}>
                      <ul className="list">
                          <div className="title">Men</div>
                          <li>T-shirts</li>
                          <li>Polo shirts</li>
                          <li>Sweatshirts</li>
                          <li>Shirts</li>
                          <li>Trousers</li>
                          <li>Pants</li>
                          <li>Joggers</li>
                      </ul>
                      <ul className="list">
                          <div className="title">Women</div>
                          <li>T-shirts</li>
                          <li>Polo shirts</li>
                          <li>Sweatshirts</li>
                          <li>Shirts</li>
                          <li>Trousers</li>
                          <li>Pants</li>
                          <li>Joggers</li>
                      </ul>
                      <ul className="list">
                          <div className="title">Kid</div>
                          <li>T-shirts</li>
                          <li>Polo shirts</li>
                          <li>Sweatshirts</li>
                          <li>Shirts</li>
                          <li>Trousers</li>
                          <li>Pants</li>
                          <li>Joggers</li>
                      </ul>
                      <ul className="list">
                          <div className="title">Color</div>
                          <li>T-shirts</li>
                          <li>Polo shirts</li>
                          <li>Sweatshirts</li>
                          <li>Shirts</li>
                          <li>Trousers</li>
                          <li>Pants</li>
                          <li>Joggers</li>
                      </ul>
                      <ul className="list">
                          <div className="title">Fabrications</div>
                          <li>T-shirts</li>
                          <li>Polo shirts</li>
                          <li>Sweatshirts</li>
                          <li>Shirts</li>
                          <li>Trousers</li>
                          <li>Pants</li>
                          <li>Joggers</li>
                      </ul>
                  </div>
              </div>

              <div className="designs">
                  <h4 className="mb-4 font-weight-normal">Designer’s Choice <a href="#"><span className="view-all">VIEW ALL</span></a></h4>
                  {/*<div className="explore-design-carasoul owl-carousel owl-theme">*/}
                  <Carousel itemsToShow={4}>
                      <div className="item">
                          <div className="card product-card new-card active">
                              <div className="thumb">
                                  <div className="favourite-part choose active">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part active">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="card product-card new-card">
                              <div className="thumb">
                                  <div className="favourite-part choose">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                      </svg>
                                  </div>
                                  <div className="favourite-part">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                          <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                      </svg>
                                  </div>
                                  <img src={require("../../assets/images/design5.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                  <button className="btn-brand">Quote Now</button>
                              </div>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                  <span className="design-category">Men</span>
                                  <div className="card-footer">
                                      <div className="quantity">
                                          <span>MOQ <strong>500 Pcs</strong></span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                          </svg>
                                          <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                <g id="delivery-truck" transform="translate(0 -68.867)">
                                                  <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                    <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                      <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                    <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                      <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                    <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                      <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                  <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                    <g id="Group_10724" data-name="Group 10724">
                                                      <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                    </g>
                                                  </g>
                                                </g>
                                              </svg>

                                              <strong>15 Days</strong>
                                          </span>
                                      </div>
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Carousel>
                  {/*</div>*/}
              </div>

              <div className="banner-section mb-4 overflow-hidden">
                  <div className="row">
                      <div className="col-md-6">
                          <a href="#"><img src={require("../../assets/images/banner1.png")} alt="" className="w-100"/></a>
                      </div>
                      <div className="col-md-6">
                          <a href="#"><img src={require("../../assets/images/banner2.png")} alt="" className="w-100"/></a>
                      </div>
                  </div>
              </div>
          </div>
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
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(PickDesignV2);
