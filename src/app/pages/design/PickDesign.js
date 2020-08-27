import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import loadjs from "loadjs";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { _getKey } from '../../services/Util';

class PickDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
          groupwiseProductList : [],
          loading : false,
          designList : [],
          page : 0,
          size : 20,
          search : '',
          sort : 'favCount,desc',
          productTypeId : '',
          popular : [],
          trending : [],
          nitexSuggestion : [],
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
        };
    }

    handleScroll = async() => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading, designList, size } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading && designList.length){
          let data = await this.renderList(page+1)
          if(data.length>0){
            this.setState({
              designList : [ ...designList, ...data ],
              page : page+1,
              hasNext : data.length === size ? true : false,
              loading:false
            })
          }else{
            this.setState({
              // designList : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Product List - no data found.");
          }
        }else if(designList.length){
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

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount = async() => {
      window.addEventListener("scroll", this.handleScroll);
      await this.setCategories()
      let designList = await this.renderList();
      this.setState({
        designList,
        hasNext: designList.length === this.state.size ? true : false
      })
    }

    setCategories = () => {
      Http.GET('getProductTypeWithGroup')
        .then(({data}) => {
          console.log('getProductTypeWithGroup SUCCESS: ', data);
          this.setState({loading:false})
          let arr = [];
          if(data.length>0){
            for(let i = 0 ; i < data.length ; i++){
              let obj = {
                groupId : 0,
                groupName : '',
                types : []
              };
              if(i==0){
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                // console.log("object==>"+i,obj)
                arr[0] = obj;
                // console.log("arr==>"+i,arr)
                continue;
              }
              let flag = true;
              for(let j = 0 ; j < arr.length ; j++){
                console.log("from internal array==>"+i,arr)
                if(data[i].productGroup.id == arr[j].groupId){
                  arr[j].types[arr[j].types.length] = data[i];
                  flag = false;
                  break;
                }
              }
              if(flag){
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                console.log("object inside flag==>"+i,obj)
                arr[arr.length] = obj;
                console.log("arr inside flag==>"+i,arr)
              }
            }
            this.setState({
              groupwiseProductList : arr
            })
          }else{
            toastWarning("Product Group List - no data found.");
          }
        })
        .catch(({response}) => {
            // console.log('PRODUCT LIST ERROR: ', response);
            this.setState({loading:false})
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }


    renderList = async(page = 0) => {
      this.setState({loading:true})
      let { size, designList, search, sort, productTypeId } = this.state;
      // let params = `?page=${page}&size=${size}`;
      let params = {
        page : page,
        size : size,
        search : search,
        // filterBy : filterBy,
        productTypeId : productTypeId,
        sort : sort
      };
      let result = [];
      await Http.GET('getPickDesign',params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            // if(merge){
            //   this.setState({
            //     designList : [ ...designList, ...data ],
            //     page : page+1
            //   })
            // }else{
            //   this.setState({
            //     designList : data,
            //     page : page+1
            //   })
            // }
            result = data;
          }else{
            // toastWarning("Product List - no data found.");
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
        return result;
    }

    onChange = async(e) => {
      // console.log(this.state.sort);
      // let designList = [];
      this.setState({
        [e.target.name] : e.target.value,
        page : 0,
        hasNext : true,
        productTypeId : ''
        // size : 100
      },async(name)=>{
        let designList = await this.renderList();
        await this.setState({
          designList,
          hasNext: designList.length === this.state.size ? true : false
        })
      })
      if(e.target.name=='search'){
        return;
      }

    }

    onChangeSrchText = (e) => {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    keyPressed = async(e) => {
      // console.log("entered")
      if(e.key==='Enter'){
        this._search()
      }
    }

    _search = async() => {
      this.setState({
        page : 0,
        hasNext : true,
        productTypeId : ''
        // size : 100
      })
      let designList = await this.renderList();
      await this.setState({
        designList,
        hasNext : designList.length === this.state.size ? true : false
      })
    }

    setProductType = async(productTypeId) => {
      console.log(productTypeId)
      await this.setState({
        productTypeId,
        page : 0,
        hasNext : true,
        // size : 100,
        search : ''
      })
      let designList = await this.renderList();
      await this.setState({
        designList,
        hasNext : designList.length === this.state.size ? true : false
      })
    }

    details = (id = 0) => {
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
<<<<<<< HEAD
            toastSuccess(data.message);
=======
            // toastSuccess(data.message);
>>>>>>> dtmweb
            let { designList } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = true;
                return item;
              }
              return item;
            })
            this.setState({
              designList
            })
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('LOGIN Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
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
          if(data.success){
            // toastSuccess(data.message);
            let { designList } = this.state;
            designList = designList.map((item,i) => {
              if(item.id == id){
                item.liked = false;
                return item;
              }
              return item;
            })
            this.setState({
              designList
            })
          }else{
            toastError(data.message);
          }
          this.setState({loading:false})
        })
        .catch(({response}) => {
            console.log('unlikeProduct Error: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        let { designList, groupwiseProductList, popular, trending, nitexSuggestion, productTypeId, sort } = this.state;
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
                            <button className="btn-brand" data-toggle="modal" data-target="#AddNewProduct">+ Add New Product</button>
                            <h5>Filter By Category</h5>
                            <ul className="list-unstyled">
                              {
                                groupwiseProductList.map((item,i)=>{
                                  return (
                                    <li key={i}>
                                        <a href={`#pageSubmenu${i}`} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">{item.groupName}</a>
                                        <ul className="collapse list-unstyled sub-collapse-menu" id={`pageSubmenu${i}`}>
                                          {
                                            item.types.map((item2,j) => {
                                              if(item2.id==productTypeId){
                                                return(
                                                  <li key={j}><a style={{fontWeight:'bold',color:'#452D8F'}} onClick={() => this.setProductType(item2.id)}>{item2.name}</a></li>
                                                )
                                              }else{
                                                return(
                                                  <li key={j}><a onClick={() => this.setProductType(item2.id)}>{item2.name}</a></li>
                                                )
                                              }
                                            })
                                          }
                                        </ul>
                                    </li>
                                  )

                                })
                              }

                            </ul>
                        </div>
                    </nav>

                    <div id="sidebar-menu-content">
                        <div className="filter-container">
                            <div className="search">
                                <input type="search" placeholder="Search...." name="search" value={this.state.search} onChange={this.onChangeSrchText} onKeyPress={this.keyPressed}/>
                                <button className="search" onClick={this._search}></button>
                            </div>
                            <div className="short-by">
                               <select name="short-by" id="short-by" name="sort" value={sort} onClick={this.onChange}>
                                   <option value=""></option>
                                   <option value="favCount,desc">Popularity</option>
                                   <option value="dateAdded,desc">Trending </option>
                                   <option value="boost,desc">Suggestion</option>
                               </select>
                            </div>
                        </div>

                        <div className="filter-products designs">
                            {
                              designList.map(( item , i ) => {
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
                        {
                          !this.state.hasNext && !designList.length ?
                          <div className="not-found">
                              <h1 className="msg">No product designs found</h1>
                              <div className="illustration">
                                  <img src={require("../../assets/images/not-found.png")} alt=""/>
                              </div>
                          </div>
                          :
                          <></>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(PickDesign);
