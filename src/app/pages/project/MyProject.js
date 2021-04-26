import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import { ProjectCard } from './components/ProjectCard';
import { encodeQueryData } from '../../services/Util';
import {ProjectSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class MyProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
          projectList: [],
          page: 0,
          size: 15,
          loading:false,
          search: '',
          filterBy: '',
          sort: ['PENDING','RUNNING','COMPLETED'],
          project_type : ['BULK', 'DEVELOPMENT', 'SUPERVISION'],
          sortOrder : 'lastResponseTime,desc',
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
          showEmptyState: false
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
          this.renderList(page+1, true)
        }else{
          if(!hasNext){
            // toastWarning("No more data found.")
          }
        }
        // this.setState({
        //     message: 'bottom reached'
        // });
      } else {

        }
    }

    componentDidMount = () => {
      document.title = "My projects with Nitex - The easiest clothing manufacturing software";
      window.addEventListener("scroll", this.handleScroll);
      this.renderList(0, true, true);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    renderList = ( page = 0 , merge = true, initialFetch = false ) => {
      this.setState({loading:true})
      let { size, projectList, search, filterBy, sort, project_type, sortOrder } = this.state;
      let statusFilter_text = '';
      sort.map((item,i)=>{
        statusFilter_text+='&filterBy='+item;
      })
      let params = {
        page : page,
        size : size,
        search : search,
        sort : sortOrder
      };
      let paramData = encodeQueryData(params);

      Http.GET('getProjectList',paramData+statusFilter_text)
        .then(({data}) => {
          console.log('PROJECT LIST SUCCESS: ', data);
          // localStorage.removeItem('token');
          // this.setState({loading:false})
          if (initialFetch && !data.length) {
              this.setState({
                showEmptyState: true
              })
          }
          if(data.length>0){
            if(merge){
              this.setState({
                projectList : [ ...projectList, ...data ],
                page : page,
                hasNext : data.length === size ? true : false,
                loading:false
              })
            }else{
              this.setState({
                projectList : data,
                page : page,
                hasNext : data.length === size ? true : false,
                loading:false
              })
            }

          }else{
            this.setState({
              projectList : merge ? projectList : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Project List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PROJECT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    onChange = async(e) => {
      let name = e.target.name;
      let value = e.target.value;
      await this.setState({
        [name] : value
      })
      if(name === 'search'){
        return;
      }
      this.renderList(0, false);
    }

    keyPressed = async(e) => {
      // console.log("entered")
      if(e.key==='Enter'){
        this._search()
      }
    }

    _search = async() => {
      await this.setState({
        page : 0
        // size : 100
      })
      this.renderList(0, false);
    }

    onChangeCheckbox = async(e) => {
      let { sort } = this.state;
      let str = e.target.value;
      console.log(e.target.name,e.target.checked);
      if(e.target.checked==false){
        await this.setState({
          sort : sort.filter((item)=>str!=item)
        })
      }else{
        sort.push(str);
        await this.setState({
          sort
        })
      }
      this.renderList(0, false);
    }

    details = (id) => {
      this.props.history.push('/orders/view/'+id);
    }

    render() {
      let { projectList, showEmptyState } = this.state;
        if (showEmptyState) {
            return(
              <div className="not-found">
                  <h1 className="msg">You don't have any projects yet</h1>
                  {/*<button className="btn btn-nitex-default" data-toggle="modal" data-target="#newProject_1_4">Start now</button>*/}
                  <div className="illustration">
                      <img src={require("../../assets/images/not-found.png")} alt=""/>
                  </div>
              </div>
            );
        }
        return (
            <section className="collapse-side-menu-container">
                <section className="section my-project">
                    <div className="order-top-filter">
                        <div className="filter-container">
                            <div className="search">
                                <svg onClick={this._search} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">
                                    <path id="Path_23797" data-name="Path 23797"
                                          d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z"
                                          transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2"
                                          stroke-width="0.5">
                                    </path>
                                </svg>
                                <input type="search" name="search" value={this.state.search} onChange={this.onChange} onKeyPress={this.keyPressed} placeholder="Search...."/>
                            </div>
                            <div className="short-by">
                                <select name="sortOrder" id="sort" value={this.state.sortOrder} onClick={this.onChange}>
                                    <option value="lastResponseTime,desc">Urgent</option>
                                    <option value="dateAdded,desc">Recent</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row">
                            <h5 className="mr-3">Filter by</h5>
                            <div className="filter-by-check">
                                <ul>
                                    <li>
                                        <div className="custom-chekbox">
                                            <div className="form-group">
                                                <input type="checkbox" id="Pending" name="Pending" value="PENDING" onChange={this.onChangeCheckbox} defaultChecked/>
                                                <label htmlFor="Pending">Pending</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="custom-chekbox">
                                            <div className="form-group">
                                                <input type="checkbox" id="Running" name="Running" value="RUNNING" onChange={this.onChangeCheckbox} defaultChecked/>
                                                <label htmlFor="Running">Running</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="custom-chekbox">
                                            <div className="form-group">
                                                <input type="checkbox" id="Completed" name="Completed" value="COMPLETED" onChange={this.onChangeCheckbox} defaultChecked/>
                                                <label htmlFor="Completed">Completed</label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                        {
                          projectList.length ? projectList.map((item,i) => {
                            return(
                              <ProjectCard
                                item={item}
                                onClick={this.details}
                                key={i}
                                />
                            )
                          }) : <></>
                        }
                        {
                          this.state.loading &&
                          <CreateSkeletons iterations={10}><ProjectSkeleton/></CreateSkeletons>
                        }
                        {
                          !this.state.hasNext && projectList.length ?
                          <p  style={{textAlign:'center',fontWeight:'bold',color:'#452D8D'}}>{/* 'No more data...' */}</p>
                          :
                          <></>
                        }
                    </section>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProject);
