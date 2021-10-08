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
        productMeasurement: this.props.measurementResponse
      };
  }

  componentDidMount = () => {
    
  }

  render() {
    let { data , headers, productMeasurement } = this.state;
    return(
      <div className="data-table px-3 pt-2 pb-3">
															<div className="measurement-filter mb-3 mt-0 d-flex justify-content-start align-items-center">
																<p className="mb-0">
																	Measurement in: <span>CM</span>
																</p>
															</div>

															<div className="measurement-info-table">
																<table className="table">
																	<thead>
																		<tr>
																			<th>SL</th>
																			<th>Points</th>
																			<th>TOL(+/-)</th>
																			{productMeasurement?.sizeList?.map(
																				(item, index) => (
																					<th key={index}>
																						{item.value}
																					</th>
																				)
																			)}
																		</tr>
																	</thead>
																	<tbody>
																		{productMeasurement.data?.map(
																			(item, index) => (
																				<tr key={index}>
																					<td>{index + 1}</td>
																					<td>
																						<span className="d-inline-block align-middle">
																							{
																								item
																									.pomResponse
																									?.name
																							}
																						</span>
																					</td>
																					<td>
																						<p>
																							{item?.tolerance}
																						</p>
																					</td>

																					{item?.sizeValueList?.map(
																						(item2, colIndex) => (
																							<td
																								key={colIndex}
																							>
																								<p>{item2}</p>
																							</td>
																						)
																					)}
																				</tr>
																			)
																		)}
																	</tbody>
																</table>
																{productMeasurement.data?.length === 0 && (
																	<p className="no-items regular-14">
																		Size chart not available
																	</p>
																)}
															</div>
														</div>
    );
  }
}
