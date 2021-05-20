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
import { encodeQueryData, clothingLabelStatus } from '../../services/Util';
import ProductCardWithTick from '../../commonComponents/ProductCardWithTick';
import {ModalMyProductCard} from '../../commonComponents/ModalMyProductCard';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT, LOCAL_QUOTE_NOW_KEY } from '../../constant';
import {_storeData, _getProductForQuote} from '../design/actions';

class CollectionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          collection: {},
          page: 0,
          size: 20,
          loading:false,
          name: '',
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
          totalCount: 0,
          show: false,
          productList: [],
          myDesignList: [],
          myDesignHasNext: true,
          myDesignPage: 0,
          myDesignSize: 10,
          showAddMemberModal: false,
          showAddProductModal: false,
          usersByTypeList: [],
          allCheckBox: false,
          searchUserText: '',
          searchUserSuggestions: [],
          searchUserLoading: false,
          collectionList: [],
          collectionName: '',
          collectionNameError: '',
          showAddCollectionPopup: false,
          showCollectionAddOption: false,
          collectionType: '',
          collectionViewType: ''
        };
    }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    handleWindowScroll = async() => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading, productList, size } = this.state;
        console.log("hasNext", hasNext, page)
        if(hasNext && !loading && productList.length){
          await this.getCollectionProducts(page+1)
        }
      }
    }

    handleMyProductScroll = async() => {
      const wrappedElement = document.getElementById('myProductList');
      if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
        console.log('bottom reached');
        let { myDesignHasNext, myDesignPage, myDesignLoading, myDesignList, size } = this.state;
        console.log("message", 'bottom reached', myDesignHasNext, myDesignPage, myDesignLoading)
        if (myDesignHasNext && !myDesignLoading && myDesignList.length) {
          await this.myProducts(myDesignPage+1)
        }
      }
    }

    handleClickOutside = (event) => {
        if (this.AddNewMemberModal && !this.AddNewMemberModal.contains(event.target)) {
            this.setState({
              showAddMemberModal: false,
            })
        }
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
              showAddCollectionPopup: false
            })
        }
     }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleWindowScroll);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount = async() => {
      window.addEventListener("scroll", this.handleWindowScroll);
      document.addEventListener('mousedown', this.handleClickOutside);
      let id = this.props.match.params.id;
      if (id !== 'private-collection') {
        await this.getCollectionDetails(id);
      }
      await this.getCollectionProducts(0);
      await this.fetchCollectionList();
      if (id === 'private-collection') {
        await this.setState({
          collectionType: 'private-collection'
        })
        return;
      }
      await this.myProducts();
      await this.getUsersByTypes();
    }

    getCollectionDetails = ( collectionId ) => {
      this.setState({loading:true})
      let { size, name } = this.state;
      Http.GET('getCollectionDetails', collectionId)
        .then(({data}) => {
          console.log('getCollectionDetails SUCCESS: ', data);
          if (data) {
            this.setState({collection: data})
          }
        })
        .catch(({response}) => {
            console.log('getCollectionDetails ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getCollectionProducts = ( page = 0 ) => {
      let paramName = 'viewType';
      let regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)');
      let results = regex.exec(this.props.location.search);
      if (results !== null) {
        this.setState({
          collectionViewType: results[1]
        })
        this.getViewTypeCollectionList(page, results[1]);
        return;
      }

      let collectionId = this.props.match.params.id;
      this.setState({loading: true})
      let { size, name, productList } = this.state;
      Http.GET('getCollectionProducts', `${collectionId}?page=${page}&size=${size}`)
        .then(({data}) => {
          console.log('getclients SUCCESS: ', data);
          this.setState({loading: false})
          if (data) {
            this.setState({
              productList: [...productList, ...data.data],
              page,
              hasNext: (data.currentPage + 1) < data.totalPages ? true : false
            })
          }
        })
        .catch(({response}) => {
            console.log('PROJECT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getViewTypeCollectionList = async(page, viewType) => {
      let { size, productList } = this.state;
      Http.GET('getCollectionProductsByCollectionType', `${viewType}?page=${page}&size=${size}`)
        .then(({data}) => {
          console.log('getclients SUCCESS: ', data);
          this.setState({loading: false})
          if (data) {
            this.setState({
              productList: [...productList, ...data.data],
              page,
              hasNext: (data.currentPage + 1) < data.totalPages ? true : false
            })
          }
        })
        .catch(({response}) => {
            console.log('PROJECT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    myProducts = async(page = 0) => {
      this.setState({myDesignLoading: true})
      let {myDesignList, myDesignPage, myDesignSize} = this.state;
      let params = `?page=${myDesignPage}&size=${myDesignSize}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;
      await Http.GET('getProductList', params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({myDesignLoading: false});
          if(data){
            this.setState({
              myDesignList: page === 0 ? data : [...myDesignList, ...data],
              page,
              myDesignHasNext: data.length === myDesignSize ? true : false
            });
          }
        })
        .catch(({response}) => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({myDesignLoading:false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getUsersByTypes = async() => {
      let {usersByTypeList} = this.state;
      let params = `?userTypes=MANAGER&userTypes=EXECUTIVE`;
      await Http.GET('getUsersByTypes', params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading: false});
          if(data){
            this.setState({
              usersByTypeList: data
            });
          }
        })
        .catch(({response}) => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    fetchCollectionList = () => {
      let userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
      } else {
        userInfo = {};
      }
      Http.GET('getUserCollectionList', userInfo.id)
        .then(({data}) => {
          if (data.data) {
            this.setState({collectionList: data.data});
          }
        })
        .catch(({response}) => {
        });
    }

    formatUserTypeList = () => {
      let {usersByTypeList} = this.state;
      let result = [];
      for (const [key, value] of Object.entries(usersByTypeList)) {
        result.push(
          <ul class="p-0 m-0 existing-item" key={key}>
              <div class="title">{key}</div>
              {
                value.map((user, i) => {
                  return (
                    <li key={i}>
                        <div class="d-flex align-items-center">
                            <img src={require('../../assets/images/pro_pic_default.svg')} alt=""/>
                            <div class="d-flex flex-column ml-2">
                                <span>{user.name}</span>
                                <div class="email">{user.email}</div>
                            </div>
                        </div>
                        <button class="btn-brand m-0 brand-bg-color" onClick={() => this.addUserToCollection(user.id)}>Add</button>
                    </li>
                  )
                })
              }
          </ul>
        )
      }
      return result;
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
            let { productList } = this.state;
            productList = productList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                return item;
              }
              return item;
            })
            this.setState({
              productList,
            })
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('LOGIN Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
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
            let { productList } = this.state;
            productList = productList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })
            this.setState({
              productList,
            })
          }else{
            toastError(data.message);
          }
          this.setState({loading:false})
        })
        .catch(({response}) => {
            console.log('unlikeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    updateProductCard = () => {
      let {selectedProductIds} = this.props;
      let {productList} = this.state;
      productList = productList.map((product) => {
        if (selectedProductIds.includes(product.id)) {
          product.isSelected = true;
        } else {
          product.isSelected = false;
        }
        if (selectedProductIds.length) {
          product.isAddedToList = true;
        } else {
          product.isAddedToList = false;
        }
        return product;
      })
      this.setState({productList});
    }

    addToQuote = async(ids) => {
      let products = await _getProductForQuote(ids);
      let quote = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);
      if (quote) {
        quote = JSON.parse(quote);
      }
      if (quote && quote.products && quote.products.length) {
        quote.products = [...quote.products, ...products];
      } else if (quote) {
        quote.products = products;
      } else {
        quote = {
          products
        }
      }
      localStorage.setItem(LOCAL_QUOTE_NOW_KEY, JSON.stringify(quote));
      await this.props._storeData('quoteObj', quote);
      await this.props._storeData('selectedProductIds', []);
      this.updateProductCard();
      this.props.history.push('/quote-now');
    }

    addToCollection = (product) => {
      let collectionId = this.props.match.params.id;

      let body = {
        id: collectionId,
        productIds: [product.id]
      };
      Http.POST('addProductToCollection', body)
        .then(({data}) => {
          if (data.success) {
            this.setState({
              productList: [product, ...this.state.productList]
            })
          }
        })
        .catch(({response}) => {
          if(response && response.data && response.data.message){
            toastError(response.data.message);
          }else{
            toastError("Request was unsuccessful.");
          }
        });
    }

    addUserToCollection = (userId) => {
      let collectionId = this.props.match.params.id;
      let body = {
        collectionId,
        userIds: [userId]
      }
      Http.POST('shareCollection', body)
        .then(({data}) => {
          if (data && data.success) {
            toastSuccess(data.message);
          }
        })
        .catch(({response}) => {
          if(response && response.data && response.data.message){
            toastError(response.data.message);
          }else{
            toastError("Request was unsuccessful.");
          }
        });
    }

    onChange = async(e) => {
      let {name, value, checked} = e.target;
      let {productList} = this.state;
      this.setState({
        [name] : name === 'allCheckBox' ? checked : value
      })
      if (name === 'allCheckBox') {
        if (checked === true) {
          await this.props._storeData('selectedProductIds', productList.map((product) => product.id));
          this.updateProductCard();
        } else {
          await this.props._storeData('selectedProductIds', []);
          this.updateProductCard();
        }
      } else if (name === 'searchUserText') {
        this.getSearchSuggestions()
      }
    }

    getSearchSuggestions = async() => {
      let {searchUserText} = this.state;
      this.setState({searchUserLoading: true})
      let params = `?userType=BUYER&email=${searchUserText}`;
      await Http.GET('getUserSuggestions', params)
        .then(({data}) => {
          console.log('getUserSuggestions SUCCESS: ', data);
          this.setState({searchUserLoading: false});
          if(data){
            this.setState({
              searchUserSuggestions: data
            });
          }
        })
        .catch(response => {
            console.log('getUserSuggestions ERROR: ', JSON.stringify(response));
            this.setState({searchUserLoading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    _search = async() => {
      await this.setState({
        page : 0
        // size : 100
      })
      this.renderList( 0 , false );
    }

    details = (id) => {
      this.props.history.push('/collections/view/' + id);
    }

    goToEdit = (id) => {
      this.props.history.push('/collection/edit/' + id);
    }

    delete = async(id) => {
      let body = {
        id
      }
      await Http.DELETE_WITH_BODY('deleteCollection', body)
        .then(({data}) => {
          console.log('addCollection SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false})
          if(data.success){
            toastSuccess(data.message);
            this.props.history.push('/collections/list');
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('addCollection Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onChangeText = (e) => {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    createNewCollection = () => {
      let {collectionName} = this.state;
      if (!collectionName) {
        this.setState({
          collectionNameError: 'Collection name required'
        })
        return;
      } else {
        this.setState({
          collectionNameError: ''
        })
      }
      let body = {
        name: collectionName,
        privacy: 'CUSTOM',
        viewType: 'PRODUCT_LIST'
      };
      Http.POST('addCollection', body)
        .then(({data}) => {
          if (data) {
            this.addToExistingCollection(data.id);
            // this.setState({showAddCollectionPopup: false});
          }
        })
        .catch(({response}) => {
          if(response && response.data && response.data.message){
            toastError(response.data.message);
          }else{
            toastError("Request was unsuccessful.");
          }
        });

    }

    addToExistingCollection = (collectionId) => {
      let body = {
        id: collectionId,
        productIds: this.props.selectedProductIds
      };
      Http.POST('addProductToCollection', body)
        .then(({data}) => {
          if (data) {
            this.props._storeData('selectedProductIds', []);
            this.updateProductCard();
            this.setState({showAddCollectionPopup: false});
            toastSuccess(data.message);
          }
        })
        .catch(({response}) => {
          if(response && response.data && response.data.message){
            toastError(response.data.message);
          }else{
            toastError("Request was unsuccessful.");
          }
        });
    }


    render() {
      let {
        name, collection, productList, showAddMemberModal, showAddProductModal, myDesignList, usersByTypeList, searchUserText, searchUserSuggestions,
        collectionList, collectionName, collectionNameError, showAddCollectionPopup, showCollectionAddOption,
        collectionType, collectionViewType
       } = this.state;

       return (
          <>
              <div class="explore-design">
                  <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-5  buyer-add-customer">
                      <div class="">
                          <h4 class="font-26 semibold mb-4 mb-sm-0">{collection.name}</h4>
                      </div>
                      {
                        !collectionType && !collectionViewType && collection.privacy !== 'PUBLIC' ?
                        <div class="add-buyer d-flex flex-column flex-sm-row align-items-center">
                            <div class="added-members" ref={(node) => this.AddNewMemberModal = node}>
                                <div id="AddNewMember" class={`add-new-member ${showAddMemberModal ? `show` : ``}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" onClick={() => this.setState({showAddMemberModal: !showAddMemberModal})}>
                                        <g id="Group_22785" data-name="Group 22785" transform="translate(-1471 -119)">
                                            <circle id="Ellipse_122" data-name="Ellipse 122" cx="18.5" cy="18.5" r="18.5" transform="translate(1472 120)" fill="#ebe8e8" stroke="#fff" stroke-width="2"/>
                                            <text id="_" data-name="+" transform="translate(1484 148)" fill="#21242b" font-size="24" font-family="OpenSans-Semibold, Open Sans" font-weight="600"><tspan x="0" y="0">+</tspan></text>
                                        </g>
                                    </svg>
                                </div>

                                <div class={`add-people-popup shadow ${showAddMemberModal ? `show` : ``}`}>
                                    <div class="close-add-people mb-3 d-block d-sm-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20.941" height="20.941" viewBox="0 0 20.941 20.941">
                                            <g id="Group_22803" data-name="Group 22803" transform="translate(2489.29 -478.941)">
                                                <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-2487.875 480.355) rotate(45)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                                                <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-2469.763 480.355) rotate(135)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                                            </g>
                                        </svg>
                                    </div>

                                   <div class="form-group position-relative">
                                       <label class="title">Add people</label>
                                       <input type="text" placeholder="demo@gamil.com" name="searchUserText" value={searchUserText} onChange={this.onChange}/>
                                       <div class="people-suggestions">
                                       {
                                         searchUserSuggestions.map((user, i) => {
                                           return (
                                             <div class="item d-flex" key={i} onClick={async() => {
                                               await this.addUserToCollection(user.id);
                                               this.setState({searchUserText: '', searchUserSuggestions: []})
                                             }}>
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                     <g id="Group_22796" data-name="Group 22796" transform="translate(-18733 -6319)">
                                                         <circle id="Ellipse_171" data-name="Ellipse 171" cx="12" cy="12" r="12" transform="translate(18733 6319)" fill="#fff"/>
                                                         <path id="Icon_awesome-user" data-name="Icon awesome-user" d="M6.186,7.07A3.535,3.535,0,1,0,2.651,3.535,3.535,3.535,0,0,0,6.186,7.07Zm2.475.884H8.2a4.808,4.808,0,0,1-4.027,0H3.712A3.713,3.713,0,0,0,0,11.666v1.149A1.326,1.326,0,0,0,1.326,14.14h9.721a1.326,1.326,0,0,0,1.326-1.326V11.666A3.713,3.713,0,0,0,8.661,7.954Z" transform="translate(18739 6323.8)" fill="#aeaeae"/>
                                                     </g>
                                                 </svg>
                                                 {user.email}
                                             </div>
                                           )
                                         })
                                       }
                                       </div>
                                   </div>
                                   {
                                     this.formatUserTypeList()
                                   }
                                </div>
                                {
                                  collection && collection.userResponseList ?
                                  collection.userResponseList.map((user, i) => {
                                    if (user.profilePicDocument && user.profilePicDocument.docUrl) {
                                      return(
                                        <img src={user.profilePicDocument.docUrl} alt=""/>
                                      )
                                    }
                                    return(
                                      <img src={require('../../assets/images/pro_pic_default.svg')} alt=""/>
                                    )
                                  }) : <></>
                                }

                            </div>
                            <div class="d-flex mt-4 mt-sm-0">
                            {
                              collection.privacy === 'ONLY_ME' ?
                              <button id="CreateCollection" class="m-0 btn-brand" onClick={() => this.setState({showAddProductModal: !showAddProductModal})}>+Add more products</button>
                              : <></>
                            }

                                {/*<div class="option">
                                    <div class="dropdown">
                                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
                                                <g id="Group_10" data-name="Group 10" transform="translate(1243 -4045)">
                                                    <path id="Path_27893" data-name="Path 27893" d="M22.5,19.5a3,3,0,1,1-3-3A3,3,0,0,1,22.5,19.5Z" transform="translate(-1259.5 4039)" fill="#21242b"></path>
                                                    <path id="Path_27894" data-name="Path 27894" d="M22.5,9a3,3,0,1,1-3-3A3,3,0,0,1,22.5,9Z" transform="translate(-1259.5 4039)" fill="#21242b"></path>
                                                    <path id="Path_27895" data-name="Path 27895" d="M22.5,30a3,3,0,1,1-3-3A3,3,0,0,1,22.5,30Z" transform="translate(-1259.5 4039)" fill="#21242b"></path>
                                                </g>
                                            </svg>
                                            <ul class="dropdown-menu dropdown-menu-right shadow-lg" role="menu" aria-labelledby="menu1" x-placement="bottom-end" style={{position: 'absolute', transform: 'translate3d(-102px, 51px, 0px)', top: 0, left: 0, willChange: 'transform'}}>
                                                <li role="presentation" class="px-4 pb-3 pt-3"><a role="menuitem" tabindex="-1" href="#" class="font-weight-normal  text-black">Get Quotes</a></li>
                                                <li role="presentation" class="px-4 pb-3"><a role="menuitem" tabindex="-1" href="#" class="font-weight-normal  text-black">Delete</a></li>
                                            </ul>
                                        </button>
                                    </div>
                                </div>*/}
                            </div>

                        </div> : <></>
                      }
                  </div>

                  <div class="add-more-designs">
                      <div class={`add-more ml-auto custom-scrollbar ${showAddProductModal ? `open`:``}`} id="myProductList" onScroll={this.handleMyProductScroll}>
                          <div id="closeRPop" class="p-3 cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20.941" height="20.941" viewBox="0 0 20.941 20.941" onClick={() => this.setState({showAddProductModal: !showAddProductModal})}>
                                  <g id="Group_11190" data-name="Group 11190" transform="translate(1110.29 4909.059)">
                                      <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"></line>
                                      <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"></line>
                                  </g>
                              </svg>
                          </div>
                          <div class="header d-flex justify-content-between align-items-center">
                              <h4 className="semibold">Add more designs to quote</h4>
                              <div>
                                  <div class="cursor-pointer d-inline-block mr-2 mr-sm-4">
                                      <svg onClick={() => this.myProducts(0)} xmlns="http://www.w3.org/2000/svg" width="24.877" height="27.209" viewBox="0 0 24.877 27.209">
                                          <g id="reload" transform="translate(-20.982 0)">
                                              <g id="Group_11184" data-name="Group 11184" transform="translate(20.982 0)">
                                                  <path id="Path_27871" data-name="Path 27871" d="M26.048,5.4a10.847,10.847,0,0,1,14.1-.372l-3.228.122a.75.75,0,0,0,.028,1.5h.028l4.956-.183a.749.749,0,0,0,.722-.75V5.623h0l-.183-4.9a.751.751,0,0,0-1.5.056l.117,3.073a12.337,12.337,0,0,0-16.046.433,12.341,12.341,0,0,0-3.712,12.062.747.747,0,0,0,.728.572.65.65,0,0,0,.178-.022.751.751,0,0,0,.55-.906A10.84,10.84,0,0,1,26.048,5.4Z" transform="translate(-20.982 0)" fill="#41487c"></path>
                                                  <path id="Path_27872" data-name="Path 27872" d="M98.7,185.786a.749.749,0,1,0-1.456.356,10.839,10.839,0,0,1-17.452,10.9l3.267-.294a.751.751,0,0,0-.139-1.495l-4.939.444a.749.749,0,0,0-.678.817l.444,4.939a.749.749,0,0,0,.745.683.27.27,0,0,0,.067-.006.749.749,0,0,0,.678-.817l-.267-3.006a12.254,12.254,0,0,0,7.129,2.717c.211.011.422.017.628.017A12.339,12.339,0,0,0,98.7,185.786Z" transform="translate(-74.167 -174.923)" fill="#41487c"></path>
                                              </g>
                                          </g>
                                      </svg>
                                  </div>
                                  <div class="cursor-pointer d-inline-block">
                                      <svg onClick={() => window.open('/designs/add')} xmlns="http://www.w3.org/2000/svg" width="27.615" height="27.615" viewBox="0 0 27.615 27.615">
                                          <g id="Group_11190" data-name="Group 11190" transform="translate(-2672.328 4255.322) rotate(45)">
                                              <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"></line>
                                              <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"></line>
                                          </g>
                                      </svg>
                                  </div>
                              </div>
                          </div>

                          <div class="added-item">
                          {
                            myDesignList.map((product, i) => {
                              return(
                                <ModalMyProductCard key={i} product={product} buttonAction={this.addToCollection} buttonTitle="Add to collection" />
                              )
                            })
                          }
                          </div>
                      </div>
                  </div>

                  {
                    this.props.selectedProductIds.length ?
                    <div className="selected-item-popup d-flex justify-content-between">
                        <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                            <h4 className="mr-0 mr-sm-5 font-24 font-weight-bold mb-0">Selected ({this.props.selectedProductIds.length})</h4>
                            <button className="m-0 btn-brand brand-bg-color shadow" onClick={() => this.addToQuote(this.props.selectedProductIds)}>Add to quote</button>
                            <div style={{width: 20}}></div>
                            <button className="m-0 btn-brand brand-bg-color shadow" onClick={() => this.setState({showAddCollectionPopup: true})}>Add to collection</button>
                        </div>
                        <div className="close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.436" height="16.436" viewBox="0 0 16.436 16.436" onClick={async() => {
                              await this.props._storeData('selectedProductIds', []);
                              this.updateProductCard();
                            }}>
                                <path id="close_3_" data-name="close (3)" d="M15.218,14.056l6.815-6.815A.822.822,0,0,1,23.2,8.4L16.38,15.218,23.2,22.033A.822.822,0,0,1,22.033,23.2L15.218,16.38,8.4,23.2a.822.822,0,0,1-1.162-1.162l6.815-6.815L7.241,8.4A.822.822,0,0,1,8.4,7.241Z" transform="translate(-7 -7)"/>
                            </svg>
                        </div>
                    </div> : <></>
                  }

                  {
                    showAddCollectionPopup ?
                    <div class="create-new-collection">
                        <div class="pop-container" ref={this.setWrapperRef}>
                            <span class="create-newbutton cursor-pointer" onClick={() => this.setState({showCollectionAddOption: !showCollectionAddOption})}>+ Create new collection</span>
                            {
                              showCollectionAddOption ?
                              <>
                                <div class="create-new d-flex">
                                    <input type="text" placeholder="Type your collection name" class="bg-gray-light border-0" name="collectionName" value={collectionName} onChange={this.onChangeText}/>
                                    <button class="btn-brand m-0 brand-bg-color" onClick={this.createNewCollection}>Create</button>
                                </div>
                                {
                                  collectionNameError ? <p className="error">{collectionNameError}</p> : <></>
                                }
                              </> : <></>
                            }

                            {
                              collectionList.length ?
                              <div class="all-collection">
                                  <span>All collection</span>
                                  <ul class="p-0 m-0 existing-item">
                                  {
                                    collectionList.map((collection, i) => {
                                      return(
                                        <li key={i}>
                                            <span>{collection.name}</span>
                                            <button class="btn-brand m-0 brand-bg-color" onClick={() => this.addToExistingCollection(collection.id)}>Add</button>
                                        </li>
                                      )
                                    })
                                  }
                                  </ul>
                              </div> : <></>
                            }

                        </div>
                    </div> : <></>
                  }

                  <div class="designs">
                      <div class="all-select d-flex align-items-center mb-3">
                          <div class="flex-grow-1 d-flex align-items-center">
                              <div class="all-checkbox bg-gray-light p-3">
                                  <div class="custom-chekbox">
                                      <div class="form-group m-0">
                                          <input type="checkbox" id="All" name="allCheckBox" onChange={this.onChange}/>
                                          <label for="All" class="m-0"><span class="align-middle">All</span></label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="show-products">
                      {
                        productList.map((product, i) => {
                          return (
                            <ProductCardWithTick
                              key={i}
                              product={product}
                              updateProductCard={() => this.updateProductCard()}
                              addToQuote={this.addToQuote}
                              likeProduct={this.likeProduct}
                              unlikeProduct={this.unlikeProduct}/>
                          )
                        })
                      }
                      </div>
                  </div>


              </div>
          </>
        );
    }
}

const mapStateToProps = store => {
	return {
    selectedProductIds: store.product.selectedProductIds
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



export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
