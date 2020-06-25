import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProjectSummary from './ProjectSummaryModal';
import PaymentSuccess from './PaymentSuccessModal';
// import Step_1 from './NewDevelopmentStep_1';
// import Step_2 from './NewDevelopmentStep_2';
// import Step_3 from './NewDevelopmentStep_3';

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class ProjectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          // step : 0,
          // formStep:0
        };
    }

    componentDidMount = async() => {
      console.log("from ProjectModal",this.props.data);
    }

    _renderStep = () => {
      let {view} = this.props
      if(view == 0){
        return <ProjectSummary data={this.props.data} />
      }else if(view==1){
        return <PaymentSuccess />
      }
    }

    render() {
      // console.log("from ProjectModal",this.props.data);
        return (
          <>
            <div className="modal fade" id="project-common" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
