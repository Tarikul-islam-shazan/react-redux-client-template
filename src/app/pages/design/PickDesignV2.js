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
import ProductCardWithTick from '../../commonComponents/ProductCardWithTick';
import {ProductSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { _getKey, formatProductTypeWithGroup } from '../../services/Util';
import {_storeData} from './actions';

const isSelected = (filters, type, id) => {
  let flag = false;
  filters.map((filter) => {
    if (filter.type === type && filter.id === id) {
      flag = true;
    }
  })
  return flag;
}

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
          landingData: [],
          showFilters: false,
          filterOptions: {},
          filters: [],
          suggestions: [],
          searching: false,
          initialLoading: false,
          showSuggestions: false
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
            await this.setState({
              designList : [ ...designList, ...data ],
              page : page+1,
              hasNext : data.length === size ? true : false,
              loading:false
            })
            this.updateProductCard()
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

    handleClickOutside = (event) => {
      if ((this.searchSuggestions && !this.searchSuggestions.contains(event.target)) || (this.searchFilters && !this.searchFilters.contains(event.target))) {
        this.setState({
          showSuggestions: false,
          showFilters: false
        })
      }
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount = async() => {
      document.title = "Explore designs - Nitex - The easiest clothing manufacturing software";
      document.addEventListener('mousedown', this.handleClickOutside);
      window.addEventListener("scroll", this.handleScroll);
      this.setState({loading: true});
      this.initialDataFetch();
      this.setFilterOptions();
      this.fetchSuggestions();
    }

    initialDataFetch = async() => {
      await this.setState({initialLoading: true});
      await Http.GET('getExploreDesignLanding')
        .then(({data}) => {
              let result = data.collections.map((collection) => {
                  if (collection.collectionViewType === 'PRODUCT_LIST') {
                      collection.productResponseList = collection.productResponseList.map((product) => {
                        product.isSelected = false;
                        return product;
                      })
                  }
                  return collection;
              })
              this.setState({landingData: result})
        })
        .catch(({response}) => {
        });
        await this.setState({initialLoading: false});

    }

    setFilterOptions = async() => {
      Http.GET('getExploreDesignFilterOptions')
        .then(({data}) => {
          let response = {...data};
          response.productTypeResponseList = formatProductTypeWithGroup(response.productTypeResponseList);
          this.setState({filterOptions: response});
        })
        .catch(({response}) => {
        });
    }

    fetchSuggestions = () => {
      let {search, suggestions} = this.state;
      Http.GET('getSearchSuggestions', `${search ? `/${search}` : ``}`)
        .then(({data}) => {
          if (data.length) {
            this.setState({suggestions: data});
          }
        })
        .catch(({response}) => {
        });
    }

    setFilters = async(type, id, name) => {
      let {filters} = this.state;
      let flag = true;
      filters.map((filter) => {
        if (filter.type === type && filter.id === id) {
          flag = false;
        }
      })
      if (flag) {
        filters.push({type, id, name});
      } else {
        filters = filters.filter((filter) => !(filter.type === type && filter.id === id));
      }
      await this.setState({filters});
      if (!flag) {
        this._search()
      }
    }

    renderList = async(page = 0) => {
      this.setState({loading:true, searching: true})
      let { size, designList, search, sort, productTypeId, filters } = this.state;
      let params = `?page=${page}&size=${size}&searchText=${search}`;
      filters.map((filter) => {
        let key = '';
        if (filter.type === 'CATEGORY') {
          key = 'category';
        } else if (filter.type === 'PRODUCT_TYPE') {
          key = 'productType';
        } else if (filter.type === 'COLOR') {
          key = 'color';
        } else if (filter.type === 'FABRIC_TYPE') {
          key = 'fabricType';
        }
        params += `&${key}=${filter.id}`
      });
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
      this.setState({
        [e.target.name] : e.target.value,
        page : 0,
        hasNext : true,
        productTypeId : '',
        // size : 100
      },async(name)=>{
        this.fetchSuggestions();
      })
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
      await this.setState({
        page : 0,
        hasNext : true,
        productTypeId : '',
        showFilters: false,
        showSuggestions: false,
        designList: [],
        loading: true
      })
      let designList = await this.renderList();
      await this.setState({
        designList,
        hasNext : designList.length === this.state.size ? true : false,
        loading: false
      })
      this.updateProductCard()
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
            let { designList, landingData } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                return item;
              }
              return item;
            })

            let result = landingData.map((collection) => {
                if (collection.collectionViewType === 'PRODUCT_LIST') {
                    collection.productResponseList = collection.productResponseList.map((product) => {
                      if (product.id === id) {
                        product.liked = true;
                      }
                      return product;
                    })
                }
                return collection;
            })

            this.setState({
              designList,
              landingData: result
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
            let { designList, landingData } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })

            let result = landingData.map((collection) => {
                if (collection.collectionViewType === 'PRODUCT_LIST') {
                    collection.productResponseList = collection.productResponseList.map((product) => {
                      if (product.id === id) {
                        product.liked = false;
                      }
                      return product;
                    })
                }
                return collection;
            })

            this.setState({
              designList,
              landingData: result
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

    updateProductCard = () => {
      let {selectedProductIds} = this.props;
      let {landingData, designList} = this.state;
      landingData = landingData.map((collection) => {
          if (collection.productResponseList) {
            collection.productResponseList = collection.productResponseList.map((product) => {
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
          }
          return collection;
      })
      designList = designList.map((product) => {
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
      this.setState({landingData, designList});
    }

    render() {
        let { designList, groupwiseProductList, search, productTypeId, sort, showFilters, landingData, filterOptions, filters, searching, showSuggestions, suggestions } = this.state;
        return (

          <div className="explore-design">
              <div className="filter-container explore-design-filter">
                  <div className="cat-menu d-none d-xl-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18" onClick={() => this.setState({showFilters: !showFilters})}>
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
                      <input type="search" onFocus={() => this.setState({showSuggestions: true})} placeholder="Product name, collection name" name="search" className="w-100" value={search} onChange={this.onChange} onKeyPress={this.keyPressed}/>
                        {
                          showSuggestions &&
                          <div className="search-suggestions" ref={(node) => this.searchSuggestions = node}>
                            <ul>
                            {
                              suggestions.map((suggestion, i) => {
                                return(
                                  <li key={i}>
                                      {suggestion.title}
                                  </li>
                                )
                              })
                            }
                            </ul>
                          </div>
                      }
                      <ul className="filter-tag">
                      {
                        filters.map((filter, i) => {
                          return (
                            <li className="active" key={i}>
                                <a>{filter.name}</a>
                                <div className="close-tag" onClick={() => this.setFilters(filter.type, filter.id, filter.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888" viewBox="0 0 10.888 10.888">
                                        <g id="Group_10684" data-name="Group 10684" transform="translate(50.699 -260.002) rotate(45)">
                                            <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4" transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff" stroke-width="1"/>
                                            <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4" transform="translate(162.898 219.699) rotate(90)" fill="none" stroke="#fff" stroke-width="1"/>
                                        </g>
                                    </svg>
                                </div>
                            </li>
                          )
                        })
                      }
                      </ul>
                  </div>
                  <div className="filter-cat" style={{display: showFilters ? 'flex' : 'none'}} ref={(node) => this.searchFilters = node}>
                      <div className="d-flex">
                      <ul className="list custom-scrollbar">
                          <div className="title">Categories</div>
                          {
                            filterOptions.categories &&
                            filterOptions.categories.map((item, i) => {
                              return <li key={i} onClick={() => this.setFilters('CATEGORY', item.id, item.name)}>{item.name}</li>
                            })
                          }
                      </ul>

                      {
                        filterOptions.productTypeResponseList &&
                        filterOptions.productTypeResponseList.map((group) => {
                          return (
                            <ul className="list custom-scrollbar">
                              <div className="title">{group.groupName}</div>
                              {
                                group.types.map((type, j) => {
                                  return (
                                    <li style={{color: (isSelected(filters, 'PRODUCT_TYPE', type.id) ? 'rgb(238 118 31)' : 'black')}} key={j} onClick={() => this.setFilters('PRODUCT_TYPE', type.id, type.name)}>{type.name}</li>
                                  )
                                })
                              }
                            </ul>
                          )
                        })
                      }
                      <ul className="list custom-scrollbar">
                          <div className="title">Color</div>
                          {
                            filterOptions.colorResponseList &&
                            filterOptions.colorResponseList.map((item, i) => {
                              return <li style={{color: (isSelected(filters, 'COLOR', item.id) ? 'rgb(238 118 31)' : 'black')}} key={i} onClick={() => this.setFilters('COLOR', item.id, item.name)}>{item.name}</li>
                            })
                          }
                      </ul>
                      <ul className="list custom-scrollbar">
                          <div className="title">Fabrications</div>
                          {
                            filterOptions.fabricTypeResponseList &&
                            filterOptions.fabricTypeResponseList.map((item, i) => {
                              return <li style={{color: (isSelected(filters, 'FABRIC_TYPE', item.id) ? 'rgb(238 118 31)' : 'black')}} key={i} onClick={() => this.setFilters('FABRIC_TYPE', item.id, item.name)}>{item.name}</li>
                            })
                          }
                      </ul>
                      </div>
                      <button className="m-0 btn-brand m-0 shadow float-right" onClick={() => this._search()}>Submit</button>
                  </div>
              </div>
              {
                searching ?
                <div className="filter-products designs">
                    <div className="show-products">
                    {
                      designList.map(( product , i ) => {
                        return(
                           <ProductCardWithTick
                             key={i}
                             product={product}
                             updateProductCard={() => this.updateProductCard()}
                             likeProduct={this.likeProduct}
                             unlikeProduct={this.unlikeProduct}/>
                        )
                      })
                    }
                    {
                      this.state.loading &&
                      <CreateSkeletons iterations={12}><ProductSkeleton/></CreateSkeletons>
                    }
                    </div>
                </div> :
                <>
                  {
                    landingData.map((data, i) => {
                      if (data.collectionViewType === 'PRODUCT_LIST') {
                        return (
                          <div className="designs" key={i}>
                              <h4 className="mb-4 font-weight-normal">{data.name} <a href="#"><span className="view-all">VIEW ALL</span></a></h4>
                              <Carousel itemsToShow={4} pagination={false}>
                              {
                                data.productResponseList ? data.productResponseList.map((product, j) => {
                                  return (
                                    <ProductCardWithTick
                                      key={j}
                                      product={product}
                                      updateProductCard={() => this.updateProductCard()}
                                      likeProduct={this.likeProduct}
                                      unlikeProduct={this.unlikeProduct}/>)
                                }) : <></>
                              }
                              </Carousel>
                          </div>
                        )
                      } else if (data.collectionViewType === 'BANNER') {
                        return (
                          <div className="banner-section mb-4 overflow-hidden">
                              <div className="row">
                              {
                                data.collections ? data.collections.map((banner, j) => {
                                  if (banner.banners && banner.banners.length) {
                                    return (
                                      <div className="col-md-6">
                                          <a href="#"><img src={banner.banners[0].docUrl} alt="" className="w-100"/></a>
                                      </div>
                                    )
                                  } else {
                                    return <></>
                                  }

                                }) : <></>
                              }
                              </div>
                          </div>
                        )
                      }

                    })
                  }
                  {
                    this.state.initialLoading &&
                    <CreateSkeletons iterations={12}><ProductSkeleton/></CreateSkeletons>
                  }
                </>
              }
              {
                this.props.selectedProductIds.length ?
                <div className="selected-item-popup d-flex justify-content-between">
                    <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                        <h4 className="mr-0 mr-sm-5 font-24 font-weight-bold mb-0">Selected ({this.props.selectedProductIds.length})</h4>
                        <button className="m-0 btn-brand brand-bg-color shadow">Add to quote</button>
                    </div>
                    <div className="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.436" height="16.436" viewBox="0 0 16.436 16.436">
                            <path id="close_3_" data-name="close (3)" d="M15.218,14.056l6.815-6.815A.822.822,0,0,1,23.2,8.4L16.38,15.218,23.2,22.033A.822.822,0,0,1,22.033,23.2L15.218,16.38,8.4,23.2a.822.822,0,0,1-1.162-1.162l6.815-6.815L7.241,8.4A.822.822,0,0,1,8.4,7.241Z" transform="translate(-7 -7)"/>
                        </svg>
                    </div>
                </div> : <></>
              }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PickDesignV2);
