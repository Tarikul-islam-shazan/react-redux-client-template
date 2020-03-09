import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewDevelopmentSuccessModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = async() => {

    }

    render() {
        return (
          <>
            <div className="modal fade" id="newDevSuccess_1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-body">
                            <section class="card-style-1">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-4 text-center">
                                            <img src={require("../../../assets/images/thanks.png")} alt="thank you" class="img-fluid my-4"/>
                                            <h5 class="text-focus">Thanks for your Request</h5>
                                            <p class="mb-5">One of our team member will contact with you soon</p>
                                            <a href="#" class="btn btn-nitex-default">Check your projects</a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
	return {
		// resources: store.resources.resources
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

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentSuccessModal);
