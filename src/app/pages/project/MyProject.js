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
          this.renderList(page+1,true)
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
      window.addEventListener("scroll", this.handleScroll);
      this.renderList(0);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    renderList = ( page = 0 , merge = true ) => {
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
      this.setState({
        [e.target.name] : e.target.value
      })
      if(e.target.name=='search'){
        return;
      }
      this.renderList(0,false);
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
      this.renderList( 0 , false );
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
      this.renderList( 0 , false );
    }

    details = (id) => {
      this.props.history.push('/my-project-details/'+id);
    }

    render() {
      let { projectList } = this.state;
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
                <section className="collapse-side-menu-container">
                    <nav id="sidebarCollapse" className="sidebar-collapse">
                        <div>
                            <button className="btn-brand" data-toggle="modal" data-target="#newProject_1_4">+Add New Project</button>
                            <h5>Filter by</h5>
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
                             {/*<ul>
                                 <li>
                                     <div className="custom-chekbox">
                                         <div className="form-group">
                                             <input type="checkbox" id="DEVELOPMENT" name="DEVELOPMENT" value="DEVELOPMENT" onChange={this.onChangeCheckbox} defaultChecked/>
                                             <label htmlFor="DEVELOPMENT">Development</label>
                                         </div>
                                     </div>
                                 </li>
                                 <li>
                                     <div className="custom-chekbox">
                                         <div className="form-group">
                                             <input type="checkbox" id="BULK" name="BULK" value="BULK" onChange={this.onChangeCheckbox} defaultChecked/>
                                             <label htmlFor="BULK">Full-fledged</label>
                                         </div>
                                     </div>
                                 </li>
                                 <li>
                                     <div className="custom-chekbox">
                                         <div className="form-group">
                                             <input type="checkbox" id="SUPERVISION" name="SUPERVISION" value="SUPERVISION" onChange={this.onChangeCheckbox} defaultChecked/>
                                             <label htmlFor="SUPERVISION">Supervision</label>
                                         </div>
                                     </div>
                                 </li>
                               </ul>*/}
                            </div>
                        </div>
                    </nav>
                    <div id="sidebar-menu-content">
                        <section className="section my-project">
                            <div className="filter-container">
                                <div className="search">
                                <input type="search" name="search" value={this.state.search} onChange={this.onChange} onKeyPress={this.keyPressed} placeholder="Search...."/>
                                <button className="search" onClick={this._search}></button>
                                </div>
                                <div className="short-by">
                                    <select name="sortOrder" id="sort" value={this.state.sortOrder} onClick={this.onChange}>
                                        <option value="lastResponseTime,desc">Urgent</option>
                                        <option value="dateAdded,desc">Recent</option>
                                    </select>
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
                              !this.state.hasNext && this.state.page!=0 ?
                              <p  style={{textAlign:'center',fontWeight:'bold',color:'#452D8D'}}>No data found</p>
                              :
                              <></>
                            }
                        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProject);
