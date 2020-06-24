import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import loadjs from 'loadjs';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewProductForm_1 extends Component {

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
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <label>How many style do you need?:</label>
                        <select className="nice-select" >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3" disabled>3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
            </div>
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
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Product type<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Select product type</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Fabric composition<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Select fabric composition</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Fabric weight (GSM)</label>
                                            <select className="nice-select" >
                                                <option>Select fabric weight (GSM)</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Color<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Choose Color</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Total Quantity<span className="error">*</span></label>
                                            <input type="text" placeholder="Enter Quantity"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Note</label>
                                            <textarea name="" id="" rows="3"
                                                placeholder="Write some information about your product"></textarea>
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
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Product type<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Select product type</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Fabric composition<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Select fabric composition</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Fabric weight (GSM)</label>
                                            <select className="nice-select" >
                                                <option>Select fabric weight (GSM)</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Color<span className="error">*</span></label>
                                            <select className="nice-select" >
                                                <option>Choose Color</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3" disabled>3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Total Quantity<span className="error">*</span></label>
                                            <input type="text" placeholder="Enter Quantity"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Note</label>
                                            <textarea name="" id="" rows="3"
                                                placeholder="Write some information about your product"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <p>Basic Accessories will be included. While giving you the quotation. <a href="#" className="check-link">Check the list here</a></p>
                    <button className="btn-brand" onClick={(e) => this.props.onClick(2)}>Next</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm_1);
