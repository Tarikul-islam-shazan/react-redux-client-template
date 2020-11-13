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
import ProductCard from '../../commonComponents/ProductCard';
import { encodeQueryData, _getKey } from '../../services/Util';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import {ProductSkeleton, CreateSkeletons} from "../../commonComponents/ProductSkeleton";

class MyProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          productList: [],
          page: 0,
          size: 20,
          loading:false,
          search: '',
          filterBy: ['ADDED_BY_ME','FAVED_BY_ME','QUOTATION','BULK_PRODUCTION'],
          sort: 'lastResponseTime,desc',
          quotation : false,
          development : false,
          production : false,
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
      this.renderList(0, true, true);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    renderList = ( page = 0 , merge = true, initialFetch = false ) => {
      this.setState({loading:true})
      let { size, productList, search, filterBy, sort } = this.state;
      let filterByText = '';
      filterBy.map((item,i)=>{
        filterByText+='&filterBy='+item;
      })
      let params = {
        page : page,
        size : size,
        search : search,
        sort : sort
      };

      let paramData = encodeQueryData(params);

      Http.GET('getProductList',paramData+filterByText)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          // this.setState({loading:false})
          if (initialFetch && !data.length) {
              this.setState({
                showEmptyState: true
              })
          }
          if(data.length>0){
            if(merge){
              this.setState({
                productList : [ ...productList, ...data ],
                page : page,
                hasNext : data.length === size ? true : false,
                loading:false
              })
            }else{
              this.setState({
                productList : data,
                page : page,
                hasNext : data.length === size ? true : false,
                loading:false
              })
            }

          }else{
            this.setState({
              productList : merge ? productList : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Product List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    onChange = async(e) => {
      // console.log(e.target.name,e.target.value);
      await this.setState({
        [e.target.name] : e.target.value
      },() => {
        this.renderList( 0 , false );
      })
    }

    onChangeSearchText = async(e) => {
      // console.log(e.target.name,e.target.value);
      this.setState({
        [e.target.name] : e.target.value
      })
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
      let { filterBy } = this.state;
      let str = e.target.value;
      console.log(e.target.name,e.target.checked);
      if(e.target.checked==false){
        await this.setState({
          filterBy : filterBy.filter((item)=>str!=item)
        })
      }else{
        filterBy.push(str);
        await this.setState({
          filterBy
        })
      }
      this.renderList( 0 , false );
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
          this.setState({loading:false})
          if(data.success){
            // toastSuccess(data.message);
            let productList = this.state.productList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                return item;
              }
              return item;
            })
            this.setState({
              productList
            })
          }else{
            toastError(data.message);
          }
        })
        .catch(response => {
            console.log('like Error: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    unlikeProduct = (id) => {
      this.setState({
        loading:true
      })

      Http.POST( 'unlikeProduct' , {} , id )
        .then(({data}) => {
          console.log('unlikeProduct SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false})
          if(data.success){
            // toastSuccess(data.message);
            let productList = this.state.productList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })
            this.setState({
              productList
            })
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('unlikeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            // if()
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        let { productList, sort, showEmptyState } = this.state;
        let flag = 1;
        if (showEmptyState) {
          return (
            <div className="not-found">
                <h1 className="msg">You don't have any products yet</h1>
                <button className="btn btn-nitex-default" data-toggle="modal" data-target="#AddNewProduct">Add now</button>
                <div className="illustration">
                    <img src={require("../../assets/images/not-found.png")} alt=""/>
                </div>
            </div>
          );
        }
        // console.log("state",this.state)
        return (
          <section className="collapse-side-menu-container">
              <nav id="sidebarCollapse" className="sidebar-collapse">
                {/*<button className="btn-brand" data-toggle="modal" data-target="#AddNewProduct">+ Add New Product</button>*/}
                   <h5>Filter by</h5>
                   <div className="filter-by-check">
                    <ul>
                        <li>
                            <div className="custom-chekbox">
                                <div className="form-group">
                                    <input type="checkbox" id="ADDED_BY_ME" name="ADDED_BY_ME" value="ADDED_BY_ME" onChange={this.onChangeCheckbox} defaultChecked/>
                                    <label for="ADDED_BY_ME">Added by me</label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="custom-chekbox">
                                <div className="form-group">
                                    <input type="checkbox" id="FAVED_BY_ME" name="FAVED_BY_ME" value="FAVED_BY_ME" onChange={this.onChangeCheckbox} defaultChecked/>
                                    <label for="FAVED_BY_ME">My favourites</label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="custom-chekbox">
                                <div className="form-group">
                                    <input type="checkbox" id="QUOTATION" name="QUOTATION" value="QUOTATION" onChange={this.onChangeCheckbox} defaultChecked/>
                                    <label for="QUOTATION">Requested quotes</label>
                                </div>
                            </div>
                        </li>
                        {/*<li>
                            <div className="custom-chekbox">
                                <div className="form-group">
                                    <input type="checkbox" id="DEVELOPMENT" name="DEVELOPMENT" value="DEVELOPMENT" onChange={this.onChangeCheckbox} defaultChecked/>
                                    <label for="DEVELOPMENT">In development</label>
                                </div>
                            </div>
                        </li>*/}
                        <li>
                            <div className="custom-chekbox">
                                <div className="form-group">
                                    <input type="checkbox" id="PRODUCTION" name="BULK_PRODUCTION" value="BULK_PRODUCTION" onChange={this.onChangeCheckbox} defaultChecked/>
                                    <label for="PRODUCTION">In production</label>
                                </div>
                            </div>
                        </li>
                      </ul>
                   </div>
              </nav>
              <div id="sidebar-menu-content">
                  <div className="filter-container">
                      <div className="search">
                          <input type="search" name="search" value={this.state.search} onChange={this.onChangeSearchText} onKeyPress={this.keyPressed} placeholder="Search...."/>
                          <button className="search" onClick={this._search}></button>
                      </div>
                      <button className="btn-brand" data-toggle="modal" data-target="#AddNewProduct">+ New design</button>
                     <div className="short-by">
                        <select name="sort" id="sort" value={sort} onClick={this.onChange}>
                          <option value=""></option>
                          <option value="lastResponseTime,desc">Urgent</option>
                          <option value="dateAdded,desc">Recent</option>
                        </select>
                     </div>
                  </div>
                  <div className="filter-products designs">
                      {
                        productList.length ? productList.map(( item , i ) => {
                          return(
                            <ProductCard
                              item={item}
                              key={_getKey()}
                              showDetails={this.details}
                              likeProduct={this.likeProduct}
                              unlikeProduct={this.unlikeProduct}
                             />
                          )
                        }) : <></>
                      }
                      {
                        this.state.loading &&
                        <CreateSkeletons iterations={12}><ProductSkeleton/></CreateSkeletons>
                      }

                  </div>
                  {
                    !this.state.hasNext && productList.length ?
                    <p  style={{textAlign:'center',fontWeight:'bold',color:'#452D8D'}}>{/*'No more data...'*/}</p>
                    :
                    <></>
                  }
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct);
