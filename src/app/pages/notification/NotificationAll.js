import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoadingOverlay from 'react-loading-overlay';

import {
    LOADER_COLOR,
    LOADER_LEFT,
    LOADER_MARGIN_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_OVERLAY_BACKGROUND,
    LOADER_POSITION,
    LOADER_TEXT,
    LOADER_TOP,
    LOADER_WIDTH
} from '../../constant';

import Notification from '../../partials/Notification';

class NotificationAll extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
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
				text={LOADER_TEXT}
			>
				<Notification fromRoute={true} />
			</LoadingOverlay>
		);
	}
}

const mapStateToProps = (store) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationAll);
