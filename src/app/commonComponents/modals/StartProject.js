import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT } from '../../constant';
import Thankyou from './Thankyou';

class StartProject extends Component {

     constructor(props) {
        super(props);
        this.state = {
          title : '',
          note : '',
          deadline : '',
          paymentTerms : '',
          titleError : '',
          noteError : '',
          deadlineError : '',
          paymentTermsError : '',
          loading : false,
          thankyou : false
        };
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    componentDidUpdate = (prevProps,prevState) => {
      if(prevProps.ids!=this.props.ids){
        this.setState({
          titleError : '',
          noteError : '',
          deadlineError : '',
          paymentTermsError : ''
        })
        console.log("componentDidUpdate startProject prevProps",this.props.ids)
        console.log("componentDidUpdate startProject this.props",prevProps.ids)
      }
    }

    validate = () => {
      let { title, note, deadline, paymentTerms, titleError, noteError, deadlineError, paymentTermsError } = this.state;
      let flag = true;
      if(title == ''){
        this.setState({
          titleError : 'Title is required'
        })
        flag = false;
      }else{
        this.setState({
          titleError : ''
        })
      }
      if(note == ''){
        this.setState({
          noteError : 'Note is required'
        })
        flag = false;
      }else{
        this.setState({
          noteError : ''
        })
      }
      if(deadline == ''){
        this.setState({
          deadlineError : 'Deadline is required'
        })
        flag = false;
      }else{
        this.setState({
          deadlineError : ''
        })
      }
      if(paymentTerms == ''){
        this.setState({
          paymentTermsError : 'Payment terms is required'
        })
        flag = false;
      }else{
        this.setState({
          paymentTermsError : ''
        })
      }
      return flag;
    }

    submit = async() => {
   
      let rqfarr = localStorage.getItem('rfqs_id')
      
      let { title, note, deadline, paymentTerms } = this.state;
      if(this.validate()){
        await this.setState({loading:true})
        let dl = deadline.split('-');
        let body = {
          rfqid: rqfarr,
          name : title,
          projectType : 'FULL_FLEDGED_PRODUCTION',
          deliveryDate : dl.length==3 ? (dl[2]+'/'+dl[1]+'/'+dl[0]) : deadline,
          // deliveryDate : deadline,
          paymentTerms,
          notes : note,
          fromRfq : this.props.fromRfq,
          productDTOList : this.props.ids.map((item,index) => {
            return({
              productCreationType : 'FROM_CATALOG',
              id : item,
              name : "Style "+(index+1)
            })
          })
        }
      
       
        // console.log('bhai response', this.props.location.search)
        console.log("body",body)
        await Http.POST('addProject',body)
          .then(({data}) => {
            console.log('addProject SUCCESS: ', JSON.stringify(data));
            this.setState({loading:false})
            if(data.success){
              toastSuccess(data.message);
              this.setState({thankyou:true})
              // this.props.history.push('/my-project');
            }else{
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('addProject Error: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }
    }

    render() {
        let { title, note, deadline, paymentTerms, titleError, noteError, deadlineError, paymentTermsError, thankyou } = this.state;
        return (
            <div className="modal fade" id="quickProjectModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-md">
                {
                  thankyou ?
                  <Thankyou goto='project' /> :
                  <div className="modal-content">
                      <div className="modal-body">
                          <img src={require("../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn"
                              data-dismiss="modal" aria-label="Close"/>
                          <section>
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
                              <div className="container">
                                  <div className="section-content">
                                      <br/>
                                      <div className="form-row">
                                          <div className="form-group col-md-12">
                                              <label>Project title</label>
                                              <input type="text" className="form-control" placeholder="Project title" name="title" onChange={this.onChange} value={title}/>
                                              {
                                                titleError ? <span className="error">{titleError}</span> : ''
                                              }
                                          </div>
                                      </div>
                                      <div className="form-row">
                                          <div className="form-group col-md-12">
                                              <label>Expected delivery date</label>
                                              <input type="date" className="form-control" placeholder="Expected delivery date" name="deadline" onChange={this.onChange} value={deadline}/>
                                              {
                                                deadlineError ? <span className="error">{deadlineError}</span> : ''
                                              }
                                          </div>
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <label for="styleQuantity">Payment terms*</label>
                                            <p></p>
                                            <select className="nice-select" name="paymentTerms" value={paymentTerms} onClick={(e) => this.onChange(e)}>
                                                <option value="">Select Payment Terms</option>
                                                {/*<option value="CARD">CARD</option>*/}
                                                <option value="WIRE_TRANSFER">WIRE TRANSFER</option>
                                                <option value="LETTER_OF_CREDIT">LETTER OF CREDIT</option>
                                            </select>
                                            {
                                              paymentTermsError ? <span className="error">{paymentTermsError}</span> : ''
                                            }
                                        </div>
                                      </div>
                                      <div className="form-row">
                                          <div className="form-group col-md-12">
                                              <label for="note">Notes</label>
                                              <textarea className="form-control" id="note" rows="4" name="note" onChange={this.onChange} value={note}
                                              placeholder="Notes"></textarea>
                                              {
                                                noteError ? <span className="error">{noteError}</span> : ''
                                              }
                                          </div>
                                      </div>

                                      <div className="form-row">
                                          <div className="col-md-12 text-right">
                                              <button type="submit" className="btn btn-nitex-default" onClick={this.submit}>Submit</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                            </LoadingOverlay>
                          </section>
                      </div>
                  </div>
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
  //console.log('bhai respnce ',store.product.choosenIdsForQuick);
  return {
    ids : store.product.choosenIdsForQuick,
    fromRfq: store.product.fromRfq
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // fetchResources
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartProject));
