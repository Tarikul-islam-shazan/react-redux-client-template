import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { renderPaymentStatus } from '../../../services/Util';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT, BASE_URL } from '../../../constant';

class PaymentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0,
          loading : false,
          invoices : [],
          token : ''
        };
    }

    componentDidMount = () => {
      this.loadProjectInvoices(this.props.projectId)
      const token = localStorage.getItem('token');
      this.setState({
        token
      })
    }

    loadProjectInvoices = async(id) => {
      await this.setState({
        loading : true
      })
      await Http.GET('getProjectInvoice',id)
        .then(({data}) => {
          console.log('getProjectInvoice SUCCESS: ', data);
          if(data.length){
            this.setState({
              loading:false,
              invoices : data
            })
          }else{
            this.setState({
              loading:false
            })
            // toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('getProjectInvoice ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    downloadInvoice = (src) => {
      let url = BASE_URL+src+'?token='+this.state.token;
      console.log("url",url)
      window.open(url);

    }

    viewInvoice = async(invoiceId) => {
      this.props.switchTab(3, invoiceId)
    }

    render() {
        let { invoices } = this.state;
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
            <div className="tab-head">
                <h3>Payment</h3>
                {/*<div className="search">
                    <input type="search" placeholder="Search...."/>
                </div>*/}
            </div>
            <table className="table table-striped mt-4   project-profile-table">
                <thead>
                    <tr>
                        <th style={{width: '20%'}}>Invoice Id</th>
                        <th style={{width: '25%'}}>Total Amount</th>
                        <th style={{width: '25%'}}>Due Amount</th>
                        <th style={{width: '10%'}}></th>
                        <th style={{width: '10%'}}></th>
                        <th style={{width: '10%'}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                  invoices.map((item,i) => {
                    return(
                      <tr key={i}>
                          <td>{`#${item.id}`}</td>
                          <td>{`$${item.amount}`}</td>
                          <td>{item.dueAmount ? `$${item.dueAmount}` : ''}</td>
                          {/*<td><a href="" className="edit">Edit</a></td>
                          <td><a href="" className="download">Download</a></td>*/}
                          <td>{renderPaymentStatus(item)}</td>
                          {/*<td><a href="#" className="pil invoice" onClick={() => this.downloadInvoice(item.invoiceUrl)}>Invoice</a></td>*/}
                          <td><a href="#" className="pil invoice" onClick={() => this.viewInvoice(item.id)}>View</a></td>
                          <td><a href="#" className="pil payment" onClick={()=>this.props.switchTab(1,item.id)}>Payment</a></td>
                      </tr>
                    )
                  })
                }

                </tbody>
            </table>
            {/*<div className="add-new color">
                <span>Add more file</span>
            </div>*/}
          </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);
