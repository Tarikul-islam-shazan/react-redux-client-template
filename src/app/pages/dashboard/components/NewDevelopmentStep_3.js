import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewDevelopmentStep_3 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    goToMyProjects = () => {
      this.props.history.push('/my-project');
    }

    render() {
        return (
          <>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-body">
                        <section className="card-style-1">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-4 text-center">
                                        <img src={require("../../../assets/images/thanks.png")} alt="thank you" className="img-fluid my-4"/>
                                        <h5 className="text-focus">Thanks for your Request</h5>
                                        <p className="mb-5">One of our team member will contact with you soon</p>
                                        {/*<a href="/my-project" className="btn btn-nitex-default" onClick={(e) => this.props._goToStep(0)}>Check your projects</a>*/}
                                        <a href="/my-project" className="btn btn-nitex-default">Check your projects</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentStep_3);
