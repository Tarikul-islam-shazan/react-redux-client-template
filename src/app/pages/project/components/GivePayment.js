import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';
import { UploadedItemDoc } from '../../../commonComponents/UploadedItem';

class GivePayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0,
          loading : false,
          invoiceId : this.props.invoiceId,
          paymentTerms : '',
          document : {}
        };
    }

    pay = async() => {
      let { invoiceId, paymentTerms, document } = this.state;
      // console.log("body for post","entered");

      if(!paymentTerms || !document.name){
        toastError("Please select payment terms and document");
        return;
      }
      let body ={
        invoiceId,
        paymentTerms,
        documentDTOList : [document]
      }
      this.setState({
        loading : true
      })
      // console.log("body",body)
      // return;
      await Http.POST('payForInvoice',body)
        .then(({data}) => {
          console.log('COMMENT POST SUCCESS: ', data);
          if(data.success){
            toastSuccess(data.message);
            window.location.reload();
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('COMMENT ERROR: ',response);
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
      // console.log(e.target.name,e.target.value,e.target.checked)
    }

    onFileUpload = (e,docType) => {
      // console.log("upload",e.target.name);
      // return;
      // let { styles } = this.props.project;
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
  			"docMimeType" : file.type,
  			"documentType" : docType,
  			"print": false,
  			"base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        data.base64Str = reader.result;
        // console.log(key,data);
        this.setState({[key]:data})
        // console.log("base64",reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    render() {
        let { paymentTerms, document } = this.state;
        // console.log(paymentTerms)
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
              <table className="table mt-4 project-profile-table payment-checkout">
                  <tbody>
                      <tr>
                          <td colSpan="2">
                              <div className="custom-radio">
                                  <div className="form-group">
                                      <input type="radio" id="bank" name="paymentTerms" value="WIRE_TRANSFER" checked={paymentTerms == 'WIRE_TRANSFER'} onChange={this.onChange}/>
                                      <label for="bank">Wire Transfer</label>
                                  </div>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <div className="custom-radio">
                                  <div className="form-group">
                                      <input type="radio" id="paypal" name="paymentTerms" value="LETTER_OF_CREDIT" checked={paymentTerms == 'LETTER_OF_CREDIT'} onChange={this.onChange}/>
                                      <label for="paypal">Letter of Credit</label>
                                  </div>
                              </div>
                          </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="drug-n-drop">
                                {
                                  document.name ?
                                  <div className="head-title">
                                    <p>{document.name}</p>
                                  </div> :
                                  <div className="head-title">
                                    <h4>Drag and drop file</h4>
                                    <span>or</span>
                                    <p>Upload your payment slip here</p>
                                  </div>
                                }
                                <div className="file btn">
                                  Choose file
                                  <input type="file" name="document" onChange={(e) => this.onFileUpload(e,'BANK_SLIP')}/>
                                </div>
                              </div>
                                {
                                  //document.name && <UploadedItemDoc item={document} remove={() => this.setState({document:{}})} />
                                }
                            </div>
                          </div>
                          <div className="form-row">
                              <div className="col-lg-12">
                                  <button className="btn-brand float-right mt-4" onClick={this.pay}>Payment</button>
                                  <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={() => this.props.switchTab(0)}>Back</button>
                              </div>
                          </div>
                        </td>
                      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(GivePayment);
