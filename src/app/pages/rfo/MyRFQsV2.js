import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';
import Modal from 'react-bootstrap/Modal'

import { _storeData } from "../design/actions";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { rfqStatus, rfqProductStatus, convertTimeToLocal, changeDateFormat, authUser } from '../../services/Util';

import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { RfqCard } from './components/RfqCard';
import {RfqSkeleton, RfqProductSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';
import {QuotedItem} from './components/QuotedItem';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import EmptyState from '../../commonComponents/EmptyState';

class MyRFQs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rfqList: [],
      page: 0,
      size: 10,
      hasNext: true,
      loading: false,
      productLoading: false,
      filterBy: '',
      filterById: '',
      sort: 'dateAdded,desc',
      selectedRfq: 0,
      selectedProduct: 0,
      selectedProductName: '',
      rfqDetails: {},
      showNegotiation: false,
      messages: [],
      message: '',
      userInfo: {},
      ids: [],
      hasNextMessage: true,
      pageMessage: 0,
      rfqs_id:'',
      total: 0,
      allCheck: false,
      search: '',
      status: '',
      date: '',
      collection: null,
      totalSelectedItems: 0,
      orderTitle: '',
      orderFlag: false
    };
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        orderFlag : false
      })
    }
  }

  componentDidMount = async () => {

    document.title = "My quote requests with Nitex - The easiest clothing manufacturing software";
    let name = 'rfqId';
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(this.props.location.search);

    await this.setState({
      filterById: results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')),
      productLoading: true
    })

    this.renderList(0);
    this.setState({
      userInfo: authUser()
    })
    window.addEventListener("scroll", this.onScrollToEnd);
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.onScrollToEnd);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  onScrollToEnd = () => {
      const windowHeight =
          "innerHeight" in window
              ? window.innerHeight
              : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
          let { hasNext, page, loading } = this.state;
          console.log("message", "bottom reached", hasNext, page, loading);
          if (hasNext && !loading) {
              this.renderList(page + 1, true);
          } else {
              if (!hasNext) {
                  // toastWarning("No more data found.")
              }
          }
          // this.setState({
          //     message: 'bottom reached'
          // });
      } else {
      }
  };

  renderList = async (page = 0, merge = false) => {
    this.setState({ loading: true })
    let { size, rfqList, search, filterBy, sort, filterById, status, date, collection } = this.state;
    // let params = `?page=${page}&size=${size}`;
    let params = {
      page,
      size,
      search,
      // filterBy : filterBy,
      sort,
      // id: filterById,
      status,
      date: date
        ? changeDateFormat(date, "YYYY/MM/DD", "DD/MM/YYYY")
        : "",
    };
    if (collection && collection.id) {
      params.collectionId = collection.id;
    }


    await Http.GET('getRfqListV2', params)
      .then(({ data }) => {
        if (data.myQuotesProductResponses.length > 0) {
          if (merge) {
            this.setState({
              rfqList: merge
                  ? [...rfqList, ...data.myQuotesProductResponses]
                  : data.myQuotesProductResponses,
              page: page,
              hasNext:
                  data.myQuotesProductResponses.length == size
                      ? true
                      : false,
              loading: false,
              total: data.total,
          });
          } else {
            this.setState({
              rfqList: data.myQuotesProductResponses,
              page: page,
              hasNext:
                  data.myQuotesProductResponses.length == size
                      ? true
                      : false,
              loading: false,
              total: data.total,
          });
          }

        } else {
          this.setState({
            rfqList: !merge
                ? data.myQuotesProductResponses
                : rfqList,
            hasNext: false,
            loading: false,
        });
        if (page == 0) {
            this.setState({
                productLoading: false,
            });
        }
          // toastWarning("RFQ List - no data found.");
        }
        // loadjs(['/js/script.js', '/js/custom.js']);
      })
      .catch(response => {
        this.setState({ loading: false, productLoading: false })
        toastError("Something went wrong! Please try again.");
      });
  }

  onChange = async (e) => {
    let { name, value } = e.target;
    await this.setState({
      [name]: value
    })
    if (name === "sort") {
      await this.setState({
          sort: value,
      });
      this.renderList();
  }
  }

  keyPressed = async (e) => {
    if (e.key === 'Enter') {
      this.setState({
        loading: true
      })

    }
  }

  toggleSelect = async(e) => {
    let {rfqList, allCheck} = this.state;
    rfqList = rfqList.map((rfq, i) => {
      if (rfq.id == e.target.value) {
        rfq.isSelected = e.target.checked;
      }
      if (e.target.name === 'all') {
        rfq.isSelected = e.target.checked;
      }
      return rfq;
    })
    await this.setState({
      rfqList,
      allCheck: e.target.name === 'all' ? e.target.checked : allCheck
    });
    this.setTotalSelectedItems()
  }

  _search = () => {
    this.renderList(0, false);
  }

  searchByCollection = async(collection) => {
    await this.setState({
      collection
    });
    this._search();
  }

  setTotalSelectedItems = () => {
    let {rfqList} = this.state;
    let totalSelectedItems = 0;
    rfqList.map((quote) => {
      if (quote.isSelected) {
        totalSelectedItems++;
      }
    })
    this.setState({totalSelectedItems});
  }

  removeTotalSelectedItems = () => {
    let e = {
      target: {
        name: 'all',
        value: false
      }
    };
    this.toggleSelect(e);
    this.setState({totalSelectedItems: 0})
  }

  order = () => {
    this.setState({
      orderFlag: true
    })
  }

  createOrder = async() => {
    await this.setState({loading: true});
    let {rfqList, orderTitle} = this.state;
    let productInfoForRfqIds = [];
    rfqList.map((rfq) => {
      if (rfq.isSelected) {
        productInfoForRfqIds.push(rfq.id);
      }
    })
    let body = {
      name: orderTitle,
      productInfoForRfqIds
    }
    await Http.POST('order', body)
      .then(({data}) => {
        this.setState({loading: false})
        if(data.success){
          toastSuccess(data.message);
          this.props.history.push('/orders/confirm-order/' + data.id);
        }else{
          toastError(data.message);
        }

      })
      .catch(response => {
          this.setState({loading:false})
          toastError("Something went wrong! Please try again.");
      });
  }

  render() {
    let { rfqList, rfqDetails, showNegotiation, messages, userInfo, message, sort, ids, selectedProductName, filterById, hasNext, allCheck, total, search, status, date, totalSelectedItems, collection, orderTitle, orderFlag } = this.state;
    if (!hasNext && !rfqList.length) {
      return (
        <div className="mt-5 not-found">
          <EmptyState
            title="Requested quotes not found"
          />
          <Link className="font-18" to='/quotes/list'>Go back</Link>
        </div>
      )
    }
    return (
      <LoadingOverlay
          active={this.state.loading}
          styles={{
              zIndex: 10000,
              overlay: (base) => ({
                  ...base,
                  background: LOADER_OVERLAY_BACKGROUND,
              }),
              spinner: (base) => ({
                  ...base,
                  width: LOADER_WIDTH,
                  position: LOADER_POSITION,
                  top: LOADER_TOP,
                  left: LOADER_LEFT,
                  marginTop: LOADER_MARGIN_TOP,
                  marginLeft: LOADER_MARGIN_LEFT,
                  "& svg circle": {
                      stroke: LOADER_COLOR,
                  },
              }),
              content: (base) => ({
                  ...base,
                  color: LOADER_COLOR,
              }),
          }}
          spinner
          text={LOADER_TEXT}
      >
        <div className="header-sorting d-flex justify-content-between">
            <div className="sort-filter d-flex flex-grow-1">
                <div className="product-name mr-3">
                    <input type="text" name="search" value={search} onChange={this.onChange} placeholder="Product name, collection name" className="w-100 bg-gray-light border-0"/>
                </div>
                <div className="date mr-3">
                    <input type="date" placeholder="Date" className="bg-gray-light border-0" name="date" value={date} onChange={this.onChange}/>
                </div>
                <div className="status mr-3 mt-3 mt-sm-0">
                    <select className="w-100 bg-gray-light border-0" name="status" value={status} onClick={(e) => this.onChange(e)}>
                        <option>Status </option>
                        <option value="OFFER_PENDING">Offer Pending</option>
                        <option value="PRICE_GIVEN">Price Given</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PRODUCT_SOLD">Design Sold</option>
                        <option value="ORDER_PLACED">Order Placed</option>
                    </select>
                </div>
                <div className="search mr-3">
                      <button className="m-0 btn-brand brand-bg-color shadow border-0" onClick={this._search}>Search</button>
                </div>
            </div>
            <div className="sort">
                <div className="status float-right">
                  <select
                      className="w-100 bg-gray-light border-0"
                      name="sort"
                      id="sort"
                      value={sort}
                      onClick={(e) => this.onChange(e)}
                  >
                      <option value="dateAdded,asc">Oldest First</option>
                      <option value="dateAdded,desc">Newest First</option>
                </select>
                </div>
            </div>
        </div>
        <div className="all-select d-flex align-items-center mt-3">
            <div className="flex-grow-1 d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
                <div className="all-checkbox bg-gray-light p-3">
                    <div className="custom-chekbox">
                        <div className="form-group m-0">
                            <input type="checkbox" id="All" name="all" value="all" onChange={this.toggleSelect} checked={allCheck}/>
                            <label for="All" className="m-0"><span className="align-middle">All</span></label>
                        </div>
                    </div>
                </div>
                {
                  collection && collection.id ?
                  <div className="collection-name-heading font-24 ml-0 mt-3  mt-sm-0 ml-sm-4">
                      <ul className="filter-tag m-0 overflow-inherit">
                          <li className="active"><a>{collection.name}</a>
                              <div className="close-tag" onClick={() => this.searchByCollection({})}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.888" height="10.888"
                                       viewBox="0 0 10.888 10.888">
                                      <g id="Group_10684" data-name="Group 10684"
                                         transform="translate(50.699 -260.002) rotate(45)">
                                          <path id="Path_27710" data-name="Path 27710" d="M2135.273,2351v14.4"
                                                transform="translate(-1979.574 -2138.497)" fill="none" stroke="#fff"
                                                stroke-width="1"></path>
                                          <path id="Path_27711" data-name="Path 27711" d="M0,0V14.4"
                                                transform="translate(162.898 219.699) rotate(90)" fill="none"
                                                stroke="#fff" stroke-width="1"></path>
                                      </g>
                                  </svg>
                              </div>
                          </li>
                      </ul>
                  </div> : <></>
                }
            </div>
            <span className="color-333">{total} designs</span>
        </div>


        <div className="confirm-quote-request quotes-list-item w-100 p-0">
            <div className="quote-req-list-container mt-3">
            {
              rfqList.map((quote, i) =>{
                return(
                  <QuotedItem quote={quote} key={i} index={i} toggleSelect={this.toggleSelect} search={this.searchByCollection} authUserInfo={userInfo}/>
                )
              })
            }
            </div>
        </div>
        {
          totalSelectedItems ?
          <div className="selected-item-popup d-flex justify-content-between">
              <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                  <h4 className="mr-0 mr-sm-5 font-24 font-weight-bold mb-0">Selected ({totalSelectedItems})</h4>
                  <button className="m-0 btn-brand brand-bg-color shadow" onClick={this.order}>Place your order</button>
              </div>
              <div className="close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.436" height="16.436" viewBox="0 0 16.436 16.436" onClick={this.removeTotalSelectedItems}>
                      <path id="close_3_" data-name="close (3)" d="M15.218,14.056l6.815-6.815A.822.822,0,0,1,23.2,8.4L16.38,15.218,23.2,22.033A.822.822,0,0,1,22.033,23.2L15.218,16.38,8.4,23.2a.822.822,0,0,1-1.162-1.162l6.815-6.815L7.241,8.4A.822.822,0,0,1,8.4,7.241Z" transform="translate(-7 -7)"/>
                  </svg>
              </div>
          </div> : <></>
        }
        {
          orderFlag ?
          <LoadingOverlay
            active={this.state.loading}
            styles={{
              zIndex: 10000,
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
              <div className="create-new-collection">
                <div className="pop-container" ref={this.setWrapperRef}>
                    <span className="create-newbutton cursor-pointer">Create order</span>
                    <div className="create-new d-flex">
                        <input type="text" placeholder="Order title" className="bg-gray-light border-0" value={orderTitle} name="orderTitle" onChange={this.onChange}/>
                        <button className="btn-brand m-0 brand-bg-color" onClick={this.createOrder}>Create</button>
                    </div>
                </div>
              </div>
          </LoadingOverlay> :
          <></>
      }
    </LoadingOverlay>
    );
  }
}

const mapStateToProps = store => {
  return {
    choosenIdsForQuick: store.product.choosenIdsForQuick
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRFQs);
