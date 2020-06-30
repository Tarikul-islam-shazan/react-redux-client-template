import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setActiveTab } from '../../actions/sidebar';

import NewProjectModal from "./components/NewProjectModal";
import NewDevelopmentSuccessModal from "./components/NewDevelopmentSuccessModal";
import InstantQuotationModal from "./components/InstantQuotationModal";
import { RfqList } from "./components/RfqList";
import { ProjectList } from "./components/ProjectList";
import { DashboardTopCard } from "./components/DashboardTopCard";
import ProductCard from '../../commonComponents/ProductCard';

import { columns,fixedHeaders } from '../../constants';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { _getKey } from '../../services/Util';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showRfq : true,
          loading : false,
          dashboard : {},
          nitexDesignList : [],
          page : 0,
          size : 30,
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
          message: 'not at bottom'
        };
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading){
          this.fetchList(page+1)
        }else{
          if(!hasNext){
            // toastWarning("No more data found.")
          }
        }
      } else {

        }
    }

    componentDidMount = () => {
      this.props.setActiveTab('/dashboard');
      window.addEventListener("scroll", this.handleScroll);
      this.fetchDashboardData();
      // this.renderList(0);
      this.fetchList(0)
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    fetchList = async(page) => {
      this.setState({loading:true})
      let { size, nitexDesignList } = this.state;
      // let params = `?page=${page}&size=${size}`;
      let params = {
        page : page,
        size : size
      };
      await Http.GET('getDashboardDesignList',params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          // localStorage.removeItem('token');
          // this.setState({loading:false})
          if(data.length){
              this.setState({
                loading:false,
                nitexDesignList : [...nitexDesignList,...data],
                hasNext : data.length === size ? true : false,
                page : page
              })
          }else{
            this.setState({
              loading : false,
              hasNext : false
            })
            // toastError("Something went wrong! Please try again.");
          }
          // loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(({response}) => {
            console.log('getDashboardDesignList ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    toggleRfq = () => {
      this.setState({
        showRfq: !this.state.showRfq
      })
    }

    fetchDashboardData = async() => {
      this.setState({loading:true})

      await Http.GET('getDashboardData')
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          // localStorage.removeItem('token');
          this.setState({loading:false})
          if(data){
              this.setState({
                dashboard : data
              })
          }else{
            // toastError("Something went wrong! Please try again.");
          }
          // loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(({response}) => {
            console.log('getDashboardData ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    details = (id) => {
      this.props.history.push('/my-products/'+id);
    }

    likeProduct = (id) => {
      this.setState({
        loading:true
      })

      Http.POST( 'likeProduct' , {} , id )
        .then(({data}) => {
          console.log('likeProduct SUCCESS: ', JSON.stringify(data));
          // localStorage.removeItem('token');
          this.setState({loading:false})
          if(data.success){
            // toastSuccess(data.message);
            let { nitexDesignList } = this.state;
            // console.log("entered like",productListByNitex)
            nitexDesignList = nitexDesignList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                // console.log("liked product found")
                return item;
              }
              return item;
            })
            this.setState({
              nitexDesignList
            })
          }else{
            toastError(data.message);
          }
          // localStorage.setItem('loginID', loginID);
          // localStorage.setItem('accountID', JSON.stringify(data.accountID));
          // this.setState({
          //     redirectTo: '/app/home'
          // });
        })
        .catch(({response}) => {
            console.log('likeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    unlikeProduct = (id) => {
      this.setState({
        loading:true
      })

      Http.POST( 'unlikeProduct' , {} , id )
        .then(({data}) => {
          console.log('unlikeProduct SUCCESS: ', JSON.stringify(data));
          // localStorage.removeItem('token');
          this.setState({loading:false})
          if(data.success){
            // toastSuccess(data.message);
            let { nitexDesignList } = this.state;
            nitexDesignList = nitexDesignList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })
            this.setState({
              nitexDesignList
            })
          }else{
            toastError(data.message);
          }
          // localStorage.setItem('loginID', loginID);
          // localStorage.setItem('accountID', JSON.stringify(data.accountID));
          // this.setState({
          //     redirectTo: '/app/home'
          // });
        })
        .catch(({response}) => {
            console.log('unlikeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            // if()
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    showProjectDetails = (id) => {
      this.props.history.push('/my-project-details/'+id);
    }

    showRfqDetails = (id) => {
      this.props.history.push('/my-rfqs'+'?rfqId='+id);
    }

    render() {
        let { dashboard, nitexDesignList } = this.state;
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
              {/*<section className="section">
                  <div className="row">
                      <DashboardTopCard
                        title="Quotes Requested"
                        clsName="icon-box icon-box-rocket"
                        value={dashboard.totalRfq}
                        image={require("../../assets/icons/rocket.png")}/>
                      <DashboardTopCard
                        title="Sample Developments"
                        clsName="icon-box icon-box-settings"
                        value={dashboard.totalDevelopmentProjects}
                        image={require("../../assets/icons/settings.png")}/>
                      <DashboardTopCard
                        title="Full-fledged Productions"
                        clsName="icon-box icon-box-savings"
                        value={dashboard.totalBulkProjects}
                        image={require("../../assets/icons/savings.png")}/>
                      <DashboardTopCard
                        title="Supervision Projects"
                        clsName="icon-box icon-box-research"
                        value={dashboard.totalSupervisionProjects}
                        image={require("../../assets/icons/research.png")}/>
                  </div>
              </section>*/}

              <section className="section my-rfq-project">
                  <div className="row">
                      <div className="col myrfqproject">
                          <div className="card">
                              <div className="card-header">
                                  Requested quotes
                              </div>
                              {
                                dashboard.myTopFiveRfq && dashboard.myTopFiveRfq.length > 0 ?
                                <RfqList data={dashboard.myTopFiveRfq} onClick={this.toggleRfq} showRfqDetails={this.showRfqDetails} />
                                 :
                                <div className="card-body" onClick={this.toggleRfq}>
                                    <p className="card-text mb-2">You don't have any RFQ's</p>
                                    <a href="/quote-request" className="btn btn-nitex-default">Share your Design</a>
                                </div>
                              }

                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-header">
                                  Running projects
                              </div>
                              {
                                dashboard.myTopFiveProjects && dashboard.myTopFiveProjects.length > 0 ?
                                <ProjectList data={dashboard.myTopFiveProjects} onClick={this.toggleRfq} showProjectDetails={this.showProjectDetails} />
                                 :
                                <div className="card-body">
                                    <p className="card-text mb-2">You don't have any Projects</p>
                                    <a href="#" className="btn btn-nitex-default" data-toggle="modal" data-target="#newProject_1_4">Start a Project</a>
                                </div>
                              }
                          </div>
                      </div>
                  </div>
              </section>

              <section className="section dashboard-designs">
                  <h4 className="section-title mb-4">Browse new designs</h4>
                  <div className="filter-products designs">
                      {
                        nitexDesignList.map(( item , i ) => {
                          console.log("entered loop nitexDesignList")
                          return(
                            <ProductCard
                              item={item}
                              key={_getKey()}
                              showDetails={this.details}
                              likeProduct={this.likeProduct}
                              unlikeProduct={this.unlikeProduct}
                             />
                          )
                        })
                      }
                  </div>
                  {!this.state.hasNext && this.state.page!=0 ? <p style={{textAlign:'center',fontWeight:'bold',color:'#452D8D'}}>No data found</p> : <></>}
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
      setActiveTab
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
