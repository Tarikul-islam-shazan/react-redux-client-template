import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {_storeData} from './actions';
import {NotificationListItem} from './NotificationListItem';
import {CreateSkeletons, NotificationSkeleton} from '../commonComponents/ProductSkeleton';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../services/Http';
import {toastError} from '../commonComponents/Toast';
import {
    LOADER_COLOR,
    LOADER_MARGIN_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_OVERLAY_BACKGROUND,
    LOADER_POSITION,
    LOADER_TEXT,
    LOADER_WIDTH
} from '../constant';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notifications: {},
            category: ''
        };
    }

    componentDidUpdate = (prevProps, PrevState) => {
        if (prevProps.notifications != this.props.notifications) {
            // this.props.setActiveTab(window.location.pathname)
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.notifications !== prevState.notifications) {
            return {
                notifications: nextProps.notifications
            };
            // return {
            //   derivedData: computeDerivedState(nextProps),
            //   someMirroredValue: nextProps.someValue
            // };
        }

        // Return null to indicate no change to state.
        return null;
    }

    componentDidMount = () => {
        // loadjs(['/js/script.js','/js/custom.js']);
        if (!this.props.dataLoadedOnce) {
            this.fetchNotification(0);
        } else {
            this.setState({
                notifications: this.props.notifications
            });
        }
        if (this.props.fromRoute) {
            window.addEventListener('scroll', this.handleScroll);
        }
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    onScrollToEnd = () => {
        const wrappedElement = document.getElementById('notification-panel');
        if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
            let { hasNext, page } = this.props;
            let { loading } = this.state;
            if (hasNext && !loading) {
                this.fetchNotification(page + 1);
            } else {
                if (!hasNext) {
                    // toastWarning("No more notification found.")
                }
            }
        }
    };

    handleScroll = () => {
        const windowHeight =
            'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            let { hasNext, page } = this.props;
            let { loading } = this.state;
            if (hasNext && !loading) {
                this.fetchNotification(page + 1);
            } else {
                if (!hasNext) {
                }
            }
        } else {
        }
    };

    fetchNotification = async (page = 0, merge = true) => {
        let { size, sort, notifications } = this.props;
        let { category } = this.state;
        let params = {
            page,
            size,
            sort,
            notificationCategory: category
        };
        await this.setState({
            loading: true
        });
        let result = [];
        let currentPage;
        let totalPage;
        await Http.GET('getNotifications', params)
            .then(({ data }) => {
                if (data && data.data.length !== 0) {
                    result = data.data;
                    currentPage = data.currentPage;
                    totalPage = data.totalPages;
                }
                this.setState({
                    loading: false
                });
            })
            .catch(({ response }) => {
                this.setState({
                    loading: false
                });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError('Something went wrong! Please try again.');
                }
            });

        if(merge){
            notifications = [...notifications, ...result];
        }else{
            notifications = [...result];
        }

        await this.props._storeData('dataLoadedOnce', true);
        await this.props._storeData('hasNext', currentPage < totalPage);
        await this.props._storeData('notifications', notifications);
        await this.setState({
            notifications
        });
        if (result.length) {
            await this.props._storeData('page', page);
        }
    };

    markRead = async (id, isSeen) => {
        this.setState({ loading: true });
        let { notifications } = this.props;
        if (isSeen) {
            await Http.POST('markNotificationUnread', {}, id)
                .then(({ data }) => {
                    this.setState({
                        loading: false
                    });
                    notifications = notifications.map((notification) => {
                        if (notification.id === id) {
                            notification.isSeen = false;
                        }
                        return notification;
                    });
                    this.props._storeData('notifications', notifications);
                    if (this.props.unseenCount) {
                        this.props._storeData('unseenCount', parseInt(this.props.unseenCount) + 1);
                    }
                })
                .catch(({ response }) => {
                    this.setState({
                        loading: false
                    });
                    if (response && response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError('Something went wrong! Please try again.');
                    }
                });
        } else {
            await Http.POST('markNotificationRead', {}, id)
                .then(({ data }) => {
                    this.setState({
                        loading: false
                    });
                    notifications = notifications.map((notification) => {
                        if (notification.id === id) {
                            notification.isSeen = true;
                        }
                        return notification;
                    });
                    this.props._storeData('notifications', notifications);
                    if (this.props.unseenCount) {
                        this.props._storeData('unseenCount', parseInt(this.props.unseenCount) - 1);
                    }
                })
                .catch(({ response }) => {
                    this.setState({
                        loading: false
                    });
                    if (response && response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError('Something went wrong! Please try again.');
                    }
                });
        }
    };

    onChangeFilter = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                this.fetchNotification(0, false);
            }
        );
    };

    seeAll = () => {
        window.open('/notifications/all', '_blank');
    };

    render() {
        let { notifications } = this.props;
        return (
            <LoadingOverlay
                active={this.state.loading && this.props.fromRoute}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: LOADER_OVERLAY_BACKGROUND
                    }),
                    spinner: (base) => ({
                        ...base,
                        width: LOADER_WIDTH,
                        position: LOADER_POSITION,
                        top: '50%',
                        left: '50%',
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
                text={LOADER_TEXT}
            >
                {this.props.fromRoute ? (
                    <section class="all-notifications">
                        <div className="notification-section custom-scrollbar" id="notification-panel">
                            <div className="notification-header d-flex align-items-center justify-content-between">
                                <div className="left-heading">
                                    <h3>
                                        Notifications{' '}
                                        <span className="count-notification">({this.props.unseenCount})</span>
                                    </h3>
                                </div>
                                <div class="notification-filter">
                                    <select name="category" id="notification" onChange={this.onChangeFilter}>
                                        <option value="">All</option>
                                        <option value="COLLECTION">Collection</option>
                                        <option value="INVOICE">Invoice</option>
                                        <option value="ORDER">Order</option>
                                        <option value="POST">Comment</option>
                                        <option value="PRODUCT">Designs</option>
                                        <option value="RFQ">Quote</option>
                                        <option value="STEP">Task</option>
                                    </select>
                                </div>
                            </div>
                            <div className="all-single-items">
                                {notifications.map((notification, i) => {
                                    return (
                                        <NotificationListItem
                                            item={notification}
                                            key={i}
                                            markRead={this.markRead}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ) : (
                    <div
                        className="notification notification-section custom-scrollbar"
                        id="notification-panel"
                        onScroll={this.onScrollToEnd}
                    >
                        <div className="notification-header d-flex align-items-center justify-content-between">
                            <div className="left-heading">
                                <h3>
                                    Notifications{' '}
                                    <span className="count-notification">
										({this.props.unseenCount > 99 ? `99+` : this.props.unseenCount})
									</span>
                                </h3>
                            </div>
                            <div className="see-all">
                                <button onClick={this.seeAll}>See all</button>
                            </div>
                        </div>
                        <div className="all-single-items" onScroll={this.onScrollToEnd}>
                            {notifications.map((notification, i) => {
                                return (
                                    <NotificationListItem
                                        item={notification}
                                        key={i}
                                        markRead={this.markRead}
                                    />
                                );
                            })}
                            {this.state.loading ? (
                                <CreateSkeletons iterations={5}>
                                    <NotificationSkeleton />
                                </CreateSkeletons>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                )}
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (store) => ({
    notifications: store.notification.notifications,
    dataLoadedOnce: store.notification.dataLoadedOnce,
    page: store.notification.page,
    size: store.notification.size,
    sort: store.notification.sort,
    hasNext: store.notification.hasNext,
    unseenCount: store.notification.unseenCount
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            _storeData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
