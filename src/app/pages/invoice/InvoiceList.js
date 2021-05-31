import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';
import { encodeQueryData, _getKey } from '../../services/Util';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import {ProductSkeleton, CreateSkeletons} from "../../commonComponents/ProductSkeleton";

import {InvoiceItem} from './components/InvoiceItem';

class InvoiceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {},
          invoiceList: [],
          loading: false,
          page: 0,
          size: 10,
          hasNext: true,
          search: '',
          status: '',
          sort: 'dateCreated,desc'
        };
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading){
          this.renderList(page+1, true)
        }
      }
    }

    componentDidMount = async() => {
      document.title = "Invoice list - Nitex";
      window.addEventListener("scroll", this.handleScroll);
      let userInfo = localStorage.getItem('userInfo');
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
      } else {
        userInfo = {};
      }
      await this.setState({user: userInfo})
      await this.renderList();
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    renderList = async(page = 0, merge = false) => {
      await this.setState({loading: true});
      let {user, invoiceList, size, search, sort, status} = this.state;
      let params = {
        page, size, search, sort, status
      };
      let paramData = encodeQueryData(params);
      await Http.GET('invoiceList', (user.id + paramData))
        .then(({data}) => {
          console.log('invoiceList SUCCESS: ', data);
          if (data.invoiceResponseList) {
            this.setState({
              invoiceList: merge ? [...invoiceList, ...data.invoiceResponseList] : data.invoiceResponseList,
              hasNext: data.currentPage + 1 >= data.totalPages ? false : true,
              page
            })
          }
          this.setState({loading: false})
        })
        .catch(({response}) => {
            console.log('invoiceList ERROR: ', response);
            this.setState({loading: false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
      if (e.target.name !== 'search') {
        this.renderList();
      }
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.renderList();
      }
    }

    details = (id) => {
      this.props.history.push('/invoices/view/' + id)
    }

    payInvoice = (id) => {
      this.props.history.push('/invoices/pay/' + id)
    }

    remove = () => {

    }

    render() {
        let {invoiceList, sort, status, search} = this.state;
        return (
          <section class="admin-invoice-list">
              <div class="header-sorting d-flex flex-column flex-xl-row justify-content-between align-items-center mb-3">
                  <div>
                      <div class="search w-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">
                              <path id="Path_23797" data-name="Path 23797" d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z" transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2" stroke-width="0.5"></path>
                          </svg>
                          <input type="search" placeholder="Search with invoice number..." name="search" value={search} onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
                      </div>
                  </div>
                  <div class="sort-filter collection-list-filter d-flex mt-3 mt-xl-0">

                     <div class="type">
                         <select class="w-100 bg-gray-light border-0" name="status" id="status" value={status} onClick={this.onChange}>
                             <option value="PENDING">Pending</option>
                             <option value="PARTIALLY_PAID">Partially paid</option>
                             <option value="PAID">Paid</option>
                         </select>
                     </div>

                     <div class="type ml-3">
                         <select class="w-100 bg-gray-light border-0" name="sort" id="sort" value={sort} onClick={this.onChange}>
                             <option value="dateCreated,desc">Newest first</option>
                             <option value="dateCreated,asc">Oldest first</option>
                         </select>
                     </div>
                  </div>
              </div>

              <div class="row">
                  <div class="col-12">
                      <table class="table manage-project-table collection-list-table text-center table-responsive-xl">
                          <thead class="bg-blue-light">
                          <tr>
                              <th scope="col">Invoice number</th>
                              <th scope="col">Order ID</th>
                              <th scope="col">Value</th>
                              <th scope="col">Invoice date</th>
                              <th scope="col">Due date</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            invoiceList.map((invoice, i) => <InvoiceItem key={i} invoice={invoice} details={this.details} remove={this.remove} payInvoice={this.payInvoice} />)
                          }
                          </tbody>
                      </table>
                  </div>
              </div>

          </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
