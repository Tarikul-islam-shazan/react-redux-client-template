import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class Questionairre_Final extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = async() => {

    }

    _goToFirst = () => {
      this.props.history.push('/questionairre-step-1');
    }

    _submit = () => {
      const email = localStorage.getItem('email');
      console.log("email",email)
      let body = {
        	email: email,
        	profession: this.props.profession.toUpperCase(),
        	region: this.props.area.toUpperCase(),
        	businessType: this.props.purpose.toUpperCase()
        };
        if(this.props.profession == 'Other'){
          body.professionStr = this.props.professionText;
        }
        if(this.props.area == 'Other'){
          body.regionStr = this.props.areaText;
        }
        if(this.props.purpose == 'Other'){
          body.businessTypeStr = this.props.purposeText;
        }
      Http.POST('updateBusinessInfo',body)
        .then(({data}) => {
          console.log('LOGIN SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false})
          if(data.success){
            toastSuccess(data.message);
            this.props.history.push('/designs/explore');
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        return (
            <LoadingOverlay
              active={this.state.loading}
              styles={{
                overlay: (base) => ({
                  ...base,
                  background: LOADER_OVERLAY_BACKGROUND
                }),
                spinner: (base) => ({
                  ...base,
                  width: LOADER_WIDTH,
                  position: LOADER_POSITION,
                  top: LOADER_TOP,
                  left: LOADER_LEFT,
                  marginTop: LOADER_MARGIN_TOP,
                  marginLeft: LOADER_MARGIN_LEFT,
                  '& svg circle': {
                    stroke: LOADER_COLOR
                  }
                }),
                content: (base) => ({
                  ...base,
                  color: LOADER_COLOR
                })
              }}
              spinner
              text={LOADER_TEXT}>
              <div className="page-header text-center my-3">
                  <h3 className="page-title">welcome to nitex</h3>
                  <p className="page-subtitle">Thanks for sharing with us</p>
              </div>

              <div className="page-content">
                <section className="questionnaire">
                    <div className="container px-lg-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className="section-content">
                                    <div className="row">
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire1_owner.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">You are
                                                <br />
                                                <span className="text-active">{ this.props.profession != 'Other' ? this.props.profession.toUpperCase().replace(/_/gi, " ") : this.props.professionText.toUpperCase() }</span>
                                            </p>
                                        </div>
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire_2_4_australia.png")} alt="buyer" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">You are from
                                                <br />
                                                <span className="text-active">{ this.props.area != 'Other' ? this.props.area.toUpperCase().replace(/_/gi, " ") : this.props.areaText.toUpperCase() }</span>
                                            </p>
                                        </div>
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire_3_1_ecommerce.png")} alt="product manager" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">Your business is about
                                                <br />
                                                <span className="text-active">{ this.props.purpose != 'Other' ? this.props.purpose.toUpperCase().replace(/_/gi, " ") : this.props.purposeText.toUpperCase() }</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right mr-5" style={{marginTop: '100px'}}>
                            <button className="btn btn-outline-default" onClick={this._goToFirst} style={{marginRight:5,}}>Change Information</button>
                            <button className="btn btn-nitex-default" onClick={this._submit} style={{width:160}}>Get started</button>
                        </div>
                    </div>
                </section>
              </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
	return {
    profession: store.questionairre.profession,
    area: store.questionairre.area,
    purpose: store.questionairre.purpose,
    professionText: store.questionairre.professionText,
    areaText: store.questionairre.areaText,
    purposeText: store.questionairre.purposeText
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


export default connect(mapStateToProps, mapDispatchToProps)(Questionairre_Final);
