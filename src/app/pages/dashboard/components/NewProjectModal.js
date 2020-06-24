import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Step_0 from './NewDevelopmentStep_0';
import Step_1 from './NewDevelopmentStep_1';
import Step_2 from './NewDevelopmentStep_2';
import Step_3 from './NewDevelopmentStep_3';

import Step_2_Supervision from './NewDevelopmentStep_2_Supervision';
import Step_2_FullFledged from './NewDevelopmentStep_2_FullFledged';

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewProjectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 1
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
      let {step} = this.state;
      let type = this.props.project_type;
      // if(step==4){
      //   this.props.history.push('my-project')
      // }
      if(step==0){
        // return <Step_2_Supervision _goToStep={this._goToStep}/>
        return <Step_0 _goToStep={this._goToStep}/>
      }
      if(type=='DEVELOPMENT'){
        if(step==1){
          return <Step_1 _goToStep={this._goToStep}/>
        }else if(step==2){
          return <Step_2 _goToStep={this._goToStep}/>
        }else if(step==3){
          return <Step_3 _goToStep={this._goToStep}/>
        }
      }else if(type=='SUPERVISION'){
        if(step==1){
          return <Step_1 _goToStep={this._goToStep}/>
        }else if(step==2){
          return <Step_2_Supervision _goToStep={this._goToStep}/>
        }else if(step==3){
          return <Step_3 _goToStep={this._goToStep}/>
        }
      }else if(type=='FULL_FLEDGED_PRODUCTION'){
        if(step==1){
          return <Step_1 _goToStep={this._goToStep}/>
        }else if(step==2){
          return <Step_2_FullFledged _goToStep={this._goToStep}/>
        }else if(step==3){
          return <Step_3 _goToStep={this._goToStep}/>
        }
      }
    }

    render() {
        console.log("modal",this.props.project_type)
        return (
          <>
            <div className="modal fade" id="newProject_1_4" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              {
              this._renderStep()
              }
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
  return {
		project_type: store.project.project_type
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


export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal);
