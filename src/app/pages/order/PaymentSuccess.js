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

class PaymentSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
          order: {}
        };
    }

    componentDidMount = () => {
      document.title = "Payment success!";
      let name_1 = 'session_id';
      let regex_1 = new RegExp('[\\?&]' + name_1 + '=([^&#]*)');
      let result_1 = regex_1.exec(this.props.location.search);
      let name_2 = 'gateway';
      let regex_2 = new RegExp('[\\?&]' + name_2 + '=([^&#]*)');
      let result_2 = regex_2.exec(this.props.location.search);
      console.log("result_1", decodeURIComponent(result_1[1].replace(/\+/g, ' ')), "result_2", decodeURIComponent(result_2[1].replace(/\+/g, ' ')))
      this.updatePaymentStatus(decodeURIComponent(result_1[1].replace(/\+/g, ' ')), decodeURIComponent(result_2[1].replace(/\+/g, ' ')));
    }

    updatePaymentStatus = async(sessionId, gateway) => {
      let body = {
        gateway,
        sessionId
      }
      await Http.POST('updatePaymentStatus', body)
        .then(({data}) => {
          console.log('updatePaymentStatus SUCCESS: ', JSON.stringify(data));
          if (data.status === 'APPROVED') {
            toastSuccess('Payment is successfully done.');
            this.props.history.push('/orders/view/' + data.id)
          }
        })
        .catch(({response}) => {
            console.log('updatePaymentStatus Error: ', JSON.stringify(response));
            this.setState({loading: false});
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        return (
          <div className="add-quote d-flex">
            <h1>Please wait while your payment is processing...</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess);
