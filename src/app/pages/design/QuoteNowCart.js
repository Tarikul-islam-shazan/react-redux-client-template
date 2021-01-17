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
import {QuoteNowProduct} from './components/QuoteNowProduct';
import {QuoteNowMyProductCard} from './components/QuoteNowMyProductCard';


import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT, LOCAL_QUOTE_NOW_KEY } from '../../constant';
import { _getKey, formatProductTypeWithGroup } from '../../services/Util';
import {_storeData} from './actions';

class QuoteNowCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          designList : [],
          page : 0,
          size : 20,
          search : '',
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
          cart: [],
          title: ''
        };
    }

    handleScroll = async() => {
      const wrappedElement = document.getElementById('sidebarCollapse');
      if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
        console.log('bottom reached');
        let { hasNext, page, loading, designList, size } = this.state;
        console.log("message", 'bottom reached', hasNext, page, loading)
        if (hasNext && !loading && designList.length) {
          let data = await this.renderList(page+1)
          if(data.length>0){
            await this.setState({
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
        } else {
          if (!hasNext) {
            // toastWarning("No more rfq's found.")
          }
        }

      }
    }

    componentDidMount = async() => {
      // document.title = "Explore designs - Nitex - The easiest clothing manufacturing software";
      // window.addEventListener("scroll", this.handleScroll);
      let quote = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);

      if (quote) {
        quote = JSON.parse(quote);
        if (quote && quote.products) {
          this.setState({
            cart: quote.products,
          })
        }
        if (quote && quote.title) {
          this.setState({
            title: quote.title,
          })
        }
        if (quote) {
          this.props._storeData('quoteObj', quote);
        }
      }
      // this.setState({loading: true});
      let designList = await this.renderList();
      this.setState({designList})
    }

    renderList = async(page = 0) => {
      this.setState({loading:true, searching: true})
      let { size, designList, search, sort, productTypeId, filters } = this.state;
      let params = `?page=${page}&size=${size}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;
      let result = [];
      await Http.GET('getProductList', params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading: false});
          if(data && data.length>0){
            result = data;
          }
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
        return result;
    }

    onChange = async(e) => {
      await this.setState({
        [e.target.name]: e.target.value
      })
      await this.updateCartGlobally();
    }

    onChangeQuantity = async(index, name, value) => {
      let {cart} = this.state;
      cart[index].sizeQuantityPairList = cart[index].sizeQuantityPairList.map((pair) => {
          if (pair.code === name) {
            pair.quantity = value;
          }
          return pair;
      })
      await this.setState({cart});
      await this.updateCartGlobally();
    }

    removeFromCart = async(index) => {
      let {cart} = this.state;
      cart = cart.filter((product, i) => i !== index);
      await this.setState({cart});
      await this.updateCartGlobally();
    }

    updateCartGlobally = async() => {
      let {title, cart} = this.state;
      cart = cart.map((product) => {product.error = ''; return product;});
      let quote = {
        title,
        products: cart
      }
      await this.props._storeData('quoteObj', quote);
      localStorage.setItem(LOCAL_QUOTE_NOW_KEY, JSON.stringify(quote));
    }

    validate = () => {
      let {cart, title} = this.state;
      let flag = true;
      cart = cart.map((product, i) => {
        let tempFlag = true;
        product.sizeQuantityPairList.map((pair) => {
          if (!pair.quantity) {
            flag = false;
            tempFlag = false;
            product.error = 'Please insert all values'
          }
        })
        if (tempFlag) {
          product.error = ''
        }
        return product;
      })
      this.setState({cart});
      return flag;
    }

    submit = async() => {
        let {title, cart} = this.state;
        await this.setState({loading: true});
        if (this.validate()) {
          let body = {
            name: title,
            rfqRequestDTOList: cart.map((product) => {
              let total = 0;
              product.sizeQuantityPairList.map((pair) => {
                if (pair.quantity) {
                  total += parseInt(pair.quantity);
                }
              })
              return (
                {
                  id: product.id,
                  total,
                  sizeQuantityPairList: product.sizeQuantityPairList
                }
              )
            })
          }
          await Http.POST('addRfq',body)
            .then(({data}) => {
              console.log('addRfq SUCCESS: ', JSON.stringify(data));
              this.setState({loading: false})
              if(data.success){
                localStorage.setItem(LOCAL_QUOTE_NOW_KEY, '')
                toastSuccess(data.message);
                this.props.history.push('/my-rfqs');
              }else{
                toastError(data.message);
              }

            })
            .catch(response => {
                console.log('LOGIN Error: ', JSON.stringify(response));
                this.setState({loading:false})
                toastError("Something went wrong! Please try again.");
            });
        }
    }

    render() {
        let { designList, cart, title } = this.state;
        return (
          <div className="add-quote d-flex">
              <div className="confirm-quote-request">
                  <div className="header-title d-flex justify-content-between align-items-center">
                      <a href="#">
                          <h3 className="text-black">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13.903" height="25.806" viewBox="0 0 13.903 25.806" className="mr-4" onClick={() => this.props.history.goBack()}>
                                  <path id="Path_27864" data-name="Path 27864" d="M3768.991,1419.1l-11.489-11.489,11.489-11.489" transform="translate(-3756.502 -1394.708)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              </svg>
                              Confirm quote request
                          </h3>
                      </a>
                      <div className="add-more-design font-14 brand-color text-underline d-block d-xl-none cursor-pointer">Add more designs</div>
                  </div>
                  <div className="mt-3">
                      <input type="text" placeholder="Demo Collection name" name="title" value={title} onChange={this.onChange} className="w-100 bg-gray-light"/>
                  </div>
                  <div className="quote-req-list-container mt-3">
                  {
                    cart.map((product, i) => {
                      return(
                        <QuoteNowProduct i={i} product={product} index={i} onChange={this.onChangeQuantity} remove={this.removeFromCart} />
                      )
                    })
                  }
                      <button className="m-0 btn-brand  shadow float-right" onClick={this.submit}>Submit to quote</button>
                  </div>
              </div>


              <div className="add-more ml-auto custom-scrollbar" id="sidebarCollapse" onScroll={this.handleScroll}>
                  <div id="closeRPop" className="p-3 cursor-pointer d-inline-block d-xl-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20.941" height="20.941" viewBox="0 0 20.941 20.941">
                          <g id="Group_11190" data-name="Group 11190" transform="translate(1110.29 4909.059)">
                              <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                              <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                          </g>
                      </svg>
                  </div>
                  <div className="header d-flex justify-content-between align-items-center">
                      <h4>Add more designs to quote</h4>
                      <div>
                          <div className="cursor-pointer d-inline-block mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24.877" height="27.209" viewBox="0 0 24.877 27.209">
                                  <g id="reload" transform="translate(-20.982 0)">
                                      <g id="Group_11184" data-name="Group 11184" transform="translate(20.982 0)">
                                          <path id="Path_27871" data-name="Path 27871" d="M26.048,5.4a10.847,10.847,0,0,1,14.1-.372l-3.228.122a.75.75,0,0,0,.028,1.5h.028l4.956-.183a.749.749,0,0,0,.722-.75V5.623h0l-.183-4.9a.751.751,0,0,0-1.5.056l.117,3.073a12.337,12.337,0,0,0-16.046.433,12.341,12.341,0,0,0-3.712,12.062.747.747,0,0,0,.728.572.65.65,0,0,0,.178-.022.751.751,0,0,0,.55-.906A10.84,10.84,0,0,1,26.048,5.4Z" transform="translate(-20.982 0)" fill="#41487c"/>
                                          <path id="Path_27872" data-name="Path 27872" d="M98.7,185.786a.749.749,0,1,0-1.456.356,10.839,10.839,0,0,1-17.452,10.9l3.267-.294a.751.751,0,0,0-.139-1.495l-4.939.444a.749.749,0,0,0-.678.817l.444,4.939a.749.749,0,0,0,.745.683.27.27,0,0,0,.067-.006.749.749,0,0,0,.678-.817l-.267-3.006a12.254,12.254,0,0,0,7.129,2.717c.211.011.422.017.628.017A12.339,12.339,0,0,0,98.7,185.786Z" transform="translate(-74.167 -174.923)" fill="#41487c"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="cursor-pointer d-inline-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="27.615" height="27.615" viewBox="0 0 27.615 27.615">
                                  <g id="Group_11190" data-name="Group 11190" transform="translate(-2672.328 4255.322) rotate(45)">
                                      <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"/>
                                      <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"/>
                                  </g>
                              </svg>
                          </div>
                      </div>
                  </div>

                  <div className="added-item">
                  {
                    designList.map((product, i) => {
                      return(
                        <QuoteNowMyProductCard key={i} product={product} />
                      )
                    })
                  }
                  </div>
              </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(QuoteNowCart);
