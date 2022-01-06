import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import Http from '../../services/Http';
import {generateRedirectRoute, getUrlParameter} from '../../services/Util';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    saveToken = async(token,refreshToken) => {
      localStorage.setItem('rememberMe', 1);
      localStorage.setItem('token', 'Bearer '+token);
      localStorage.setItem('refreshToken', refreshToken);
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
        await localStorage.setItem('userInfo',JSON.stringify(userInfo));
        generateRedirectRoute(userInfo,this.props)
    }

    render() {
        console.log(URLSearchParams(this.props.location.search))
        const token = this.getUrlParameter('token');
        const refreshToken = this.getUrlParameter('refreshToken');
        const error = this.getUrlParameter('error');
        console.log("token",token)
        console.log("error",error)
        // return (<></>);
        if(token) {
            this.saveToken(token,refreshToken)
            return (<div></div>);
        } else {
            toastError(error)
            return <Redirect to='/login'/>;
        }
    }
}

export default OAuth2RedirectHandler;
