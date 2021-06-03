import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Dropdown} from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import { invoiceStatus, changeDateFormat } from '../../../services/Util';
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
      window.open(url);
    }

    onViewInvoice = (invoiceId) => {
      window.open('/invoices/view/' + invoiceId, '_blank');
    }

    onPayInvoice = (invoiceId) => {
      window.open('/invoices/pay/' + invoiceId, '_blank');
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
            </div>
            <table className="table table-striped mt-4 project-profile-table table-responsive-xl">
                <thead>
                    <tr>
                        <th style={{width: '13%'}}>Invoice number</th>
                        <th style={{width: '13%'}}>Total amount</th>
                        <th style={{width: '13%'}}>Due amount</th>
                        <th scope={{width: '13%'}}>Invoice date</th>
                        <th scope={{width: '13%'}}>Due date</th>
                        <th style={{width: '13%'}}>Status</th>
                        <th style={{width: '13%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                  invoices.map((item,i) => {
                    return(
                      <tr key={i}>
                          <td>{item.invoiceNo}</td>
                          <td>{`$${item.amount}`}</td>
                          <td>{item.priceBreakDown ? `$${item.priceBreakDown.dueAmount}` : ''}</td>
                          <td>{changeDateFormat(item.dateCreated, 'DD/MM/YYYY', 'Do MMM, YY')}</td>
                          <td>{changeDateFormat(item.dueDate, 'DD/MM/YYYY', 'Do MMM, YY')}</td>
                          <td>{invoiceStatus(item)}</td>
                        
                          <td>
                            <div class="d-flex align-items-center justify-content-center">
                                <button type="button" class="pay brand-bg-color text-white w-50 m-0" onClick={() => this.onPayInvoice(item.id)}>Pay</button>
                                <div className="option">
                                    <div className="dropdown">
                                        <Dropdown className="card-options">
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
                                                    <g id="Group_11227" data-name="Group 11227" transform="translate(-1811.5 -564.5)">
                                                        <path id="Path_29420" data-name="Path 29420" d="M19.5,18A1.5,1.5,0,1,1,18,16.5,1.5,1.5,0,0,1,19.5,18Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                        <path id="Path_29421" data-name="Path 29421" d="M19.5,7.5A1.5,1.5,0,1,1,18,6,1.5,1.5,0,0,1,19.5,7.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                        <path id="Path_29422" data-name="Path 29422" d="M19.5,28.5A1.5,1.5,0,1,1,18,27,1.5,1.5,0,0,1,19.5,28.5Z" transform="translate(1796.5 560)" fill="none" stroke="#696969" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                    </g>
                                                </svg>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu alignRight className="dropdown-menu dropdown-menu-right shadow-lg">
                                                <Dropdown.Item href="#" className="px-4 py-3 font-weight-normal text-black font-15" onClick={() => this.onViewInvoice(item.id)}>Details</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </td>
                      </tr>
                    )
                  })
                }

                </tbody>
            </table>
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
