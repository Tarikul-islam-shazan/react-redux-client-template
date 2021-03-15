import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SketchPicker } from 'react-color';
import Modal from 'react-bootstrap/Modal';

const ColorRowWithPicker = ({item, setPickerRef, index, data, onChangeColor, remove}) => {

    let showColorPickerModal = item.showColorPickerModal ? item.showColorPickerModal : false;

    const handleChangeComplete = (color) => {
      let e = {
        target: {
          name: 'hexCode',
          value: color.hex
        }
      }
      onChange(e)
    }

    const onChange = (e) => {
      let temp = [...data];
      temp[index][e.target.name] = e.target.value;
      onChangeColor({
        target: {
          name: 'colors',
          value: temp
        }
      })
    }

    return (
      <>
        <tr>
            <td>
                <div className="pick-color">
                    {
                      showColorPickerModal ?
                      <div className="color-picker-popup" ref={setPickerRef}>
                        <SketchPicker
                          color={item.hexCode}
                          onChangeComplete={handleChangeComplete}/>
                      </div> : <></>
                    }

                    <span style={{background: item.hexCode ? item.hexCode : '#fff'}} onClick={() => onChange({target: {name: 'showColorPickerModal', value: !showColorPickerModal}})}></span>
                    <input type="text" placeholder="Pick color" name="hexCode" onChange={onChange} value={item.hexCode} className={`bg-gray-light border-0 ${item.hexCodeError ? `error2` : ``}`}/>
                </div>
                {
                  item.hexCodeError ? <label className="error">{item.hexCodeError}</label> : <label className="error"></label>
                }
            </td>
            <td>
                <input type="text" placeholder="Enter color name" name="name" onChange={onChange} value={item.name} className={`bg-gray-light pick-color ${item.nameError ? `error2` : ``}`}/>
                {
                  item.nameError ? <label className="error">{item.nameError}</label> : <label className="error"></label>
                }
            </td>
            <td align="right">
                <div className="dlt cursor-pointer" onClick={() => remove(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <g id="Group_11117" data-name="Group 11117" transform="translate(-396 -260)">
                          <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(428 260) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                          <g id="delete" transform="translate(405.358 267.001)">
                            <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                            <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                            <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                            <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                          </g>
                        </g>
                      </svg>
                </div>
                <label className="error"></label>
            </td>
        </tr>

        {/*<Modal
          show={showColorPickerModal}
          onHide={() => this.setState({showColorPickerModal: false})}
        >
          <Modal.Body className="p-0">
            <SketchPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }/>
          </Modal.Body>
        </Modal>*/}
      </>
    );
}

const mapStateToProps = store => {
  return {
		product: store.product
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(ColorRowWithPicker);
