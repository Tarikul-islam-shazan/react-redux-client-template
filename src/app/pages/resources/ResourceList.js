import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";




import { fetchResources } from "../../actions/resource";
import Loader from '../../commonComponents/Loader';
import { Alert } from '../../commonComponents/Alert';
import Title from '../../partials/Title';
import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

const rowEvents = props => {
  return {
    onClick: (e, row, rowIndex) => {
      console.log('clicked on row with index:',row.name);
      // const history = useHistory();
      props.history.push('/resource-list/'+row.id)
    }
    // ,
    // onMouseEnter: (e, row, rowIndex) => {
    //   console.log(`enter on row with index: ${rowIndex}`);
    // }
  }
};

class ResourceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loader:false,
            alert:{
              type:'',
              message:''
            }
        };
    }

    uploadImages = (e) => {
      console.log("image list",e.target.files)
    }

    componentDidMount = async() => {
      this.setState({
        loader:true
      })
      await this.props.fetchResources()
      this.setState({
        loader:false
      })
      // axios.get('/api/resource')
      //   .then((response) => {
      //     console.log(response);
      //     this.setState({
      //       loader:false,
      //       data:response.data.data,
      //       alert:{
      //         type:'',
      //         message:''
      //       }
      //     })
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.setState({
      //       loader:false,
      //       alert:{
      //         type:'danger',
      //         message:error.data.message
      //       }
      //     })
      //   });
    }

    render() {
        const { loader, alert } = this.state;
        const dimen = 150;
        console.log("print resources",this.props.resources)
        return (
            <div>
                <Title value="Resource List"/>
                {alert.type ? <Alert data={alert} /> : ''}
                  {loader ?
                    <div style={{textAlign:'center',marginTop:200}}><Loader
                      visible={loader}
                      type={LOADER_STYLE}
                      height={dimen}
                      width={dimen}/>
                    </div> :
                <BootstrapTable classes="table-hover" keyField='id' data={ this.props.resources } columns={ columns } rowEvents={ rowEvents(this.props) } />}
            </div>
        );
    }
}

const mapStateToProps = store => {
	return {
		resources: store.resources.resources
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchResources
		},
		dispatch
	);
};

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(ResourceList);
