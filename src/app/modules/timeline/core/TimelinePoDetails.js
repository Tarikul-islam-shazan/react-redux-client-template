import React from "react";

const TimelinePoDetails = () => {
    return (
        <>
            <div className="one-third all-designs-destails">
                <div className="design-info-with-po common-blocks">
                    <div className="design-title-with-date">
                <span><span>NITEX/B1/2021</span>
                  <span className="etd-status">
                    <span className="regular-12 gray_dark_02">25-Aug</span>
                      <img
                          src="/icons/info.svg"
                          alt=""
                      />
                    <div className="etd-dates shadow-2dp">
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                    </div>
                  </span>
                </span>
                        <div className="untis-price">
                            <span>4500 UNITS</span>
                            <span>$85,00</span>
                        </div>
                        <div className="progress-with-count">
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                     aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                            </div>
                            <div><span className="count">100%</span></div>
                        </div>
                        <div className="add-team-members">
                            <div className="all-team-members">
                                <span><img src="/icons/add-member.svg" alt=""/></span>
                                <span className="added-members">
                      <img src="/images/Imranul.png" alt="" data-toggle="tooltip" data-placement="top" title
                           data-original-title="Mamun"/>
                      <img src="/images/jobaidu.png" alt="" data-toggle="tooltip" data-placement="top" title
                           data-original-title="Zahinul Haque"/>
                      <img src="/images/zahinul haque.png" alt="" data-toggle="tooltip" data-placement="top"
                           title data-original-title="pm"/>
                    </span>
                                <span className="more-member" data-toggle="dropdown" aria-haspopup="true"
                                      aria-expanded="false">
                      <a href="#">+5</a>
                      <div className="dropdown-menu shadow-2dp" aria-labelledby="dropdownMenuButton">
                        <div className="assign-member shadow open">
                          <div className="title">Assigned member</div>
                          <div className="member-list-container">
                            <div className="member-list">
                              <img src="/images/jobaidu.png" alt=""/>
                              <div className="name">Md. Sarwar Hossain <span className="tag">Merchandiser</span></div>
                            </div>
                            <div className="member-list">
                              <img src="/images/zahinul haque.png" alt=""/>
                              <div className="name">pm <span className="tag">Project manager</span></div>
                            </div>
                            <div className="member-list">
                              <img src="/images/Imranul.png" alt=""/>
                              <div className="name">Bryan Johnson <span className="tag">Project manager</span> </div>
                            </div>
                            <div className="member-list">
                              <img src="/images/jobaidu.png" alt=""/>
                              <div className="name">Towhid <span className="tag">Impression officer</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                            </div>
                        </div>
                        <div className="all-po-list">
                  <span className="po-names">PO/12/NTR/2021, PO/12/NTR/2021, PO/12/NTR/2021
                    <a href className="button text">
                      <span>PO Details</span>
                      <img src="/icons/arrow-right-no-padding.svg" alt=""/>
                    </a>
                  </span>
                        </div>
                        <div className="pi-download">
                            <button className="button text"><img src="/icons/download.svg"
                                                                 alt="download"/> Download PI
                            </button>
                        </div>
                    </div>
                </div>
                <div className="tab-design-task-buttons">
                    <div className="one-half all-designs-with-status">
                        <div className="custom-chekbox" data-toggle="modal" data-target="#all-designs">
                            <div className="form-group">
                                <input type="checkbox" id name defaultValue/>
                                <label htmlFor><span>ALL DESIGN (4) <img src="/icons/Right-arrow.svg"
                                                                         alt=""/></span></label>
                            </div>
                        </div>
                    </div>
                    <div className="one-half">
                        <p className="regular-12 mb-0 cursor-pointer" data-toggle="modal"
                           data-target="#all-production-details">TASK STATUS</p>
                    </div>
                </div>
                <div className="all-designs-with-status common-blocks tab-none">
                    <div className="select-all-designs">
                        <div className="custom-chekbox">
                            <div className="form-group">
                                <input type="checkbox" id="all" name defaultValue/>
                                <label htmlFor="all"><span>ALL DESIGN (4)</span></label>
                            </div>
                        </div>
                    </div>
                    <div className="design-lists scroll-y-label">
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d1" name defaultValue/>
                                        <label htmlFor="d1"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d2" name defaultValue/>
                                        <label htmlFor="d2"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Production</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Sample</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="single-design-row">
                            <div className="design-details">
                                <div className="custom-chekbox">
                                    <div className="form-group">
                                        <input type="checkbox" id="d3" name defaultValue/>
                                        <label htmlFor="d3"/>
                                    </div>
                                </div>
                                <div className="design-info">
                                    <img src="/images/design1.png" alt="design"/>
                                    <span>Design Number</span>
                                </div>
                            </div>
                            <div className="design-status">
                                <span>Inspection</span>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                         aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal modal-left fade " id="all-designs" tabIndex={-1} role="dialog"
                 aria-labelledby="right_modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Modal CLose button*/}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <img src="/icons/close.svg"/>
                            </button>
                        </div>
                        <div className="modal-body custom-scrollbar">
                            <div className="all-designs-with-status common-blocks">
                                <div className="select-all-designs">
                                    <div className="custom-chekbox">
                                        <div className="form-group">
                                            <input type="checkbox" id="all" name defaultValue/>
                                            <label htmlFor="all"><span>ALL DESIGN (4)</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="design-lists scroll-y-label">
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d1" name defaultValue/>
                                                    <label htmlFor="d1"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d2" name defaultValue/>
                                                    <label htmlFor="d2"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Production</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Sample</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-design-row">
                                        <div className="design-details">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id="d3" name defaultValue/>
                                                    <label htmlFor="d3"/>
                                                </div>
                                            </div>
                                            <div className="design-info">
                                                <img src="/images/design1.png" alt="design"/>
                                                <span>Design Number</span>
                                            </div>
                                        </div>
                                        <div className="design-status">
                                            <span>Inspection</span>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar"
                                                     style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0}
                                                     aria-valuemax={100}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelinePoDetails