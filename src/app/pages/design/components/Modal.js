import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Contents from './NewProductModalContents';
import SuccessProductPage from './SuccessProductPage';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0,
          formStep:0
        };
    }

    componentDidMount = async() => {

    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    _goToFormStep = (formStep) => {
      this.setState({
        formStep
      })
    }

    _renderStep = () => {
      let {step} = this.state
      if(step==0){
        return <Contents _goToStep={this._goToStep} formStep={this.state.formStep} _goToFormStep={this._goToFormStep}/>
      }else if(step==1){
        return <SuccessProductPage _goToStep={this._goToStep}/>
      }
    }

    render() {
        return (
          <>
            <div className="modal fade" id="AddNewProduct" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              {this._renderStep()}
            </div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
