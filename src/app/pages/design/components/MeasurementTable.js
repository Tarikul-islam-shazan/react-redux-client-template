import React, { Component } from 'react';

const renderFromObject = (obj) => {
  let arr = [];
  for (const [key, value] of Object.entries(obj)) {
      arr.push(<td key={Math.random() * 10000}>{value}</td>)
  }
  return arr;
}

export class MeasurementTable extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        data : this.props.data,
        headers : []
      };
  }

  componentDidMount = () => {
    const { data } = this.state;
    let headers = [];
    console.log("from table",data);
    if(data.length && data[0].measurement){
      for (const [key, value] of Object.entries(data[0].measurement)) {
          headers.push(<th key={Math.random() * 10000}>{key}</th>)
      }
    }
    this.setState({headers})
  }

  render() {
    let { data , headers } = this.state;
    return(
      <div className="table-responsive">
          <table className="table table-bordered table-striped table-responsive measurement-chart measurement-table">
              <thead>
              <tr>
                  <th>Size</th>
                  {
                    headers
                  }
                  {/*<th>TOL. +/-</th>*/}
              </tr>
              </thead>
              <tbody>
              {
                data.map((item,i) => {
                  return(
                    <tr key={i}>
                      <td>{item.code}</td>
                      {renderFromObject(item.measurement)}
                      {/*<td>{item.amount}</td>*/}
                    </tr>
                  )
                })
              }

              </tbody>
          </table>
      </div>
    );
  }
}
