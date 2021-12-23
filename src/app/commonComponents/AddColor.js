import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Http from '../services/Http';
import {toastError, toastSuccess} from './Toast';

const AddColor = ({ isShowCollection, onCloseModal, callBack }) => {
    const [name, setName] = useState('');
    const [hexCode, setHexCode] = useState('');
    const [pantoneCode, setPantoneCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ nameError: '' });

    const renderErrorInfo = () => {
        setErrors({
            nameError: ''
        });
    };

    const onSubmit = async () => {
        if (name === '') {
            setErrors({ ...errors, nameError: 'Color name is required' });
            return;
        }

        setLoading(loading);
        await Http.POST('addColor', {
            name,
            hexCode,
            code: pantoneCode
        })
            .then(({ data }) => {
                setLoading(false);
                if (data.success) {
                    if (callBack) callBack(data,{
                        name,
                        hexCode,
                        code: pantoneCode
                    })
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

    return (
        <Modal show={isShowCollection} onHide={onCloseModal} centered>
            <div className="add-color-popup">
                <Modal.Header closeButton>
                    <h3 className="semibold-16">Add color</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="style-title">Color name</label>
                                <input
                                    type="text"
                                    name="style-title"
                                    id="style-title"
                                    placeholder="Color name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.nameError && <p className="error">{errors.nameError}</p>}
                            </div>
                            <div className="input-group size36">
                                <label htmlFor="style-title">Color code</label>
                                <div className="input-group-prepend color-box-input show">
                                    <input
                                        type="color"
                                        id="favcolor"
                                        name="favcolor"
                                        defaultValue="#A5DF5A"
                                        onChange={(e) => setHexCode(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pantone code"
                                    aria-label="Text input with dropdown button"
                                    onChange={(e) => setPantoneCode(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-0">
                    <div className="popup-footer">
                        <div className="buttons text-right">
                            <button className="button gray-outline size32" onClick={onCloseModal}>
                                Cancel
                            </button>
                            <button className="button size32 ml-2" onClick={onSubmit}>
                                Submit{' '}
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default AddColor;
