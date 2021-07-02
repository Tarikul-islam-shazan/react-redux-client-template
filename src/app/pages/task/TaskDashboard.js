import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';
import Modal from 'react-bootstrap/Modal';

import Http from '../../services/Http';
import { changeDateFormat } from '../../services/Util';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import EmptyState from '../../commonComponents/EmptyState';
import TaskManage from './components/TaskManage';

import {TabHeader} from './components/TabHeader';
import {TabItem} from './components/TabItem';
import {TableTitleComponent} from './components/TableTitleComponent';

class TaskDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          myTaskCount: {},
          selectedTab: 'START_TODAY',
          pagination: {
            START_TODAY: {},
            DUE_SOON: {},
            OVERDUE: {},
            COMPLETE: {}
          },
          orderFlags: {},
          showTaskDetailsModal: false,
          selectedTaskId: null,
          selectedOrderId: null,
        };
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { selectedTab, loading, pagination } = this.state;
        if (pagination[selectedTab].currentPage < (pagination[selectedTab].totalPages - 1)) {
          this.getTasks();
        }
      }
    }

    componentDidMount = async() => {
      document.title = "My designs on Nitex - The easiest clothing manufacturing software";
      this.getTaskCounts();
      await this.getTasks();
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    getTaskCounts = async () => {
      await Http.GET('myTaskCount')
        .then(({data}) => {
          this.setState({
            loading:false,
            myTaskCount: data
          })
        })
        .catch(({response}) => {
            this.setState({loading: false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getTasks = async () => {
      await this.setState({loading: true});
      let {selectedTab, pagination} = this.state;
      let result = this.state[selectedTab];
      let pageNumber = pagination[selectedTab].currentPage !== undefined ? (pagination[selectedTab].currentPage + 1) : 0;
      await Http.GET('getMyTasks', `?tab=${selectedTab}&page=${pageNumber}&size=${20}`)
        .then(({data}) => {
          if (data.data) {
            pagination[selectedTab] = {
              currentPage: data.currentPage,
              totalPages: data.totalPages,
              totalElements: data.totalElements,
            }
            this.setState({
              loading: false,
              [selectedTab]: pageNumber === 0 ? data.data : [...result, ...data.data],
            })
          }
        })
        .catch(({response}) => {
            this.setState({loading: false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    orderData = async (type) => {
      let {orderFlags, selectedTab} = this.state;
      let data = this.state[selectedTab];
      orderFlags[type] = orderFlags[type] ? false : true;
      await this.setState({
        orderFlags
      })
      data = data.sort((o1, o2) => {
        let a = null;
        let b = null;
        if (type === 'STYLE') {
          a = o1.stepProduct ? o1.stepProduct.name.toUpperCase() : '';
          b = o2.stepProduct ? o2.stepProduct.name.toUpperCase() : '';
        }
        if (type === 'ORDER') {
          a = o1.orderName.toUpperCase();
          b = o2.orderName.toUpperCase();
        }
        if (type === 'BRAND') {
          a = o1.brandResponse ? o1.brandResponse.name.toUpperCase() : '';
          b = o2.brandResponse ? o2.brandResponse.name.toUpperCase() : '';
        }
        if (type === 'TIME') {
          a = o1.dueInHour;
          b = o2.dueInHour;
          return orderFlags[type] ? b - a : a - b;
        }
        return orderFlags[type] ? (a >= b ? 1 : -1) : (b >= a ? 1 : -1);
      });
      this.setState({
        [selectedTab]: data
      })
    }

    onClickTab = async (tab) => {
      await this.setState({
        selectedTab: tab
      })
      if (!(this.state[tab] && this.state[tab].length)) {
        this.getTasks()
      }
    }

    onRowClick = (item) => {
      this.setState({
        showTaskDetailsModal: true,
        selectedTaskId: item.id,
        selectedOrderId: item.orderId
      })
    }

    render() {
        let {myTaskCount, selectedTab, pagination, loading, orderFlags, showTaskDetailsModal, selectedTaskId, selectedOrderId} = this.state;
        const styles = { width: 260, display: 'block', marginBottom: 10 };
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
              text={LOADER_TEXT}>
              <section className="merchandiser-task-section">
                  <div className="main-task-heading">
                      <h2>My tasks</h2>
                  </div>
                  <div className="task-tab-section">
                      <div className="tabs">
                          <ul className="dashboard-tabs">
                            <TabHeader title="Start today" selectedTab={selectedTab} selfName="START_TODAY" onClick={this.onClickTab} value={myTaskCount.startTodayCount} onClick={this.onClickTab} />
                            <TabHeader title="Due soon" selectedTab={selectedTab} selfName="DUE_SOON" onClick={this.onClickTab} value={myTaskCount.dueSoonCount} onClick={this.onClickTab} />
                            <TabHeader title="Overdue" selectedTab={selectedTab} selfName="OVERDUE" onClick={this.onClickTab} value={myTaskCount.overdueCount} onClick={this.onClickTab} />
                            <TabHeader title="Completed" selectedTab={selectedTab} selfName="COMPLETE" onClick={this.onClickTab} onClick={this.onClickTab} />
                          </ul>
                      </div>


                      <div className="merchandiser-task-list">
                        <div className="row items-row heading-row align-items-center">
                            <div className="col-4 items-extra-padding">
                            {
                              !loading ?
                              <p>{this.state[selectedTab] ? this.state[selectedTab].length : '--'} <span className="bold-font">/ {pagination[selectedTab].totalElements} items</span></p>
                              : <></>
                            }
                            </div>
                            <TableTitleComponent classes="col-2 pr-0" orderFlags={orderFlags} title="Style" onClick={this.orderData} type="STYLE"/>
                            <TableTitleComponent classes="col-2 pl-0" orderFlags={orderFlags} title="Order title" onClick={this.orderData} type="ORDER"/>
                            <TableTitleComponent classes="col-2" orderFlags={orderFlags} title="Due in" onClick={this.orderData} type="TIME"/>
                            <TableTitleComponent classes="col-2" orderFlags={orderFlags} title="Brand" onClick={this.orderData} type="BRAND"/>
                        </div>
                        {
                          this.state[selectedTab] && this.state[selectedTab].map((item, i) => {
                            return <TabItem item={item} selectedTab={selectedTab} onRowClick={this.onRowClick}/>
                          })
                        }
                        {
                          this.state[selectedTab] && !this.state[selectedTab].length && !loading ?
                          <p className="no-task">No task found</p> : <></>
                        }
                      </div>

                  </div>
              </section>

              <Modal
                show={showTaskDetailsModal}
                onHide={() => this.setState({showTaskDetailsModal: false})}
                // dialogClassName="modal-90w"
                className="modal-right task-conversation"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <TaskManage id={selectedTaskId} orderId={selectedOrderId} closeModal={() => this.setState({showTaskDetailsModal: false})} callback={() => {}} />
              </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskDashboard);
