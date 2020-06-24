import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import Step_0 from './NewDevelopmentStep_0';
// import Step_1 from './NewDevelopmentStep_1';
// import Step_2 from './NewDevelopmentStep_2';
// import Step_3 from './NewDevelopmentStep_3';

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class SuccessProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0
        };
    }

    componentDidMount = async() => {

    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    _renderStep = () => {
      // let {step} = this.state
      // if(step==0){
      //   return <Step_0 _goToStep={this._goToStep}/>
      // }else if(step==1){
      //   return <Step_1 _goToStep={this._goToStep}/>
      // }else if(step==2){
      //   return <Step_2 _goToStep={this._goToStep}/>
      // }else if(step==3){
      //   return <Step_3 _goToStep={this._goToStep}/>
      // }
    }

    render() {
        return (
          <>
            <div className="successful">
                <article>
                    <img src={require("../../../assets/icons/successfully.png")} alt=""/>
                    <h2>Your product has been added successfully</h2>
                    <a href="" className="btn btn-nitex-default" style={{width: 160}}>Back to Home</a>
                </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessProductPage);
