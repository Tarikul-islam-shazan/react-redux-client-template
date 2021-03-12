import React, { Component } from 'react';
import { toastSuccess, toastError, toastWarning } from '../../../../commonComponents/Toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// export const MeasurementChart = ({data, flag, flagName, toggleFlag, onChange, onSubmit}) => {
export class MeasurementChart extends Component {

  constructor(props) {
      super(props);
      this.state = {
        measurementChart: this.props.data && this.props.data.sizeTable ? this.props.data.sizeTable.sizeTableRows : [],
        flag: false,
        headerEditFlags: {},
        tempHeaderVal: '',
        selectedKey: ''
      };
  }

  // if (data.sizeTable && data.sizeTable.sizeTableRows) {
  //   measurementChart = data.sizeTable.sizeTableRows;
  // }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.data.sizeTable !== this.props.data.sizeTable) {
      this.setState({
        measurementChart: this.props.data && this.props.data.sizeTable ? this.props.data.sizeTable.sizeTableRows : [],
      })
    }
  }

  toggleFlag = () => {
    this.setState({
      flag: !this.state.flag
    })
  }

  onChangeHeader = (e) => {
    this.setState({
      tempHeaderVal: e.target.value
    })
  }

  makeHeaderEditable = (i, key) => {
    let {headerEditFlags} = this.state;
    headerEditFlags[i] = true;
    this.setState({
      headerEditFlags,
      selectedKey: key,
      tempHeaderVal: key
    })
    console.log("makeHeaderEditable", i, key, headerEditFlags)
  }

  submitHeaderEdit = (i) => {
    let {headerEditFlags, tempHeaderVal, selectedKey, measurementChart} = this.state;
    if (measurementChart.length && measurementChart[0].measurement[tempHeaderVal]) {
      toastError('Header already exist!')
      return;
    }
    measurementChart = measurementChart.map((item) => {
      if (item.measurement) {
        item.measurement[tempHeaderVal] = item.measurement[selectedKey];
        delete item.measurement[selectedKey];
      }
      return item;
    })
    headerEditFlags = headerEditFlags[i] = false;
    this.setState({
      headerEditFlags,
      measurementChart
    })
  }

  deleteHeader = (index, key) => {
    let {headerEditFlags, measurementChart} = this.state;
    delete headerEditFlags[index];
    measurementChart = measurementChart.map((item) => {
      if (item.measurement) {
        delete item.measurement[key];
      }
      return item;
    })
    this.setState({
      headerEditFlags,
      measurementChart
    })
  }

  renderHeader = (obj) => {
    let arr = [];
    for (const [key, value] of Object.entries(obj)) {
        arr.push(<td key={key}>{key}</td>)
    }
    return arr;
  }

  renderEditableHeader = (obj) => {
    let arr = [];
    let {headerEditFlags, tempHeaderVal} = this.state;
    let i = 0;
    for (const [key, value] of Object.entries(obj)) {
        let flagIndex = i;
        arr.push(
          <td key={i}>
          {
            headerEditFlags[i] ?
            <input type="text" name={key} value={tempHeaderVal} onChange={(e) => this.onChangeHeader(e)} placeholder="Enter Code"/> :
            <p>{key}</p>
          }
            <div class="align-items-center d-flex justify-content-center mt-2">
            {
              !headerEditFlags[i] ?
              <span class="cursor-pointer mr-3" onClick={() => this.makeHeaderEditable(flagIndex, key)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="15.841" viewBox="0 0 16.576 15.841">
                      <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(0.75 0.75)">
                          <path id="Path_29430" data-name="Path 29430" d="M18,30h7.538" transform="translate(-10.462 -15.659)"
                              fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                          </path>
                          <path id="Path_29431" data-name="Path 29431"
                              d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z"
                              transform="translate(-4.5 -4.318)" fill="none" stroke="#21242b" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="1.5"></path>
                      </g>
                  </svg>
              </span> :
              <span class="cursor-pointer mr-3" onClick={() => this.submitHeaderEdit(flagIndex)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19.452" height="14.162" viewBox="0 0 19.452 14.162">
                      <path id="Path_27878" data-name="Path 27878" d="M2444.531-5030.171l4.091,4.335,12.533-11.748" transform="translate(-2443.117 5038.998)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
              </span>
            }

                <div class="cursor-pointer dlt" onClick={() => this.deleteHeader(flagIndex, key)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <g id="Group_11045" data-name="Group 11045" transform="translate(-396 -260)">
                            <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4"
                                transform="translate(428 260) rotate(90)" fill="rgba(253,39,39,0.05)"></rect>
                            <g id="delete" transform="translate(405.358 267.001)">
                                <path id="Path_27867" data-name="Path 27867"
                                    d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0"
                                    transform="translate(-213.682 -148.639)" fill="#fd2727"></path>
                                <path id="Path_27868" data-name="Path 27868"
                                    d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0"
                                    transform="translate(-100.308 -148.639)" fill="#fd2727"></path>
                                <path id="Path_27869" data-name="Path 27869"
                                    d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0"
                                    transform="translate(0 0)" fill="#fd2727"></path>
                                <path id="Path_27870" data-name="Path 27870"
                                    d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0"
                                    transform="translate(-156.995 -148.639)" fill="#fd2727"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
          </td>)
          i++;
    }
    return arr;
  }

  onMeasurementChange = (e, index = null, type = 'ROW') => {
    let {measurementChart} = this.state;
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
    this.setState({
      measurementChart
    })
  }

  addNewProperty = () => {
    let {measurementChart} = this.state;
    let obj = measurementChart && measurementChart.length ? measurementChart[0].measurement : {};
    let sampleKeyName = 'New property';
    let keyName = sampleKeyName;
    for (let i = 0; i < 1000; i++) {
      console.log("addNewProperty", i)
      if (i > 0) {
        keyName = sampleKeyName + ' ' + i;
      }
      if (obj[keyName] === undefined) {
        break;
      }
    }
    measurementChart = measurementChart.map((item) => {
      if (item.measurement) {
        item.measurement[keyName] = '';
      }
      return item;
    });
    this.setState({
      measurementChart
    })
  }

  addSize = () => {
    let {measurementChart} = this.state;
    let size = {
      code: '',
      amount: '',
      measurement: {}
    }
    let measurementObj = measurementChart && measurementChart.length ? measurementChart[0].measurement : {};
    for (const [key, value] of Object.entries(measurementObj)) {
      size.measurement[key] = '';
    }
    measurementChart.push(size);
    this.setState({measurementChart})
  }

  removeSize = () => {
    let {measurementChart} = this.state;
    measurementChart.pop();
    this.setState({measurementChart});
  }

  handleOnDragEnd = (result) => {
    console.log("result handleOnDragEnd ===>", result);
    if (!result.destination) return;
    let {measurementChart} = this.state;
    const [reorderedItem] = measurementChart.splice(result.source.index, 1);
    measurementChart.splice(result.destination.index, 0, reorderedItem);
    this.setState({
      measurementChart
    })

  }

  update = () => {
    this.props.onSubmit('editMeasurementChart', this.state.measurementChart);
    this.setState({
      flag: false
    })
  }

  render () {
    let {measurementChart, flag} = this.state;
    if (!flag) {
      return (
        <div class="measurement-chart-table-container position-relative">
            <span class="p-edit cursor-pointer" onClick={() => this.toggleFlag()}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.466" height="9.188" viewBox="0 0 16.466 9.188" className="ml-2">
                        <path id="Path_27707" data-name="Path 27707" d="M0,0,6.819,6.774,13.637,0" transform="translate(1.414 1.414)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </label>
                <p className="font-16"></p>
                <div class="collapse" id="collapseExample">

                    <div class="chart-table">
                        <table className="table table-bordered table-responsive table-striped measurement-chart measurement-table flex-grow-1">
                            <thead>
                                <tr>
                                    <th className="text-center">Size</th>
                                    {
                                      measurementChart.length > 0 ? this.renderHeader(measurementChart[0].measurement) : <></>
                                    }
                                    <th className="text-center">Quantity</th>
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

          <span class="p-edit cursor-pointer" onClick={() => this.update()}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.466" height="9.188" viewBox="0 0 16.466 9.188" className="ml-2">
                      <path id="Path_27707" data-name="Path 27707" d="M0,0,6.819,6.774,13.637,0" transform="translate(1.414 1.414)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
              </label>
            <div className="d-flex justify-content-between mb-3">
                <p className="pr-0 pr-sm-5 font-16"></p>
                <div className="adjust-property text-nowrap">
                    <div className="d-flex align-items-start flex-column">
                              <span className="add-size cursor-pointer" onClick={() => this.addNewProperty()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 align-middle">
                                      <g id="Group_11105" data-name="Group 11105" transform="translate(-3831 6463)">
                                      <g id="Rectangle_6065" data-name="Rectangle 6065"
                                         transform="translate(3855 -6463) rotate(90)" fill="rgba(190,205,239,0.25)"
                                         stroke="#472f91" stroke-width="1">
                                          <rect width="24" height="24" rx="12" stroke="none"/>
                                          <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                      </g>
                                      <path id="close_3_" data-name="close (3)"
                                            d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z"
                                            transform="translate(3842.869 -6456.6) rotate(45)" fill="#472f91"
                                            stroke="#452c8e" stroke-width="0.25"/>
                                      </g>
                                  </svg>
                                  <span className="align-middle">Add Property</span>

                              </span>
                    </div>
                </div>

            </div>
              <div class="collapse" id="collapseExample">

                  <div class="chart-table">
                      <table className="table table-bordered table-responsive table-striped measurement-chart measurement-table flex-grow-1">
                          <thead>
                              <tr>
                                  <th className="text-center">Size</th>
                                  {
                                    measurementChart.length > 0 ? this.renderEditableHeader(measurementChart[0].measurement) : <></>
                                  }
                                  <th className="text-center">Quantity</th>
                              </tr>
                          </thead>
                          <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="sizeTableRows">
                            {(provided) => (
                              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                              {
                                measurementChart.map((item, i) => {
                                  let arr = [];
                                  for (const [key, value] of Object.entries(item.measurement)) {
                                      arr.push(
                                        <td key={key}>
                                          <input type="text" name={key} value={value} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Size"/>
                                        </td>
                                        )
                                  }
                                  return (
                                    <Draggable key={`sizeRowId_${item.code ? item.code : i}`} draggableId={`sizeRowId_${item.code ? item.code : i}`} index={i}>
                                      {(provided) => (
                                        <tr key={i} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <td>
                                              <input type="text" name="code" value={item.code} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Code"/>
                                            </td>
                                            {arr}
                                            <td>
                                              <input type="text" name="amount" value={item.amount} onChange={(e) => this.onMeasurementChange(e,i)} placeholder="Enter Quantity"/>
                                            </td>
                                        </tr>
                                      )}
                                    </Draggable>
                                  )
                                })
                              }
                              </tbody>
                            )}
                            </Droppable>
                          </DragDropContext>
                      </table>
                  </div>

                  <div class="row mt-4">
                      <div class="col-lg-12">
                          <div class="d-flex align-items-start">
                              <span class="add-size cursor-pointer mr-4" onClick={() => this.addSize()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 align-middle">
                                      <g id="Group_11105" data-name="Group 11105" transform="translate(-3831 6463)">
                                      <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(190,205,239,0.25)" stroke="#472f91" stroke-width="1">
                                          <rect width="24" height="24" rx="12" stroke="none"/>
                                          <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                      </g>
                                      <path id="close_3_" data-name="close (3)" d="M3.867,3.32,7.074.113A.387.387,0,0,1,7.621.66L4.414,3.867,7.621,7.074a.387.387,0,0,1-.547.547L3.867,4.414.66,7.621a.387.387,0,0,1-.547-.547L3.32,3.867.113.66A.387.387,0,0,1,.66.113Z" transform="translate(3842.869 -6456.6) rotate(45)" fill="#472f91" stroke="#452c8e" stroke-width="0.25"/>
                                      </g>
                                  </svg>
                                  <span className="align-middle">Add Size</span>
                              </span>
                              {
                                measurementChart.length > 1 ?
                                <span class="remove-size cursor-pointer" onClick={() => this.removeSize()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 align-middle">
                                      <g id="Group_11112" data-name="Group 11112" transform="translate(-3831 6463)">
                                        <g id="Rectangle_6065" data-name="Rectangle 6065" transform="translate(3855 -6463) rotate(90)" fill="rgba(252,60,67,0.05)" stroke="#fc3c43" stroke-width="1">
                                          <rect width="24" height="24" rx="12" stroke="none"/>
                                          <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none"/>
                                        </g>
                                        <path id="Path_27887" data-name="Path 27887" d="M3837.752-6451h10.341" fill="none" stroke="#fc3c43" stroke-linecap="round" stroke-width="1"/>
                                      </g>
                                    </svg>
                                      <span className="align-middle">Remove Size</span>

                                </span> : <></>
                              }
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

// export MeasurementChart;
