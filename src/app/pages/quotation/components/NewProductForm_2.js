import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import loadjs from 'loadjs';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewProductForm_2 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {
      loadjs(['/js/script.js','/js/custom.js']);
    }

    render() {
        return (
          <>
            <div className="style-item">
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn" type="button" data-toggle="collapse"
                                    data-target="#collapseOne" aria-expanded="true"
                                    aria-controls="collapseOne">
                                    Style 1
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Upload Product Image</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Upload reference Images</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Print</label>
                                                <select className="nice-select" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Upload reference product</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Print</label>
                                                <select className="nice-select" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Upload reference product</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="style-item">
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn" type="button" data-toggle="collapse"
                                    data-target="#collapseTwo" aria-expanded="true"
                                    aria-controls="collapseOne">
                                    Style 2
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Upload Product Image</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Upload reference Images</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Print</label>
                                                <select className="nice-select" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Upload reference product</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Print</label>
                                                <select className="nice-select" >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Upload reference product</label>
                                                <div className="file file-style-2 btn">
                                                    Choose file
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="row mt-4">
                <div className="col-lg-6">
                    <button className="btn-brand" onClick={(e) => this.props.onClick(3)}>Next</button>
                </div>
            </div>*/}
            <div className="row">
                <div className="col-lg-12">
                    <button className="btn-brand float-right mt-4" onClick={(e) => this.props.onClick(3)}>Next</button>
                    <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={(e) => this.props.onClick(1)}>Back</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm_2);
