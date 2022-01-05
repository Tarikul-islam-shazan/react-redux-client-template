import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : true
        };
    }

    componentDidMount = () => {
      setTimeout(() => {
          // localStorage.removeItem('token');
          // localStorage.removeItem('userInfo');
          // localStorage.removeItem('email');
          localStorage.clear();
          sessionStorage.clear()
          delete axios.defaults.headers.common['Authorization'];
          this.props.history.push('/login');
          console.log("...logout component...")
      }, 1000);
    }

    render() {
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);
