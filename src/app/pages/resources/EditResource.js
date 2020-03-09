import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

import Title from '../../partials/Title';
import {EditableRow as ER} from './components/EditableRow';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';

import { Alert } from '../../commonComponents/Alert';
import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class EditResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resourceId:0,
            data:{},
            edit:false,
            loader:false,
            alert:{
              type:'',
              message:''
            },
            images:[],
            files:[],
            imagePreviewUrl:''
        };
    }

    componentDidMount = () => {
      const { match : { params } } = this.props;
      this.setState({
        resourceId:params.resourceId
      })
      axios.get('/api/resource/'+params.resourceId)
        .then((response) => {
          console.log(response);
          if(response.data.success){
            this.setState({
              data:response.data.data,
            })
          }else{
            this.setState({
              alert:{
                type:'danger',
                message:response.data.message
              }
            })
          }

        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          this.setState({
            // loader:false,
            alert:{
              type:'danger',
              message:error.message
            }
          })
        });
      console.log("print id",params)
    }

    grabImages = async(e) => {
      let files = Array.from(e.target.files)
      let {images} = this.state;
      files.map((file)=>{
        images.push(URL.createObjectURL(file))
      })
      this.setState({
        images,
        files
      })
      console.log("images newly",images)
    }

    uploadData = () =>{
      const { files,resourceId } = this.state;
      const formData = new FormData()
      files.forEach((file, i) => {
        formData.append(i, file)
      })


      const config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
        }
      }

      // axios.post('/endpoint/url'+resourceId, formData, config)
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))
    }

    onChange = (e) => {
      this.setState({
        data:{...this.state.data,
            [e.target.name]:e.target.value
        }
      })
    }

    updateInfo = () =>{
      // console.log("data to update",this.state.data)
      const { data, resourceId } = this.state;
      this.setState({
        loader:true
      })
      axios.put('/api/resource/'+resourceId,data)
        .then((response) => {
          console.log(response);
          this.setState({
            loader:false,
            edit:false,
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
              message:error.message
            }
          })
        });
    }

    render() {
        const { data:{name,address,city,state,zipCode,county,phone,type,capacity,mapUrl}, edit, alert, loader } = this.state;
        const dimen = 20;

        return (
            <div>
                <Title value="Edit Resource"/>
                {alert.type ? <Alert data={alert} /> : ''}

                <div className="row">
                  <div className="col-md-4">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th width="40%" style={{fontSize:25,fontStyle:'italic'}}>Details</th>
                            <th width="60%">
                              {
                                !edit?<button onClick={()=>this.setState({edit:true})} className="btn btn-info">Edit</button>:
                                <div>
                                  <BWL title="Update" loader={loader} buttonStyle="primary" dimen={dimen} onClick={this.updateInfo} loaderStyle={LOADER_STYLE} />
                                  <button onClick={()=>this.setState({edit:false})} className="btn btn-danger" style={{marginLeft:10}}>Cancel</button>
                                </div>
                              }
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <ER title="Name" name="name" flag={edit} value={name} onChange={this.onChange} />
                            <ER title="Address" name="address" flag={edit} value={address} onChange={this.onChange} />
                            <ER title="City" name="city" flag={edit} value={city} onChange={this.onChange} />
                            <ER title="State" name="state" flag={edit} value={state} onChange={this.onChange} />
                            <ER title="Zip Code" name="zipCode" flag={edit} value={zipCode} onChange={this.onChange} />
                            <ER title="County" name="county" flag={edit} value={county} onChange={this.onChange} />
                            <ER title="Phone" name="phone" flag={edit} value={phone} onChange={this.onChange} />
                            <ER title="Type" name="type" flag={edit} value={type} onChange={this.onChange} />
                            <ER title="Capacity" name="capacity" flag={edit} value={capacity} onChange={this.onChange} />
                            <ER title="Map URL" name="mapUrl" flag={edit} value={mapUrl} onChange={this.onChange} />
                        </tbody>
                    </table>
                  </div>
                  <div className="col-md-8">
                    <form>
                      <div className="form-group">
                        <label>Example file input</label>
                        <input type="file" className="form-control-file" id="csvUpload" onChange={this.grabImages} multiple/>
                      </div>
                      <div style={{textAlign:'center'}}>
                        {this.state.images.map((url,i)=>{
                          return (<img key={i} src={url} style={{height:100,width:100,marginLeft:10,marginRight:10,marginBottom:10}}/>)
                        })}
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-md-12">
                        <button className="btn btn-primary" onClick={this.uploadData}>Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default EditResource;
