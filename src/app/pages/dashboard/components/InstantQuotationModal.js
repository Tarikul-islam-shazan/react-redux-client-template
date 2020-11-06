import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class InstantQuotationModal extends Component {

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
            <div className="modal fade" id="instantQuotation" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                            <section>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-md-8">
                                            <div className="section-header text-center">
                                                <h5 className="section-title">Instant Quotation</h5>
                                                <p className="section-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-content">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-8">
                                                    <label htmlFor="styleQuantity">How many style do you need</label>
                                                    <select className="nice-select" id="styleQuantity">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="col-md-8">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="card">
                                                            <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne">
                                                                <p className="mb-0">
                                                                    Style 1
                                                                </p>
                                                            </div>

                                                            <div id="collapseOne" className="card-body collapse show" data-parent="#accordionExample">
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Product type</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select product type</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Fabric composition</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select fabric composition</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Fabric weight(GSM)</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select fabric weight(GSM)</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Color</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Choose color</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="totalQuantity">Total quantity</label>
                                                                    <select className="nice-select" id="totalQuantity">
                                                                        <option>1</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="note">Notes</label>
                                                                    <textarea className="form-control" name="note" id="note" rows="3" placeholder="Write some information about your product"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card">
                                                            <div className="card-header collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                                                <p className="mb-0">
                                                                    Style 2
                                                                </p>
                                                            </div>
                                                            <div id="collapseTwo" className="card-body collapse" data-parent="#accordionExample">
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">fabric composition</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select product type</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Fabric composition</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select fabric composition</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Fabric weight(GSM)</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Select fabric weight(GSM)</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="productType">Color</label>
                                                                        <select className="nice-select" id="productType">
                                                                            <option>Choose color</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="totalQuantity">Total quantity</label>
                                                                    <select className="nice-select" id="totalQuantity">
                                                                        <option>1</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="note">Notes</label>
                                                                    <textarea className="form-control" name="note" id="note" rows="4" placeholder="Write some information about your product"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card price-card text-center">
                                                        <div className="card-body">
                                                            <h4 className="card-title">
                                                                <span>$</span>120</h4>
                                                            per piece
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row mt-4">
                                                <div className="col-md-8 text-right">
                                                    <div className="row justify-content-end">
                                                        <div className="col-md-4">
                                                            <button type="submit" className="btn btn-nitex-default btn-block">Get quotation</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(InstantQuotationModal);
