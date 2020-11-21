import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import moment from 'moment';

import { _storeData } from "./actions";
import { NotificationCard } from './NotificationCard';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../services/Http';
import { toastSuccess, toastError, toastWarning } from '../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../constant';

import { convertTimeToLocal } from '../services/Util';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            notifications : {}
        };
    }

    componentDidUpdate = (prevProps,PrevState) =>{
      console.log("notifications from component did update",this.props.notifications)
      if(prevProps.notifications!=this.props.notifications){
        console.log("notifications",this.props.notifications)
        // this.props.setActiveTab(window.location.pathname)
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      console.log("getDerivedStateFromProps",nextProps);
      if (nextProps.notifications !== prevState.notifications) {
        return {
          notifications : nextProps.notifications
        }
        // return {
        //   derivedData: computeDerivedState(nextProps),
        //   someMirroredValue: nextProps.someValue
        // };
      }

      // Return null to indicate no change to state.
      return null;
    }

    componentDidMount = () => {
      // loadjs(['/js/script.js','/js/custom.js']);
      // console.log("keys",)
      if( !this.props.dataLoadedOnce ){
        this.fetchNotification(0)
      }else{
        this.setState({
          notifications : this.props.notifications
        })
      }
    }

    onScrollToEnd = () => {
      const wrappedElement = document.getElementById('notification-panel');
      if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
        console.log('bottom reached');
        let { hasNext, page } = this.props;
        let { loading } = this.state;
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading){
          this.fetchNotification(page+1)
        }else{
          if(!hasNext){
            // toastWarning("No more notification found.")
          }
        }

      }
    }

    fetchNotification = async(page) => {
      let { size, sort, notifications } = this.props;
      let params = {
        page, size, sort
      }
      await this.setState({
        loading : true
      })
      let result = [];
      await Http.GET('getNotifications',params)
        .then(({data}) => {
          console.log('getNotifications SUCCESS: ', data);
          this.setState({
            loading : false
          })
          result = data;
        })
        .catch(({response}) => {
            this.setState({
              loading : false
            })
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
        // console.log("result",result);
        await result.map((item,i) => {
          if(notifications[item.createdAt]){
            console.log("first",i)
            let temp = [...notifications[item.createdAt], item];
            notifications[item.createdAt] = temp;
          }else{
            console.log("second",i)
            notifications[item.createdAt] = [item];
          }
        })

        await this.props._storeData('dataLoadedOnce',true);
        await this.props._storeData('hasNext',result.length === size ? true : false);
        await this.props._storeData('notifications',notifications);
        await this.setState({
          notifications
        })
        if(result.length){
          await this.props._storeData('page',page);
        }
    }

    loadView = () => {
      let { notifications } = this.state;
      let today = moment().format('DD/MM/yyyy')
      let yesterday = moment().subtract(1, 'days').format('DD/MM/yyyy')
      console.log("load today yesterday", today, yesterday);
      let keys = Object.keys(notifications);
      keys.sort((a,b) => {
        let date = a.split("/");
        let _a = date[2]+'-'+date[1]+'-'+date[0];
        date = b.split("/");
        let _b = date[2]+'-'+date[1]+'-'+date[0];
        return _b.localeCompare(_a);
      })
      console.log("dates",keys);

      return Object.keys(notifications).map((key, index) => {
        let vals = notifications[keys[index]].map((item,i) => {
          return(
            <NotificationCard key={item.id} item={item} todayData={keys[index] === today ? true : false} markRead={this.markRead} />
          )
        })
        // let title = today == keys[index] ? 'Today' :
        return(
          <div className="day" key={key}>
              <h6 className="timing-date">{today === keys[index] ? 'Today' : (yesterday === keys[index] ? 'Yesterday' : convertTimeToLocal(keys[index], '', 'DD.MM.YYYY'))}</h6>
              <ul>
              {vals}
              </ul>
          </div>
        )
      })
    }

    markRead = async(id, isSeen, url) => {
      await this.setState({
        loading: true
      })
      if (isSeen) {
        window.location.href = url;
      } else {
        await Http.POST('markNotificationRead', {}, id)
          .then(({data}) => {
            console.log('markNotificationRead SUCCESS: ', data);
            this.setState({
              loading : false
            })
            window.location.href = url;
          })
          .catch(({response}) => {
              this.setState({
                loading : false
              })
              if(response && response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }

    }

    render() {
      let { notifications } = this.props;
      // console.log("notifications",notifications);

      return (
        <LoadingOverlay
          active={false}
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
          <div className="notification" id="notification-panel" onScroll={this.onScrollToEnd}>
              <h3 className="title">Notification</h3>
              {
                this.loadView()
              }
              {
                this.state.loading ? <p style={{fontSize:20,textAlign:'center'}}>Loading ...</p> : ''
              }
              {
                !this.state.hasNext && !this.state.loading ? <p style={{fontSize:20,textAlign:'center'}}>No more notifications found</p> : ''
              }
              {/*<div className="see-all">
                  <a href="">
                      See all
                  </a>
              </div>*/}
          </div>
        </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => ({
    notifications : store.notification.notifications,
    dataLoadedOnce : store.notification.dataLoadedOnce,
    page : store.notification.page,
    size : store.notification.size,
    sort : store.notification.sort,
    hasNext : store.notification.hasNext
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
      _storeData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
