import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

import Title from '../../partials/Title';
import Loader from '../../commonComponents/Loader';
import { Alert } from '../../commonComponents/Alert';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';

import { columns, fixedHeaders, BASE_URL, LOADER_STYLE } from '../../constants';

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(`clicked on row with index: ${rowIndex}`);
  }
  // ,
  // onMouseEnter: (e, row, rowIndex) => {
  //   console.log(`enter on row with index: ${rowIndex}`);
  // }
};

class AddResource extends Component {

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

    parseData = async(e) => {
      if(!e.target.files){
        return;
      }
      console.log("uploaded file",e.target.files[0].name);
      let r = new FileReader();
      r.onload =  (e) => {
          let csvContents = e.target.result;
          let jsonContents = [];
          let headers = [];
          let csvLines = csvContents.split('\n');
          while (!/[a-zA-Z]/.test(csvLines[0])) csvLines.splice(0, 1); //splice all empty lines before header
          csvLines[0].split(',').forEach(item => headers.push(item));

          for (let i = 1; i < csvLines.length; i++) {
              let currentLine = csvLines[i].split(',');
              let jsonRow = {};
              for (let j = 0; j < currentLine.length; j++) {
                  if (j >= headers.length || !headers[j]) continue;
                  let camelCaseHeader = headers[j][0].toLowerCase() + headers[j].replace(/\s/g, '').substr(1);
                  if (fixedHeaders.indexOf(camelCaseHeader) !== -1 && /\S/.test(currentLine[j])) {
                      jsonRow[camelCaseHeader] = currentLine[j];
                  }
              }
              if (Object.keys(jsonRow).length) {
                  jsonRow['id']=i;

                  jsonContents.push(jsonRow);
              }
          }
          this.setState({
            data:jsonContents
          })
          console.log('Jsoncontents',jsonContents);
      };
      await r.readAsText(e.target.files[0]);
    }

    uploadData = async () => {
      // this.setState({
      //   data:[]
      // })
      // return;
      let { data } = this.state;
      data = data.map((obj)=>{
        delete obj['id'];
        return obj;
      });

      this.setState({
        loader:true
      })

      await axios.post('/api/resource', data)
        .then((response) => {
          console.log(response);
          this.setState({
            loader:false,
            data:[],
            alert:{
              type:'success',
              message:response.data.message
            }
          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader:false,
            alert:{
              type:'danger',
              message:error.data.message
            }
          })
        });
      // console.log("clicked to upload data")
    }

    render() {
      const { loader, alert } = this.state;
      const dimen = 20;
        return (
            <div>
                <Title value="Upload Resource"/>
                {alert.type ? <Alert data={alert} /> : ''}
                <form>
                  <div className="form-group">
                    <label>Select CSV file</label>
                    <input type="file" className="form-control-file" id="csvUpload" onChange={this.parseData}/>
                  </div>
                </form>
                <BootstrapTable keyField='id' data={ this.state.data } columns={ columns } rowEvents={ rowEvents } />
                <BWL title="Upload" loader={loader} buttonStyle="primary" dimen={dimen} onClick={this.uploadData} loaderStyle={LOADER_STYLE} />
            </div>
        );
    }
}

export default AddResource;
