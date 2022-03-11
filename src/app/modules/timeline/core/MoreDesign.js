import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {addImageSuffix, authUserInfo} from "../../../services/Util";
import {SelectedFileViewComponent} from "../../../pages/task/components/TaskManageComponents/SelectedFileViewComponent";
import Http from "../../../services/Http";
import {toastError, toastSuccess} from "../../../commonComponents/Toast";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const MoreDesign = ({toggleModal, openModal, setLoader, imageList}) => {

    const renderImageList = () => {
        return imageList?.map((image, index) => {
            return <img src={image} alt="" key={`image_list_${index}`}/>
        })
    }

    return (
        <Modal
            show={openModal}
            aria-labelledby="example-custom-modal-timeline"
            onHide={toggleModal}
            centered
        >
            <Modal.Body>
                <div className="popup-wrapper">
                    <div className="common-popup">
                        <div className="common-popup-header d-flex justify-content-between">
                            <div className="popup-tilte">
                                <h3 className="semibold-16 mb-0">All designs</h3>
                            </div>
                            <div className="close-btn" onClick={toggleModal}>
                                <img src="/icons/close.svg" alt="close"/>
                            </div>
                        </div>
                        <div className="common-popup-body">
                            <div className="more-designs-popup">
                                <div className="designs-grid scroll-y-label">
                                    {renderImageList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default MoreDesign