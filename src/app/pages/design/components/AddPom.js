import React, {useState} from 'react';
import {toastError, toastSuccess} from '../../../commonComponents/Toast';
import Http from '../../../services/Http';
import Modal from 'react-bootstrap/Modal';

const AddPom = ({ onCloseModal }) => {
    const [pomName, setPomName] = useState('');
    const [pomImage, setPomImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const renderErrorInfo = () => {
        setErrors({
            pomError: '',
            documentIdError: ''
        });
    };

    const onSubmit = async () => {
        if (pomName === '') {
            setErrors({ ...errors, pomError: 'Points name is required' });
            return;
        }

        const body = {
            documentDTO: pomImage,
            name: pomName
        };

        setLoading(loading);

        await Http.POST('addNewPom', body)
            .then(({ data }) => {
                setLoading(false);
                if (data.success) {
                    toastSuccess(data.message);
                    onCloseModal();
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
                setLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError('Something went wrong! Please try again.');
                }
            });
        renderErrorInfo();
    };

    const onUploadImage = (image) => {
        setPomImage(image);
    };

    return (
        <Modal show={true} onHide={onCloseModal} centered size="lg">
            <div className="add-new-popup new-fabric-popup">
                <Modal.Header closeButton>
                    <h3 className="semibold-16">Add new points</h3>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <div className="popup-body">
                            <div className="popup-body-content">
                                <div className="container-fluid px-0">
                                    <div className="row">
                                        <div className="col-md-12 pl-3">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="style-title">Points name</label>
                                                        <input
                                                            type="text"
                                                            name="style-title"
                                                            id="style-title"
                                                            onChange={(e) => setPomName(e.target.value)}
                                                        />
                                                        {errors.pomError && (
                                                            <p className="error">{errors.pomError}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <div className="popup-footer">
                        <div className="buttons text-right">
                            <button className="button gray-outline size32 mr-2" onClick={onCloseModal}>
                                Cancel
                            </button>
                            <button className="button size32" onClick={onSubmit}>
                                Submit{' '}
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default AddPom;
