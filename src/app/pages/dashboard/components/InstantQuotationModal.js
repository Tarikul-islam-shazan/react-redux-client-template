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
            <div className="modal fade" id="instantQuotation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                    <label for="styleQuantity">How many style do you need</label>
                                                    <select className="form-control" id="styleQuantity">
                                                        <option>1</option>
                                                        <option selected>2</option>
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
                                                                        <label for="productType">Product Type</label>
                                                                        <select className="form-control" id="productType">
                                                                            <option>Select product type</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label for="productType">Fabric Composition</label>
                                                                        <select className="form-control" id="productType">
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
                                                                        <label for="productType">Fabric Weight(GSM)</label>
                                                                        <select className="form-control" id="productType">
                                                                            <option>Select fabric weight(GSM)</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label for="productType">Color</label>
                                                                        <select className="form-control" id="productType">
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
                                                                    <label for="quantity">Total Quantity</label>
                                                                    <input type="range" className="custom-range" min="0" max="100" step="1" id="quantity"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="note">Notes</label>
                                                                    <textarea className="form-control" name="note" id="note" rows="4" placeholder="Write some information about your product"></textarea>
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
                                                                        <label for="productType">Product Type</label>
                                                                        <select className="form-control" id="productType">
                                                                            <option>Select product type</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label for="productType">Fabric Composition</label>
                                                                        <select className="form-control" id="productType">
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
                                                                        <label for="productType">Fabric Weight(GSM)</label>
                                                                        <select className="form-control" id="productType">
                                                                            <option>Select fabric weight(GSM)</option>
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label for="productType">Color</label>
                                                                        <select className="form-control" id="productType">
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
                                                                    <label for="quantity">Total Quantity</label>
                                                                    <input type="range" className="custom-range" min="0" max="100" step="1" id="quantity"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="note">Notes</label>
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


                                            <div className="form-row">
                                                <div className="col-md-8 text-right">
                                                    <button type="submit" className="btn btn-nitex-default">Get quotation</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(InstantQuotationModal);
