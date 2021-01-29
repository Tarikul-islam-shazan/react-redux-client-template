import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import { _storeData } from "../design/actions";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { rfqStatus, rfqProductStatus, convertTimeToLocal } from '../../services/Util';

import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { RfqCard } from './components/RfqCard';
import {RfqSkeleton, RfqProductSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';
import { addImageSuffix } from '../../services/Util';
import {QuotedItem} from './components/QuotedItem';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { event } from 'jquery';

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
      sort: 'lastResponseTime,desc',
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
      totalSelectedItems: 0
    };
  }

  componentDidMount = async () => {

    document.title = "My quote requests with Nitex - The easiest clothing manufacturing software";
    let name = 'rfqId';
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(this.props.location.search);

    console.log('results',results)
    await this.setState({
      filterById: results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')),
      productLoading: true
    })

    this.renderList(0);
    const userInfo = await localStorage.getItem('userInfo');
    console.log("userInfo", JSON.parse(userInfo))
    this.setState({
      userInfo: JSON.parse(userInfo)
    })

  }

  onScrollToEnd = () => {
    const wrappedElement = document.getElementById('sidebarCollapse');
    if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
      console.log('bottom reached');
      let { hasNext, page } = this.state;
      let { loading } = this.state;
      console.log("message", 'bottom reached', hasNext, page, loading)
      if (hasNext && !loading) {
        // toastWarning("No more notification found.")
        this.renderList(page + 1, true)
      } else {
        if (!hasNext) {
          // toastWarning("No more rfq's found.")
        }
      }

    }
  }

  renderList = (page = 0, merge = true) => {
    this.setState({ loading: true })
    let { size, rfqList, search, filterBy, sort, filterById, status, date, collection } = this.state;
    // let params = `?page=${page}&size=${size}`;
    let params = {
      page: page,
      size: size,
      search: search,
      // filterBy : filterBy,
      sort: sort,
      // id: filterById,
      status,
      date
    };
    if (collection && collection.id) {
      params.collectionId = collection.id;
    }


    Http.GET('getRfqListV2', params)
      .then(({ data }) => {
        console.log('rfq LIST SUCCESS: ', data);
        if (data.myQuotesProductResponses.length > 0) {
          if (merge) {
            // console.log("entered hasNext merge",this.state.hasNext,page,data.length)
            this.setState({
              rfqList: [...rfqList, ...data.myQuotesProductResponses],
              page: page,
              hasNext: data.myQuotesProductResponses.length == size ? true : false,
              loading: false,
              total: data.total
            })
          } else {
            // console.log("entered hasNext unmerge")
            this.setState({
              rfqList: data.myQuotesProductResponses,
              page: page,
              hasNext: data.myQuotesProductResponses.length == size ? true : false,
              loading: false,
              total: data.total
            })
          }

        } else {
          // console.log("entered hasNext length 0")
          this.setState({
            hasNext: false,
            loading: false
          })
          if (page == 0) {
            this.setState({
              productLoading: false
            })
          }
          // toastWarning("RFQ List - no data found.");
        }
        loadjs(['/js/script.js', '/js/custom.js']);
      })
      .catch(response => {
        console.log('rfq LIST ERROR: ', JSON.stringify(response));
        this.setState({ loading: false, productLoading: false })
        toastError("Something went wrong! Please try again.");
      });
  }

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })
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
      if (i == e.target.value) {
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
    this.renderList(0);
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

  }

  render() {
    let { rfqList, rfqDetails, showNegotiation, messages, userInfo, message, sort, ids, selectedProductName, filterById, hasNext, allCheck, total, search, status, date, totalSelectedItems } = this.state;
    if (!hasNext && !rfqList.length) {
      return (
        <div className="not-found">
          <h1 className="msg">There is no quote request from you</h1>
          <button className="btn btn-nitex-default" onClick={() => this.props.history.push('/quote-request')}>Start now</button>
          <div className="illustration">
            <img src={require("../../assets/images/not-found.png")} alt="" />
          </div>
        </div>
      )
    }
    return (
      <>
        <div className="header-sorting d-flex justify-content-between">
            <div className="sort-filter d-flex flex-grow-1">
                <div className="product-name mr-3">
                    <input type="text" name="search" value={search} onChange={this.onChange} placeholder="Product name, collection name" className="w-100 bg-gray-light border-0"/>
                </div>
                <div className="date mr-3">
                    <input type="date" placeholder="Date" className="bg-gray-light border-0" name="date" value={date} onChange={this.onChange}/>
                </div>
                <div className="status mr-3">
                    <select className="w-100 bg-gray-light border-0" name="status" value={status} onClick={(e) => this.onChange(e)}>
                        <option>Status </option>
                        <option value="PENDING">Pending</option>
                        <option value="PRICE_GIVEN">Price Given</option>
                        <option value="APPROVED">Approved</option>
                    </select>
                </div>
                <div className="search mr-3">
                      <button className="m-0 btn-brand brand-bg-color shadow border-0" onClick={this._search}>Search</button>
                </div>
            </div>
            <div className="sort">
                <div className="status float-right">
                    <select className="w-100 bg-gray-light border-0">
                        <option>Oldest First</option>
                        <option value="2">2</option>
                        <option value="3" disabled>3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="all-select d-flex align-items-center mt-3">
            <div className="flex-grow-1">
                <div className="all-checkbox bg-gray-light p-3">
                    <div className="custom-chekbox">
                        <div className="form-group m-0">
                            <input type="checkbox" id="All" name="all" value="all" onChange={this.toggleSelect} checked={allCheck}/>
                            <label for="All" className="m-0"><span className="align-middle">All</span></label>
                        </div>
                    </div>
                </div>
            </div>
            <span className="color-333">{total} designs</span>
        </div>


        <div className="confirm-quote-request quotes-list-item w-100 p-0">
            <div className="quote-req-list-container mt-3">
            {
              rfqList.map((quote, i) =>{
                return(
                  <QuotedItem quote={quote} key={i} index={i} toggleSelect={this.toggleSelect} search={this.searchByCollection}/>
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
      </>
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
