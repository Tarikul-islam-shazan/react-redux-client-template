import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import Http from '../../services/Http';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    saveToken = async(token) => {
      localStorage.setItem('rememberMe', 1);
      localStorage.setItem('token', 'Bearer '+token);
      let userInfo = {};
      await Http.GET('userInfo')
        .then(({data}) => {
            console.log('userInfo SUCCESS: ', JSON.stringify(data));
            userInfo = data;
        })
        .catch(({response}) => {
          if(response.data && response.data.message){
            toastError(response.data.message);
          }else{
            toastError("Couldn't fetch user info.");
          }
        });
        console.log("checking userinfo outside fetch",userInfo)
        await localStorage.setItem('userInfo',JSON.stringify(userInfo));
        if(userInfo.businessInfoGiven){
          this.props.history.push("/pick-design");
        }else{
          this.props.history.push("/questionairre-step-1");
        }
    }

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        console.log("token",token)
        console.log("error",error)
        // return (<></>);
        if(token) {
            this.saveToken(token)
            return (<div></div>);
        } else {
            toastError(error)
            return <Redirect to='/login'/>;
        }
    }
}

export default OAuth2RedirectHandler;
