import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT } from '../../constant';
import Thankyou from './Thankyou';

class AskForQuote extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title : '',
          note : '',
          titleError : '',
          noteError : '',
          loading : false,
          thankyou : false
        };
    }

    componentDidUpdate = (prevProps,prevState) => {
      if(prevProps.ids!=this.props.ids){
        this.setState({
          titleError : '',
          noteError : ''
        })
        console.log("componentDidUpdate ask4Quote",prevProps.ids,this.props.ids)
      }
    }

    validate = () => {
      let { title, note, titleError, noteError } = this.state;
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
      return flag;
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    submit = async() => {
      let { title, note } = this.state;
      if(this.validate()){
        await this.setState({loading:true})
        let body = {
          name : title,
          notes : note,
          numOfStyles : this.props.ids.length,
          productDTOList : this.props.ids.map((item,index) => {
            return({
              productCreationType : 'FROM_CATALOG',
              id : item,
              name : "Style "+(index+1)
            })
          })
        }
        console.log("body",body)
        // return;
        await Http.POST('addRfq',body)
          .then(({data}) => {
            console.log('addRfq SUCCESS: ', JSON.stringify(data));
            this.setState({loading:false})
            if(data.success){
              toastSuccess(data.message);
              this.setState({thankyou:true})
              // this.props.history.push('/orders/my-orders');
            }else{
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('addRfq Error: ', JSON.stringify(response));
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
          <>
            <div className="modal fade" id="quickQuoteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-md">
                {
                  thankyou ?
                    <Thankyou goto='quote' /> :
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src={require("../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn"
                                data-dismiss="modal" aria-label="Close"/>
                            <section>
                                <div className="container">
                                    <div className="section-content">
                                        <br/>
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
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label>Give a name to your quote</label>
                                                    <input type="text" className="form-control" placeholder="Enter here" name="title" onChange={this.onChange} value={title}/>
                                                    {
                                                      titleError ? <span className="error">{titleError}</span> : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="note">Notes</label>
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
                                        </LoadingOverlay>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                }
                </div>
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
  return {
		ids : store.product.choosenIdsForQuick
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


export default connect(mapStateToProps, mapDispatchToProps)(AskForQuote);
