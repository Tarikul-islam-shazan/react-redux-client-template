import React, { Component } from 'react';

export const MeasurementChart = ({data, flag, flagName, toggleFlag, onChange, onSubmit}) => {
  let measurementChart = [];

  if (data.sizeTable && data.sizeTable.sizeTableRows) {
    measurementChart = data.sizeTable.sizeTableRows;
  }

  const renderHeader = (obj) => {
    let arr = [];
    for (const [key, value] of Object.entries(obj)) {
        arr.push(<td key={key}>{key}</td>)
    }
    return arr;
  }

  const renderEditableHeader = (obj) => {
    let arr = [];
    for (const [key, value] of Object.entries(obj)) {
        arr.push(<td key={key}><input type="text" name={key} value={key} onChange={(e) => onMeasurementChange(e, null, 'HEADER')} placeholder="Enter Code"/></td>)
    }
    return arr;
  }

  const onMeasurementChange = (e, index = null, type = 'ROW') => {
    console.log("onMeasurementChange", e.target.name, e.target.value);
    if (type === 'HEADER') {
      measurementChart = measurementChart.map((chart) => {
        let val = chart.measurement[e.target.name];
        chart.measurement[e.target.value] = chart.measurement[e.target.name];
        delete chart.measurement[e.target.name];
        return chart;
      })
    } else {
      if(e.target.name == 'code' || e.target.name == 'amount'){
        measurementChart[index][e.target.name] = e.target.value;
      }else{
        measurementChart[index].measurement[e.target.name] = e.target.value;
      }
    }
    onChange('sizeTable', {sizeTableRows: measurementChart});
  }

  if (!flag) {
    return (
      <div class="measurement-chart-table-container position-relative">
          <span class="p-edit cursor-pointer" onClick={() => toggleFlag(flagName)}>
              <div class="d-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                      <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                        <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        <path id="Path_29431" data-name="Path 29431" d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z" transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                      </g>
                    </svg>
              </div>
              <div class="d-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                         <path id="Path_27878" data-name="Path 27878" d="M2444.531-5030.171l4.091,4.335,12.533-11.748" transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
              </div>
          </span>

          <div class="form-group">
              <label  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="cursor-pointer">
                  Measurement Chart
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.466" height="9.188" viewBox="0 0 16.466 9.188">
                      <path id="Path_27707" data-name="Path 27707" d="M0,0,6.819,6.774,13.637,0" transform="translate(1.414 1.414)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
              </label>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
              <div class="collapse" id="collapseExample">

                  <div class="chart-table">
                      <table className="table table-bordered table-responsive table-striped measurement-chart measurement-table flex-grow-1">
                          <thead>
                              <tr>
                                  <th>Size</th>
                                  {
                                    measurementChart.length > 0 ? renderHeader(measurementChart[0].measurement) : <></>
                                  }
                                  <th>Quantity</th>
                              </tr>
                          </thead>
                          <tbody>
                          {
                            measurementChart.map((item,i) => {
                              let arr = [];
                              for (const [key, value] of Object.entries(item.measurement)) {
                                  arr.push(<td key={key}>{value}</td>)
                              }
                              return (
                                <tr key={i}>
                                    <td>{item.code}</td>
                                    {arr}
                                    <td>{item.amount}</td>
                                </tr>
                              )
                            })
                          }
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    )
  }
  return (
    <div class="measurement-chart-table-container position-relative">

        <span class="p-edit cursor-pointer" onClick={() => onSubmit(flagName)}>
             <span class="d-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                    <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                      <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                      <path id="Path_29431" data-name="Path 29431" d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z" transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                    </g>
                  </svg>
             </span>
              <div class="done">
                <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                    <path id="Path_27878" data-name="Path 27878" d="M2444.531-5030.171l4.091,4.335,12.533-11.748" transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
              </div>
        </span>

        <div class="form-group">
            <label  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="cursor-pointer">
                Measurement Chart
                <svg xmlns="http://www.w3.org/2000/svg" width="16.466" height="9.188" viewBox="0 0 16.466 9.188">
                    <path id="Path_27707" data-name="Path 27707" d="M0,0,6.819,6.774,13.637,0" transform="translate(1.414 1.414)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </label>
            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
            <div class="collapse" id="collapseExample">

                <div class="chart-table">
                    <table className="table table-bordered table-responsive table-striped measurement-chart measurement-table flex-grow-1">
                        <thead>
                            <tr>
                                <th>Size</th>
                                {
                                  measurementChart.length > 0 ? renderEditableHeader(measurementChart[0].measurement) : <></>
                                }
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          measurementChart.map((item,i) => {
                            let arr = [];
                            for (const [key, value] of Object.entries(item.measurement)) {
                                arr.push(
                                  <td key={key}>
                                    <input type="text" name={key} value={value} onChange={(e) => onMeasurementChange(e,i)} placeholder="Enter Size"/>
                                  </td>
                                  )
                            }
                            return (
                              <tr key={i}>
                                  <td>
                                    <input type="text" name="code" value={item.code} onChange={(e) => onMeasurementChange(e,i)} placeholder="Enter Code"/>
                                  </td>
                                  {arr}
                                  <td>
                                    <input type="text" name="amount" value={item.amount} onChange={(e) => onMeasurementChange(e,i)} placeholder="Enter Quantity"/>
                                  </td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                    </table>
                    <div class="adjust-property">
                        <div class="d-flex align-items-start flex-column">
                            <span class="add-size cursor-pointer mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="Group_11105" data-name="Group 11105" transform="translate(-3831 6463)">
                                    <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(190,205,239,0.25)" stroke="#472f91" stroke-width="1">
                                        <rect width="24" height="24" rx="12" stroke="none"/>
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                    </g>
                                    <path id="close_3_" data-name="close (3)" d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z" transform="translate(3842.869 -6456.6) rotate(45)" fill="#472f91" stroke="#452c8e" stroke-width="0.25"/>
                                    </g>
                                </svg>
                                Add Size
                            </span>
                            <span class="remove-size cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="Group_11104" data-name="Group 11104" transform="translate(-3831 6463)">
                                    <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(252,60,67,0.05)" stroke="#fc3c43" stroke-width="1">
                                        <rect width="24" height="24" rx="12" stroke="none"/>
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                    </g>
                                    <path id="close_3_" data-name="close (3)" d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z" transform="translate(3842.869 -6456.6) rotate(45)" fill="#fc3c43" stroke="#fc3c43" stroke-width="0.25"/>
                                    </g>
                                </svg>
                                Remove Size
                            </span>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-lg-12">
                        <div class="d-flex align-items-start">
                            <span class="add-size cursor-pointer mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="Group_11105" data-name="Group 11105" transform="translate(-3831 6463)">
                                    <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(190,205,239,0.25)" stroke="#472f91" stroke-width="1">
                                        <rect width="24" height="24" rx="12" stroke="none"/>
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                    </g>
                                    <path id="close_3_" data-name="close (3)" d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z" transform="translate(3842.869 -6456.6) rotate(45)" fill="#472f91" stroke="#452c8e" stroke-width="0.25"/>
                                    </g>
                                </svg>
                                Add Size
                            </span>
                            <span class="remove-size cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="Group_11104" data-name="Group 11104" transform="translate(-3831 6463)">
                                    <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(252,60,67,0.05)" stroke="#fc3c43" stroke-width="1">
                                        <rect width="24" height="24" rx="12" stroke="none"/>
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                    </g>
                                    <path id="close_3_" data-name="close (3)" d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z" transform="translate(3842.869 -6456.6) rotate(45)" fill="#fc3c43" stroke="#fc3c43" stroke-width="0.25"/>
                                    </g>
                                </svg>
                                Remove Size
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
