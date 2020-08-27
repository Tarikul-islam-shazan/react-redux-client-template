import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CloseButtonSuccess = ({ closeToast }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={require("../assets/images/success_cross.png")} style={{height: 10, width: 10}}/>
  </div>
);

const CloseButtonError = ({ closeToast }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={require("../assets/images/error_cross.png")} style={{height: 10, width: 10}}/>
  </div>
);

const CloseButtonWarning = ({ closeToast }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={require("../assets/images/warning_cross.png")} style={{height: 10, width: 10}}/>
  </div>
);

export const toastSuccess = (msg) => {
  const Foo = () => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src={require("../assets/images/success.png")} style={{height: 20, width: 27.6}} alt=""/>
      <div style={{flex: 1, marginLeft: 10, marginRight: 10}}>{msg}</div>
    </div>
    )
  toast.success(<Foo/>, {
  closeButton: <CloseButtonSuccess/>
});
};
export const toastError = (msg) => {
  const Foo = () => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src={require("../assets/images/error.png")} style={{height: 20, width: 20.24}} alt=""/>
      <div style={{flex: 1, marginLeft: 10, marginRight: 10}}>{msg}</div>
    </div>
    )
  toast.error(<Foo/>, {
  closeButton: <CloseButtonError/>
});
};
export const toastWarning = (msg) => {
  const Foo = () => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src={require("../assets/images/warning.png")} style={{height: 20, width: 25.4}} alt=""/>
      <div style={{flex: 1, marginLeft: 10, marginRight: 10}}>{msg}</div>
    </div>
    )
  toast.warning(<Foo/>, {
  closeButton: <CloseButtonWarning/>
})
};
