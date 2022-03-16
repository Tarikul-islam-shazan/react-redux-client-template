import React from "react";
import Modal from "react-bootstrap/Modal";
import { getFileType, getIconByFileType } from "../../../services/Util";

const MoreDesign = ({ toggleModal, openModal, imageList }) => {
    const renderImageList = () => {
        return imageList?.map((image, index) => {
            const fileType = getFileType(image);
            return fileType === "IMAGE" || fileType === "NO_FILE" ? (
                <a href={image} target="_blank">
                    <img src={image} alt="" key={`image_list_${index}`} />
                </a>
            ) : (
                <a href={image} target="_blank">
                    <img src={getIconByFileType(fileType)} alt="" key={`image_list_${index}`} />
                </a>
            );
        });
    };

    return (
        <Modal
            show={openModal}
            aria-labelledby="example-custom-modal-timeline"
            onHide={toggleModal}
            size="lg"
            className="more-design-popup"
        >
            <Modal.Body>
                <div>
                    <div className="common-popup">
                        <div className="common-popup-header d-flex justify-content-between">
                            <div className="popup-tilte">
                                <h3 className="semibold-16 mb-0">All designs</h3>
                            </div>
                            <div className="close-btn" onClick={toggleModal}>
                                <img src="/icons/close.svg" alt="close" />
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
    );
};

export default MoreDesign;
