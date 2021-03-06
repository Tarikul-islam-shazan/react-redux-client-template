import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { _storeData } from "../design/actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { MeasurementTable } from './components/MeasurementTable'
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import ColorRowWithPicker from "./components/ColorRowWithPicker";

class EditShareDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    componentDidMount = async() => {
        document.title = "Share Design - Nitex";
    }

    render() {
        return (
          <>

          </>
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
      _storeData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditShareDesign);
