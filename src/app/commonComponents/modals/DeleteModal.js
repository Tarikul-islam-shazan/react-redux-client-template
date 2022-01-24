import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ onRemove, onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Body>
                <h5>Are you sure?</h5>
            </Modal.Body>
            <Modal.Footer>
                <button className="button gray-outline size32" onClick={onClose}>
                    Cancel
                </button>
                <button className="button tertiary size32" onClick={onRemove}>
                    Confirm
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
