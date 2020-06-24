import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

class RfoNegotiation extends Component {

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
              <section className="collapse-side-menu-container">
                      <nav id="sidebarCollapse" className="sidebar-collapse client-respons">
                             <div className="row">
                              <div className="col-lg-12">
                                  <div className="form-group">
                                      <select>
                                          <option value="Recent">Recent</option>
                                          <option value="2">2</option>
                                          <option value="3" disabled>3</option>
                                          <option value="4">4</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                             <div className="client-list">
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="unresponsed">Unresponsed</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                                 <div className="list">
                                     <div className="client-info">
                                         <img src={require("../../assets/images/demo_product2.png")} alt=""/>
                                         <div className="info">
                                          <h6>Quotation 1</h6>
                                          <span>Client Name</span>
                                         </div>
                                     </div>
                                     <div className="time-respons">
                                         <div className="time">2:36 pm</div>
                                     </div>
                                 </div>
                             </div>
                        </nav>

                      <div id="sidebar-menu-content" className="quotation-container">
                          <div className="back-header">
                              <a href="#" className="back" onClick={() => this.props.history.goBack()}>Back</a>
                              <h3>Style 3</h3>
                          </div>
                          <div className="messenger">
                              <div className="incoming">
                                  <img src={require("../../assets/images/questionnaire1_product_manager.png")} alt=""/>
                                  <div className="msg">
                                      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
                                      <p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr. sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                                      <span className="msg-time">29 April 19 at 02:00 pm</span>
                                  </div>
                              </div>
                              <div className="outgoing">
                                  <img src={require("../../assets/images/questionnaire1_product_manager.png")} alt=""/>
                                  <div className="msg">
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingt, ercitation ullamco laboris nisi utaliquip exeao consequat. </p>
                                      <span className="msg-time">29 April 19 at 02:00 pm</span>
                                  </div>
                              </div>
                              <div className="incoming">
                                  <img src={require("../../assets/images/questionnaire1_product_manager.png")} alt=""/>
                                  <div className="msg">
                                      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
                                     <span className="msg-time">29 April 19 at 02:00 pm</span>
                                  </div>
                              </div>
                              <div className="outgoing">
                                  <img src={require("../../assets/images/questionnaire1_product_manager.png")} alt=""/>
                                  <div className="msg">
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingt, ercitation ullamco laboris nisi utaliquip exeao consequat. </p>
                                      <span className="msg-time">29 April 19 at 02:00 pm</span>
                                  </div>
                              </div>
                              <input type="text" className="type" placeholder="Type a message here..."/>
                          </div>
                      </div>
              </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(RfoNegotiation);
