import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewProjectModal extends Component {

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
            <div className="modal fade" id="newProject_1_4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                            <section className="card-style-1">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-6">
                                            <div className="section-header text-center">
                                                <h5 className="section-title">New Project</h5>
                                                <p className="section-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-9">
                                            <div className="section-content">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="card text-center">
                                                            <img src={require("../../../assets/images/development_project.png")} alt="development project" className="card-img-top img-fluid d-block mx-auto"/>
                                                            <div className="card-body">
                                                                <p className="card-title text-capitalize">Development Project</p>
                                                                <p className="card-text">Lorem ipsum dolor sit amet, consetetur sadips elitr, sed diam nonumy
                                                                    eirmod tempor invidun tinala ut mina labore et dolore magna aliquyam
                                                                    erat sed</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card text-center">
                                                            <img src={require("../../../assets/images/supervision_project.png")} alt="supervision project" className="card-img-top img-fluid d-block mx-auto"/>
                                                            <div className="card-body">
                                                                <p className="card-title text-capitalize">Supervision Project</p>
                                                                <p className="card-text">Lorem ipsum dolor sit amet, consetetur sadips elitr, sed diam nonumy
                                                                    eirmod tempor invidun tinala ut mina labore et dolore magna aliquyam
                                                                    erat sed</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card text-center">
                                                            <img src={require("../../../assets/images/full_fledged_project.png")} alt="full fledged project" className="card-img-top img-fluid d-block mx-auto"/>
                                                            <div className="card-body">
                                                                <p className="card-title text-capitalize">Full-fledged Project</p>
                                                                <p className="card-text">Lorem ipsum dolor sit amet, consetetur sadips elitr, sed diam nonumy
                                                                    eirmod tempor invidun tinala ut mina labore et dolore magna aliquyam
                                                                    erat sed</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal);
