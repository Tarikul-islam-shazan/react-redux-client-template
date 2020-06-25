import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import loadjs from 'loadjs';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class NewProductForm_3 extends Component {

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
                                    data-target="#collapseOneQuoteNewPro" aria-expanded="true"
                                    aria-controls="collapseOneQuoteNewPro">
                                    Style 1
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOneQuoteNewPro" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Choose your Accessories</label>
                                                <select className="nice-select" >
                                                    <option value="Hangtag">Hangtag</option>
                                                    <option value="2">2</option>
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label> </label>
                                                <ol className="order-list">
                                                    <li>1. Hangtag</li>
                                                    <li>2. Button</li>
                                                    <li>3. Zipper</li>
                                                    <li>4. Lebel</li>
                                                    <li>5. Motif</li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label> </label>
                                                <div className="file file-style-2 btn">
                                                    Upload design
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Measurement Chart</label>
                                            <table className="table table-bordered measurement-chart">
                                                <thead>
                                                    <tr>
                                                        <th>Size</th>
                                                        <th>Width (cm)</th>
                                                        <th>Length (cm)</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="add-new color">
                                                <span>Add Color</span>
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
                                    data-target="#collapseTwoQuoteNewPro" aria-expanded="true"
                                    aria-controls="collapseTwoQuoteNewPro">
                                    Style 2
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwoQuoteNewPro" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label>Choose your Accessories</label>
                                                <select className="nice-select" >
                                                    <option value="Hangtag">Hangtag</option>
                                                    <option value="2">2</option>
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label> </label>
                                                <ol className="order-list">
                                                    <li>1. Hangtag</li>
                                                    <li>2. Button</li>
                                                    <li>3. Zipper</li>
                                                    <li>4. Lebel</li>
                                                    <li>5. Motif</li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label> </label>
                                                <div className="file file-style-2 btn">
                                                    Upload design
                                                    <input type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Measurement Chart</label>
                                            <table className="table table-bordered measurement-chart">
                                                <thead>
                                                    <tr>
                                                        <th>Size</th>
                                                        <th>Width (cm)</th>
                                                        <th>Length (cm)</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>L</td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Size"/>
                                                        </td>
                                                        <td>
                                                          <input type="text" placeholder="Enter Quantity"/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="add-new color">
                                                <span>Add Color</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <button className="btn-brand float-right mt-4" href="#">Get Quotation</button>
                    <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={(e) => this.props.onClick(2)}>Back</button>
                </div>
            </div>
            {/*<div className="row mt-4">
                <div className="col-lg-12">
                    <button className="btn-brand">Get Quotation</button>
                </div>
            </div>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm_3);
