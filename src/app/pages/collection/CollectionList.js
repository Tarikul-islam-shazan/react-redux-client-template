import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import Modal from "react-bootstrap/Modal";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import { encodeQueryData, clothingLabelStatus } from "../../services/Util";

import {
   LOADER_OVERLAY_BACKGROUND,
   LOADER_COLOR,
   LOADER_WIDTH,
   LOADER_TEXT,
   LOADER_POSITION,
   LOADER_TOP,
   LOADER_LEFT,
   LOADER_MARGIN_TOP,
   LOADER_MARGIN_LEFT,
} from "../../constant";

// import {CollectionCard} from './components/CollectionCard';

class CollectionList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         collectionList: [],
         fixedCollections: [],
         page: 0,
         size: 15,
         loading: false,
         name: "",
         hasNext: true, //to check if pagination is available or not
         height: window.innerHeight,
         totalCount: 0,
         show: false,
         showAddCollectionPopup: false,
         collectionName: "",
         collectionNameError: "",
      };
   }

   setWrapperRef = (node) => {
      this.wrapperRef = node;
   };

   handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
         this.setState({
            showAddCollectionPopup: false,
         });
      }
   };

   handleScroll = () => {
      const windowHeight =
         "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
         body.scrollHeight,
         body.offsetHeight,
         html.clientHeight,
         html.scrollHeight,
         html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
         let { hasNext, page, loading } = this.state;
         console.log("message", "bottom reached", hasNext, page, loading);
         if (hasNext && !loading) {
            this.renderList(page + 1, true);
         } else {
            if (!hasNext) {
               // toastWarning("No more data found.")
            }
         }
         // this.setState({
         //     message: 'bottom reached'
         // });
      } else {
      }
   };

   componentDidMount = async () => {
      document.title = "My collections - Nitex - The easiest clothing manufacturing software";
      window.addEventListener("scroll", this.handleScroll);
      document.addEventListener("mousedown", this.handleClickOutside);
      this.getFixedCollections();
      await this.renderList(0);
      // await this.setData();
   };

   componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      document.removeEventListener("mousedown", this.handleClickOutside);
   }

   getFixedCollections = async () => {
      await Http.GET("getFixedCollection")
         .then(({ data }) => {
            console.log("PRODUCT LIST SUCCESS: ", data);
            this.setState({ loading: false });
            if (data) {
               this.setState({
                  fixedCollections: data,
               });
            }
         })
         .catch((response) => {
            console.log("PRODUCT LIST ERROR: ", JSON.stringify(response));
            this.setState({ loading: false });
            toastError("Something went wrong! Please try again.");
         });
   };

   renderList = (page = 0, merge = true) => {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
         userInfo = JSON.parse(userInfo);
      } else {
         userInfo = {};
      }
      this.setState({ loading: true });
      let { size, name, collectionList } = this.state;

      let params = {
         page: page,
         size: size,
         name,
      };
      let paramData = encodeQueryData(params);

      Http.GET("getUserCollectionList", userInfo.id + paramData)
         .then(({ data }) => {
            console.log("getclients SUCCESS: ", data);
            if (data.data && data.data.length > 0) {
               if (merge) {
                  this.setState({
                     collectionList: [...collectionList, ...data.data],
                     page: page,
                     hasNext: data.currentPage + 1 >= data.totalPages ? false : true,
                     loading: false,
                     totalCount: data.totalElements,
                  });
               } else {
                  this.setState({
                     collectionList: data.data,
                     page: page,
                     hasNext: data.currentPage + 1 >= data.totalPages ? false : true,
                     loading: false,
                     totalCount: data.totalElements,
                  });
               }
            } else {
               this.setState({
                  collectionList: merge ? collectionList : [],
                  hasNext: false,
                  loading: false,
                  totalCount: data.totalElements,
               });
               // toastWarning("Project List - no data found.");
            }
         })
         .catch((response) => {
            console.log("PROJECT LIST ERROR: ", JSON.stringify(response));
            this.setState({ loading: false });
            toastError("Something went wrong! Please try again.");
         });
   };

   onChange = async (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   _search = async () => {
      await this.setState({
         page: 0,
         // size : 100
      });
      this.renderList(0, false);
   };

   details = (id) => {
      this.props.history.push("/collections/view/" + id);
   };

   goToEdit = (id) => {
      this.props.history.push("/collection/edit/" + id);
   };

   delete = async (id) => {};

   createNewCollection = () => {
      let { collectionName } = this.state;
      if (!collectionName) {
         this.setState({
            collectionNameError: "Collection name required",
         });
         return;
      } else {
         this.setState({
            collectionNameError: "",
         });
      }
      let body = {
         name: collectionName,
         privacy: "CUSTOM",
         viewType: "PRODUCT_LIST",
      };
      Http.POST("addCollection", body)
         .then(({ data }) => {
            if (data) {
               if (data.success) {
                  toastSuccess(data.message);
                  let temp = {
                     id: data.id,
                     name: collectionName,
                     collectionViewType: "PRODUCT_LIST",
                     numOfDesign: 0,
                     documentResponseList: [],
                  };
                  let { collectionList } = this.state;
                  this.setState({
                     collectionName: "",
                     collectionList: [temp, ...collectionList],
                  });
               }
               this.setState({ showAddCollectionPopup: false });
            }
         })
         .catch(({ response }) => {
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               toastError("Request was unsuccessful.");
            }
         });
   };

   render() {
      let {
         name,
         collectionList,
         fixedCollections,
         showAddCollectionPopup,
         collectionName,
         collectionNameError,
      } = this.state;
      return (
         <div class="explore-design collection-list">
            <div class="d-flex justify-content-between mb-3 mb-sm-0">
               <div class="filter-container explore-design-filter w-50">
                  {/*<div class="search w-100">*/}
                  {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">*/}
                  {/*        <path id="Path_23797" data-name="Path 23797" d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z" transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2" stroke-width="0.5"></path>*/}
                  {/*    </svg>*/}
                  {/*    <input type="search" placeholder="Search by collection name….. " class="w-100"/>*/}
                  {/*</div>*/}
               </div>
               <div class="header-button">
                  <button
                     class="m-0 btn-brand"
                     onClick={() => this.setState({ showAddCollectionPopup: true })}
                  >
                     + Create collection
                  </button>
               </div>
            </div>

            <h4 class="mb-4 font-weight-normal">Default collections</h4>
            <div class="collection-type-container mb-5">
               {fixedCollections.map((collection, i) => {
                  let docs =
                     collection.documentResponseList && collection.documentResponseList.length
                        ? collection.documentResponseList
                        : [];
                  let img1 = docs.length > 0 ? docs[0].docUrl : "";
                  let img2 = docs.length > 1 ? docs[1].docUrl : "";
                  let img3 = docs.length > 2 ? docs[2].docUrl : "";
                  return (
                     <div
                        class="collection-type-item"
                        key={i}
                        onClick={() => {
                           this.props.history.push(
                              "/collections/view/private-collection?viewType=" +
                                 collection.collectionViewType
                           );
                        }}
                     >
                        <div class="product-img-container">
                           <div class="prev-img">
                              <img
                                 src={
                                    img1 ? img1 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                           </div>
                           <div class="prev-img-thumb">
                              <img
                                 src={
                                    img2 ? img2 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                              <img
                                 src={
                                    img3 ? img3 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                           </div>
                        </div>
                        {collection.collectionViewType === "MY_PRODUCTS" ? (
                           <h4 class="font-16 font-weight-normal mt-3 d-flex justify-content-between">
                              <span>My designs</span>
                           </h4>
                        ) : (
                           <></>
                        )}
                        {collection.collectionViewType === "LIKED_PRODUCTS" ? (
                           <h4 className="font-16 font-weight-normal mt-3 d-flex justify-content-between">
                              <span>My favourites</span>{" "}
                           </h4>
                        ) : (
                           <></>
                        )}
                     </div>
                  );
               })}
            </div>

            <h4 class="mb-4 font-weight-normal">Custom collections</h4>
            <div class="collection-type-container">
               {collectionList.map((collection, i) => {
                  let docs =
                     collection.documentResponseList && collection.documentResponseList.length
                        ? collection.documentResponseList
                        : [];
                  let img1 = docs.length > 0 ? docs[0].docUrl : "";
                  let img2 = docs.length > 1 ? docs[1].docUrl : "";
                  let img3 = docs.length > 2 ? docs[2].docUrl : "";
                  return (
                     <div
                        class="collection-type-item"
                        key={i}
                        onClick={() =>
                           this.props.history.push("/collections/view/" + collection.id)
                        }
                     >
                        <div class="product-img-container">
                           <div class="prev-img">
                              <img
                                 src={
                                    img1 ? img1 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                           </div>
                           <div class="prev-img-thumb">
                              <img
                                 src={
                                    img2 ? img2 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                              <img
                                 src={
                                    img3 ? img3 : require("../../assets/images/default_product.svg")
                                 }
                                 alt=""
                              />
                           </div>
                        </div>
                        <h4 className="font-16 font-weight-normal mt-3 d-flex flex-column">
                           <span>{collection.name}</span>
                           <span className="text-muted font-14 mt-2">
                              {collection.numOfDesign ? collection.numOfDesign : 0} Items
                           </span>
                        </h4>
                     </div>
                  );
               })}
               {showAddCollectionPopup ? (
                  <div class="create-new-collection">
                     <div class="pop-container" ref={this.setWrapperRef}>
                        <span class="create-newbutton cursor-pointer">+ Create new collection</span>
                        <div class="create-new d-flex">
                           <input
                              type="text"
                              placeholder="Type your collection name"
                              class="bg-gray-light border-0"
                              name="collectionName"
                              value={collectionName}
                              onChange={this.onChange}
                           />
                           <button
                              class="btn-brand m-0 brand-bg-color"
                              onClick={this.createNewCollection}
                           >
                              Create
                           </button>
                        </div>
                        {collectionNameError ? (
                           <p className="error">{collectionNameError}</p>
                        ) : (
                           <></>
                        )}
                     </div>
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (store) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
