import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';

import { validate } from '../../services/Util';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          email : '',
          name : '',
          proPic : '',
          company : '',
          companyId : '',
          companyPrevious : '',
          designation : '',
          department : '',
          phone : '',
          address : '',
          linkedin : '',
          facebook : '',
          twitter : '',
          oldPassword : '',
          newPassword : '',
          newPasswordRe : '',
          oldPasswordError : '',
          newPasswordError : '',
          newPasswordReError : '',
          showSuggestion : false,
          suggestions : [],
          emailSettings: 'ALL',
          billing: {
            fullname: '',
            address: '',
            stateOrProvince: '',
            city: '',
            postCode: '',
            phoneNo: ''
          },
          shipping: {
            fullname: '',
            address: '',
            stateOrProvince: '',
            city: '',
            postCode: '',
            phoneNo: ''
          }
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    componentDidMount = () => {
      document.title = "My profile on Nitex - The easiest clothing manufacturing software";
      document.addEventListener('mousedown', this.handleClickOutside);
      this.fetchUserData()
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({showSuggestion : false})
      }
    }

    fetchUserData = async() => {
      await this.setState({
        loading : true
      })
      await Http.GET('userInfo')
        .then(({data}) => {
          console.log('userInfo SUCCESS calling: ', data);
          if(data){
            localStorage.setItem('userInfo',JSON.stringify(data));
            this.setState({
              loading : false,
              email : data.email ? data.email : '',
              proPic : data.profilePicDocument && data.profilePicDocument.docUrl ? data.profilePicDocument.docUrl : '',
              name : data.name ? data.name : '',
              company : data.company && data.company.name ? data.company.name : '',
              companyId : data.company && data.company.id ? data.company.id : '',
              designation : data.designation ? data.designation : '',
              department : data.department ? data.department : '',
              phone : data.phone ? data.phone : '',
              address : data.address ? data.address : '',
              linkedin : data.linkedInUrl ? data.linkedInUrl : '',
              facebook : data.facebookUrl ? data.facebookUrl : '',
              twitter : data.twitterUrl ? data.twitterUrl : ''
            })
          }else{
            this.setState({
              loading : false
            })
          }
        })
        .catch(({response}) => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
      Http.GET('getSettingsData', 'MAIL_FREQUENCY')
        .then(({data}) => {
          if(data && data.value) {
            this.setState({
              emailSettings: data.value
            })
          }
        })
        .catch(({response}) => {
        });

        let {billing, shipping} = this.state;

        Http.GET('getSettingsData', 'BILLING_AND_SHIPPING_ADDRESS')
          .then(({data}) => {
            if(data && data.value) {
              let val = JSON.parse(data.value);
              console.log("val from BILLING_AND_SHIPPING_ADDRESS", val)
              this.setState({
                billing: val.billing ? {...billing, ...val.billing} : billing,
                shipping: val.shipping ? {...shipping, ...val.shipping} : shipping
              })
            }
          })
          .catch(({response}) => {
          });

    }

    fetchSuggestions = async() => {

      await Http.GET('getCompanyList','?name='+this.state.company)
        .then(({data}) => {
          console.log("getCompanyList",data)
          if(!data.length){
            this.setState({
              companyId : ''
            })
          }
          this.setState({
            suggestions : data
          })
        })
        .catch(({response}) => {
            console.log('getCompanyList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onChangePass = (e) => {
      let err = validate(e,this.state.newPassword,true);
      console.log("err",err)
      this.setState({
        [e.target.name] : e.target.value,
        [err.name]:err.value
      })
    }

    onChange = (e) => {
      if(e.target.name=='company'){
        this.fetchSuggestions()
        this.setState({
          companyId : ''
        })
      }
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    onChangeAddress = (e) => {
      let data = this.state[e.target.id];
      console.log("e", e.target.id, e.target.name, e.target.value, data)
      data[e.target.name] = e.target.value;
      this.setState({
        [e.target.id]: {...data}
      })
    }

    onFileUpload = (e,docType) => {
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
  			"docMimeType" : file.type,
  			"documentType" : docType,
  			"base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        data.base64Str = reader.result;
        this.setState({
          loading : true
        })
        Http.POST('updateProPic',data)
          .then(({data}) => {
            console.log('updateProPic POST SUCCESS: ', data);
            if(data.success){
              this.setState({
                loading:false
              })
              toastSuccess(data.message);
              this.fetchDataAndReload()
            }else{
              this.setState({
                loading:false
              })
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('COMMENT ERROR: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    fetchDataAndReload = async() => {
      await this.fetchUserData()
      window.location.reload()
      // setTimeout(() => { window.location.reload() }, 500);

    }

    updateProfile = async() => {
      let { email, name, proPic, company, companyId, designation, department, phone, address, linkedin, facebook, twitter } = this.state;
      let body = {
        name,
        phone,
        address,
        designation,
        department,
        linkedInUrl : linkedin,
        facebookUrl : facebook,
        twitterUrl : twitter
      }
      if(companyId){
        body.companyId = companyId;
      }else{
        body.companyName = company;
      }
      console.log("body",body);
      await this.setState({loading:true});
      await Http.POST('updateProfile',body)
        .then(({data}) => {
          console.log('updateProfile POST SUCCESS: ', data);
          if(data.success){
            this.setState({
              loading:false
            })
            this.fetchDataAndReload()
            toastSuccess(data.message);
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    updatePassword = async() => {
      let { oldPassword, newPassword, newPasswordRe, oldPasswordError, newPasswordError, newPasswordReError } = this.state;
      if(!oldPasswordError && !newPasswordError && !newPasswordReError){
        if(oldPassword && newPassword && newPasswordRe){
          await this.setState({loading:true});
          let body = {
          	currentPassword : oldPassword,
          	password : newPassword,
          	retypePassword : newPasswordRe
          }
          await Http.POST('updatePassword',body)
            .then(({data}) => {
              console.log('updateProfile POST SUCCESS: ', data);
              if(data.success){
                this.setState({
                  loading:false
                })
                toastSuccess(data.message);
              }else{
                this.setState({
                  loading:false
                })
                toastError(data.message);
              }
            })
            .catch(({response}) => {
                console.log('COMMENT ERROR: ', JSON.stringify(response));
                this.setState({loading:false})
                if(response.data && response.data.message){
                  toastError(response.data.message);
                }else{
                  toastError("Something went wrong! Please try again.");
                }
            });
        }else{
          if(!oldPassword){
            this.setState({
              oldPasswordError : 'Current password is required!'
            })
          }
          if(!newPassword){
            this.setState({
              newPasswordError : 'Password is required!'
            })
          }
        }
      }
    }

    updateEmailPreference = async() => {
      let { emailSettings } = this.state;
      if(emailSettings){
        await this.setState({loading:true});
        let body = {
          key: 'MAIL_FREQUENCY',
          value: emailSettings
        }
        await Http.POST('updatePersonalSettings',body)
          .then(({data}) => {
            console.log('updateEmailPreference POST SUCCESS: ', data);
            if(data.success){
              this.setState({
                loading:false
              })
              toastSuccess(data.message);
            }else{
              this.setState({
                loading:false
              })
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('updateEmailPreference ERROR: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }
    }

    updateAddress = async() => {
      let { billing, shipping } = this.state;
      if(billing && shipping){
        await this.setState({loading:true});
        let body = {
          key: 'BILLING_AND_SHIPPING_ADDRESS',
          value: JSON.stringify({billing, shipping})
        }
        await Http.POST('updatePersonalSettings',body)
          .then(({data}) => {
            console.log('updateAddress POST SUCCESS: ', data);
            if(data.success){
              this.setState({
                loading:false
              })
              toastSuccess(data.message);
            }else{
              this.setState({
                loading:false
              })
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('updateAddress ERROR: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }
    }

    setCompany = (item) => {
      this.setState({
        company : item.name,
        companyId : item.id,
        showSuggestion : false
      })
    }

    render() {
        let { email, name, proPic, company, companyId, designation, department, phone, address,
          linkedin, facebook, twitter, showSuggestion, suggestions, oldPassword, newPassword, newPasswordRe,
          oldPasswordError, newPasswordError, newPasswordReError,
          emailSettings, billing, shipping
        } = this.state;
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
              text=''>
                <section className="profile">
                    <div className="profile-tab">
                        <ul className="nav nav-tabs">
                            <li><a className="active" data-toggle="tab" href="#PersonalInformation">Personal Information</a></li>
                            <li><a data-toggle="tab" href="#ChangePassword">Change Password</a></li>
                            <li><a data-toggle="tab" href="#EmailPreferences">Preferences</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="PersonalInformation" className="tab-pane active">
                                <div className="profile-info">
                                    <div className="user-photo">
                                      {
                                        proPic ?
                                        <img src={proPic} alt=""/>
                                        :
                                        <img src={require("../../assets/images/pro_pic_default.svg")} alt=""/>
                                      }
                                        <div className="file btn">
                                            Change Image
                                            <input type="file" name="proPic" onChange={(e) => this.onFileUpload(e,'PROFILE_PHOTO')}/>
                                        </div>
                                    </div>
                                    <div className="user-info">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Full name</label>
                                                    <input type="text" placeholder="John Doe" name="name" onChange={this.onChange} value={name}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Designation</label>
                                                    <input type="text" placeholder="Marchandiser" name="designation" onChange={this.onChange} value={designation}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Company</label>
                                                    <input type="text" placeholder="Nitex" name="company" onChange={this.onChange} value={company} onClick={()=>this.setState({showSuggestion:true})} autocomplete="off"/>
                                                    {
                                                      showSuggestion ?
                                                      <div className="suggest-filed" ref={this.setWrapperRef}>
                                                          <ul>
                                                          {
                                                            suggestions.length ?
                                                            suggestions.map((item,i) => <li key={item.id} onClick={() => this.setCompany(item)}>{item.name}</li>)
                                                            :
                                                            <li onClick={()=>this.setState({showSuggestion:false})}>No suggestions found...</li>
                                                          }
                                                          </ul>
                                                      </div> :
                                                      <></>
                                                    }

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Department</label>
                                                    <input type="text" placeholder="Apparel Engineering" name="department" onChange={this.onChange} value={department}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="text" placeholder="john.doe@gmail.com" onChange={this.onChange} value={email} disabled/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label for="email">Mobile number</label>
                                                    <input type="text" placeholder="+88017..." name="phone" onChange={this.onChange} value={phone}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label for="email">LinkedIn profile</label>
                                                    <input type="text" placeholder="https://www.linkedin.com/in/" name="linkedin" onChange={this.onChange} value={linkedin}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label for="email">Facebook profile</label>
                                                    <input type="text" placeholder="https://www.facebook.com/" name="facebook" onChange={this.onChange} value={facebook}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label for="email">Twitter profile</label>
                                                    <input type="text" placeholder="https://www.twitter.com/" name="twitter" onChange={this.onChange} value={twitter}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-lg-12 text-right">
                                                <button className="btn-brand" onClick={this.updateProfile}>Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="ChangePassword" className="tab-pane fade">
                                <div className="change-pass">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label for="email">Current Password</label>
                                                <input type="password" placeholder="************" name="oldPassword" onChange={this.onChangePass} value={oldPassword}/>
                                                {
                                                  oldPasswordError ?
                                                  <p className="error">{oldPasswordError}</p>
                                                  : <></>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label for="email">New Password</label>
                                                <input type="password" placeholder="************" name="newPassword" onChange={this.onChangePass} value={newPassword}/>
                                                {
                                                  newPasswordError ?
                                                  <p className="error">{newPasswordError}</p>
                                                  : <></>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label for="email">Retype New Password</label>
                                                <input type="password" placeholder="************" name="newPasswordRe" onChange={this.onChangePass} value={newPasswordRe}/>
                                                {
                                                  newPasswordReError ?
                                                  <p className="error">{newPasswordReError}</p>
                                                  : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-12 text-right">
                                            <button className="btn-brand" onClick={this.updatePassword}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="EmailPreferences" className="tab-pane fade">
                                <div className="email-preferences">
                                    <div className="stepper">
                                        <div className="save-setting d-flex align-items-center mb-4">
                                            <h4>Project emails</h4>
                                            <button className="btn-brand" onClick={this.updateEmailPreference}>Save</button>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="custom-radio">
                                                    <div className="form-group">
                                                        <input type="radio" id="card" value="NONE" name="emailSettings" checked={emailSettings === "NONE"} onChange={this.onChange} />
                                                        <label htmlFor="card">Don't send any emails</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="custom-radio">
                                                    <div className="form-group">
                                                        <input type="radio" id="card1" value="LIMITED" name="emailSettings" checked={emailSettings === "LIMITED"} onChange={this.onChange} />
                                                        <label htmlFor="card1">Email important updates</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="custom-radio">
                                                    <div className="form-group">
                                                        <input type="radio" id="card2" value="ALL" name="emailSettings" checked={emailSettings === "ALL"} onChange={this.onChange} />
                                                        <label htmlFor="card2">Email on all updates</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="address-setting">
                                    <div className="stepper">
                                        <div className="save-setting d-flex align-items-center mb-4">
                                            <h4>Billing Address</h4>
                                            <button className="btn-brand" onClick={this.updateAddress}>Save</button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Full name</label>
                                                    <input type="text" placeholder="Full name" id="billing" name="fullname" value={billing.fullname} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" placeholder="Address" id="billing" name="address" value={billing.address} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>State/Province</label>
                                                    <input type="text" placeholder="State/Province" id="billing" name="stateOrProvince" value={billing.stateOrProvince} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input type="text" placeholder="City" id="billing" name="city" value={billing.city} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>Postal code</label>
                                                    <input type="text" placeholder="Postal code" id="billing" name="postCode" value={billing.postCode} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>Phone number</label>
                                                    <input type="text" placeholder="Phone number" id="billing" name="phoneNo" value={billing.phoneNo} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stepper">
                                        <div className="save-setting d-flex align-items-center mb-4">
                                            <h4>Shipping address</h4>
                                            <button className="btn-brand" onClick={this.updateAddress}>Save</button>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Full name</label>
                                                    <input type="text" placeholder="Full name" id="shipping" name="fullname" value={shipping.fullname} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" placeholder="Address" id="shipping" name="address" value={shipping.address} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>State/Province</label>
                                                    <input type="text" placeholder="State/Province" id="shipping" name="stateOrProvince" value={shipping.stateOrProvince} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input type="text" placeholder="City" id="shipping" name="city" value={shipping.city} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>Postal code</label>
                                                    <input type="text" placeholder="Postal code" id="shipping" name="postCode" value={shipping.postCode} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label>Phone number</label>
                                                    <input type="text" placeholder="Phone number" id="shipping" name="phoneNo" value={shipping.phoneNo} onChange={this.onChangeAddress}
                                                           className="w-100 bg-gray-light border-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </LoadingOverlay>
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


export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
