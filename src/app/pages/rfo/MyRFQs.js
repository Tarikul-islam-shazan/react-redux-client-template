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
      search: '',
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
      rfqs_id:''
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

  onScrollToEndMessages = () => {
    const wrappedElement = document.getElementById('messageList');
    if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
      console.log('bottom reached');
      let { hasNextMessage, pageMessage, selectedProduct } = this.state;
      let { loading } = this.state;
      console.log("message", 'bottom reached', hasNextMessage, pageMessage, loading)
      if (hasNextMessage && !loading) {
        // toastWarning("No more notification found.")
        this.loadMessages(selectedProduct, pageMessage + 1, true)
      } else {
        if (!hasNextMessage) {
          // toastWarning("No more rfq's found.")
        }
      }

    }
  }

  renderList = (page = 0, merge = true) => {
    this.setState({ loading: true })
    let { size, rfqList, search, filterBy, sort, filterById } = this.state;
    // let params = `?page=${page}&size=${size}`;
    let params = {
      page: page,
      size: size,
      search: search,
      // filterBy : filterBy,
      sort: sort,
      id: filterById
    };

    Http.GET('getRfqList', params)
      .then(({ data }) => {
        console.log('rfq LIST SUCCESS: ', data);
        if (data.length > 0) {
          if (page == 0) {
            this.getRfqDetails(data[0].id)
          }
          if (merge) {
            // console.log("entered hasNext merge",this.state.hasNext,page,data.length)
            this.setState({
              rfqList: [...rfqList, ...data],
              page: page,
              hasNext: data.length == size ? true : false,
              loading: false
            })
          } else {
            // console.log("entered hasNext unmerge")
            this.setState({
              rfqList: data,
              page: page,
              hasNext: data.length == size ? true : false,
              loading: false
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

  getRfqDetails = async(id) => {
    await this.setState({
      selectedRfq: id,
      productLoading: true
      // rfqDetails: {}
    });

    this.props._storeData('selectedRfqId', id);

    Http.GET('getRfqDetails', id)
      .then(({ data }) => {
        console.log('rfq DTAILS SUCCESS: ', data);
        this.setState({ productLoading: false, showNegotiation: false })
        if (data.success == false) {
          toastWarning("RFQ Details - no data found.");
        } else {
          this.setState({
            rfqDetails: data
          })
        }
        // loadjs(['/js/script.js','/js/custom.js']);
      })
      .catch(response => {
        console.log('rfq DETAILS ERROR: ', JSON.stringify(response));
        this.setState({ productLoading: false })
        toastError("Something went wrong! Please try again.");
      });
  }

  toggleNegotiation = (id, name = '') => {
    this.setState({
      showNegotiation: !this.state.showNegotiation,
    })
    if (id !== 0) {
      this.setState({
        selectedProduct: id,
        selectedProductName: name
      })
      this.loadMessages(id, 0, false)
    }
  }

  loadMessages = (id, page = 0, merge = true) => {
    this.setState({ loading: true })
    let size = 10;
    let { messages, hasNextMessage, pageMessage } = this.state;
    let params = {
      page,
      size,
      sort: 'datePosted,desc',
    }
    Http.GET_WITH_ID_PARAM('getRfqNegotiationMessages', params, id)
      .then(({ data }) => {
        console.log('getRfqNegotiationMessages SUCCESS: ', data);
        this.setState({ loading: false })
        if (data.length) {
          if (merge) {
            console.log("entered hasNext merge")
            this.setState({
              messages: [...messages, ...data],
              pageMessage: page,
              hasNextMessage: data.length == size ? true : false,
              loading: false
            })
          } else {
            console.log("entered hasNext unmerge")
            this.setState({
              messages: data,
              pageMessage: page,
              hasNextMessage: data.length == size ? true : false,
              loading: false
            })
          }
        } else {
          this.setState({
            messages: merge ? messages : [],
            hasNextMessage: false,
            loading: false
          })
          // toastWarning("Negotiation Messages - no data found.");
        }
        // loadjs(['/js/script.js','/js/custom.js']);
      })
      .catch(response => {
        console.log('rfq DETAILS ERROR: ', JSON.stringify(response));
        this.setState({ loading: false })
        toastError("Something went wrong! Please try again.");
      });
  }

  onChange = async (e, reloadRfqList = false) => {
    await this.setState({
      [e.target.name]: e.target.value
    })
    if (reloadRfqList) {
      this.renderList(0, false);
    }
  }

  keyPressed = async (e) => {
    if (e.key === 'Enter') {
      this.setState({
        loading: true
      })
      let { id, message, selectedRfq, selectedProduct } = this.state;
      await Http.POST('sendRfqNegotiationMessage', { message }, selectedRfq + '/' + selectedProduct)
        .then(({ data }) => {
          console.log('COMMENT POST SUCCESS: ', data);
          if (data.success) {
            this.setState({
              loading: false,
              message: ''
            })
            toastSuccess(data.message);
            this.loadMessages(selectedProduct, 0, false)
          } else {
            this.setState({
              loading: false
            })
            toastError(data.message);
          }
        })
        .catch(({ response }) => {
          console.log('COMMENT ERROR: ', JSON.stringify(response));
          this.setState({ loading: false })
          console.log("response", response)
          if (response && response.data && response.data.message) {
            toastError(response.data.message);
          } else {
            toastError("Something went wrong! Please try again.");
          }
        });
    }
  }

  handleCheckbox = (e) => {
    console.log("check box id",e.target.value)
    console.log(e.target.value, e.target.checked)
    let { ids } = this.state;
    if (e.target.checked) {
      ids.push(e.target.value);
    } else {
      ids = ids.filter((item) => e.target.value != item)
    }
    this.setState({ ids,rfqs_id:e.target.value })
    this.props._storeData('choosenIdsForQuick', ids)
  }

  goToProductDetails = (id) => {
    this.props.history.push('/my-products/' + id);
  }

  approve = async (id) => {
    let { selectedRfq } = this.state;
    this.setState({ loading: true })
    await Http.POST('updateProductStatus', { status: 'APPROVED' }, id)
      .then(({ data }) => {
        console.log('updateProductStatus POST SUCCESS: ', data);
        if (data.success) {
          this.setState({
            loading: false,
            message: ''
          })
          toastSuccess(data.message);
          this.getRfqDetails(selectedRfq)
        } else {
          this.setState({
            loading: false
          })
          toastError(data.message);
        }
      })
      .catch(({ response }) => {
        console.log('COMMENT ERROR: ', JSON.stringify(response));
        this.setState({ loading: false })
        console.log("response", response)
        if (response.data && response.data.message) {
          toastError(response.data.message);
        } else {
          toastError("Something went wrong! Please try again.");
        }
      });
  }

  reload = () => {
    this.props.history.push('/my-rfqs');
  }
  onStart = () => {
    this.props._storeData('fromRfq', true)
    // localStorage.setItem('rfqs_id',this.state.rfqs_id)



  }
  render() {
    let { rfqList, rfqDetails, showNegotiation, messages, userInfo, message, sort, ids, selectedProductName, filterById, hasNext } = this.state;
    console.log("searchbox",rfqList)
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
        <section className="collapse-side-menu-container">
          <nav id="sidebarCollapse" className="sidebar-collapse client-respons" onScroll={this.onScrollToEnd}>
            <div>
              <div className="form-group quote-filter">
                <select name="sort" value={sort} onClick={(e) => this.onChange(e, true)}>
                  <option value="">Sort</option>
                  <option value="dateAdded,desc">Recent</option>
                  <option value="lastResponseTime,desc">Running</option>
                </select>
              </div>

            </div>
            {
              rfqList.map((item, i) => (

                 <RfqCard
                  key={i}
                  item={item}
                  selectedId={this.state.selectedRfq}
                  onClick={this.getRfqDetails}
                  showStatus={rfqStatus}
                  />
              ))
            }
            {
              this.state.loading &&
              <CreateSkeletons iterations={6}><RfqSkeleton/></CreateSkeletons>
            }
            {
              filterById ?
                <div className="form-group" style={{ margin: 10 }}>
                  <a href="" onClick={this.reload} style={{ marginRight: 10 }}>Show all</a>
                </div> :
                <></>
            }
          </nav>

          {
            !showNegotiation ?
              <div id="sidebar-menu-content1" className="quotation-container">
                <div className="quotation-header">
                  <h3>{rfqDetails.name ? rfqDetails.name : 'N/A'}</h3>
                  <div className="client-info">
                  {
                    rfqDetails.imageUrl ?
                    <img src={addImageSuffix(rfqDetails.imageUrl, '_xicon')} alt="pro pic" />
                    :
                    <img src={require("../../assets/images/pro_pic_default.svg")} alt="pro pic" />
                  }
                    <div className="info">
                      <span>{rfqDetails.executiveName ? rfqDetails.executiveName : 'N/A'}</span>
                      <div className="time">{rfqDetails.dateAdded ? convertTimeToLocal(rfqDetails.dateAdded, rfqDetails.dateAddedTime, 'MMM DD, YYYY hh:mm a') : 'N/A'}</div>
                    </div>
                  </div>
                </div>
                <table className="table table-bordered table-striped table-responsive measurement-chart measurement-table quotation-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>SL No</th>
                      <th>Style</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !this.state.productLoading && rfqDetails.rfqProductResponseList &&
                      rfqDetails.rfqProductResponseList.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <div className="custom-chekbox">
                                <div className="form-group">
                                  <input type="checkbox" id={i} value={item.id} onChange={this.handleCheckbox} />
                                  <label for={i}></label>
                                </div>
                              </div>
                            </td>
                            <td>{'#' + i + 1}</td>
                            <td><a href="" onClick={() => this.goToProductDetails(item.id)}>{item.name ? item.name : 'N/A'}</a></td>
                            <td>{item.quotedPrice ? item.quotedPrice : 'N/A'}</td>
                            <td>{rfqProductStatus(item)}</td>
                            <td>

                              <div className="dropdown">
                                <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                  aria-expanded="false">
                                  Action
                                                      </button>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                  <a className="dropdown-item" href="#" onClick={() => this.approve(item.id)}>Approve</a>
                                  <a className="dropdown-item" onClick={() => this.toggleNegotiation(item.id, item.name)}>Negotiation</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                    {
                      this.state.productLoading &&
                      <CreateSkeletons iterations={5}><RfqProductSkeleton/></CreateSkeletons>
                    }
                  </tbody>
                </table>
                {
                  <div className="form-row">
                    <div className="col-md-12 text-right">
                      <button className="btn btn-nitex-default" data-toggle="modal" data-target="#quickProjectModal" onClick={this.onStart} disabled={!ids.length}>Start project</button>
                    </div>
                  </div>
                }
              </div> :

              <div className="quotation-container">
                <div className="back-header">
                  <a href="#" className="back" onClick={() => this.toggleNegotiation(0)}>Back</a>
                  <h3>{selectedProductName}</h3>
                </div>
                <input type="text" className="type" style={{ marginBottom: 20 }} name="message" value={message} onChange={(e) => this.onChange(e)} onKeyPress={this.keyPressed} placeholder="Type a message here..." />

                <div className="messenger" id="messageList" onScroll={this.onScrollToEndMessages}>
                  {
                    messages.length ?
                      messages.map((item, i) => {
                        return (
                          <div className={item.postedBy.id == userInfo.id ? 'incoming' : 'outgoing'} key={item.id}>
                          {
                            item.postedBy && item.postedBy.imageUrl ?
                            <img src={addImageSuffix(item.postedBy.imageUrl, '_xicon')} alt="pro pic" />
                            :
                            <img src={require("../../assets/images/pro_pic_default.svg")} alt="pro pic" />
                          }
                            <div className="msg" style={{ width: '100%' }}>
                              <p>{item.text}</p>
                              <span className="msg-time">{item.date}</span>
                            </div>
                          </div>
                        )
                      }) :
                      <p style={{ textAlign: 'center', color: '#7E8597', fontSize: 12, paddingTop: 30 }}>No messages found </p>
                  }
                </div>
              </div>
          }
        </section>
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
