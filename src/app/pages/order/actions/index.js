export const validate = (state, projectId) => {
  let {
    sameAsBilling, billingName, billingAddress, billingState, billingCity, billingPostCode, billingPhoneNumber,
    shippingName, shippingAddress, shippingState, shippingCity, shippingPostCode, shippingPhoneNumber, paymentMethod, bankSlipDoc
  } = state;
  let errors = {};
  let reqBody = [];
  let isValid = true;
  if (!billingName) {
    errors.billingNameError = 'Name is required.';
    isValid = false;
  } else {
    errors.billingNameError = '';
  }
  if (!billingAddress) {
    errors.billingAddressError = 'Address is required.';
    isValid = false;
  } else {
    errors.billingAddressError = '';
  }
  if (!billingState) {
    errors.billingStateError = 'State is required.';
    isValid = false;
  } else {
    errors.billingStateError = '';
  }
  if (!billingCity) {
    errors.billingCityError = 'City is required.';
    isValid = false;
  } else {
    errors.billingCityError = '';
  }
  if (!billingPostCode) {
    errors.billingPostCodeError = 'Post code is required.';
    isValid = false;
  } else {
    errors.billingPostCodeError = '';
  }
  if (!billingPhoneNumber) {
    errors.billingPhoneNumberError = 'Phone number is required.';
    isValid = false;
  } else {
    errors.billingPhoneNumberError = '';
  }
  if (!shippingName) {
    errors.shippingNameError = 'Name is required.';
    isValid = false;
  } else {
    errors.shippingNameError = '';
  }
  if (!shippingAddress) {
    errors.shippingAddressError = 'Address is required.';
    isValid = false;
  } else {
    errors.shippingAddressError = '';
  }
  if (!shippingState) {
    errors.shippingStateError = 'State is required.';
    isValid = false;
  } else {
    errors.shippingStateError = '';
  }
  if (!shippingCity) {
    errors.shippingCityError = 'City is required.';
    isValid = false;
  } else {
    errors.shippingCityError = '';
  }
  if (!shippingPostCode) {
    errors.shippingPostCodeError = 'Post code is required.';
    isValid = false;
  } else {
    errors.shippingPostCodeError = '';
  }
  if (!shippingPhoneNumber) {
    errors.shippingPhoneNumberError = 'Phone number is required.';
    isValid = false;
  } else {
    errors.shippingPhoneNumberError = '';
  }
  if (!paymentMethod) {
    errors.paymentMethodError = 'Payment method is required.';
    isValid = false;
  } else {
    errors.paymentMethodError = '';
    if (paymentMethod === 'BANK_SLIP' && !bankSlipDoc.name) {
      isValid = false;
      errors.bankSlipDocError = 'File is required';
    } else {
      errors.bankSlipDocError = '';
    }
  }

  if (isValid) {
    reqBody = {
      projectId,
      invoiceId: state.order.invoiceResponse.id,
      addresses: [
        {
          addressType: 'BILLING',
          address: {
            fullname: billingName,
            address: billingAddress,
            stateOrProvince: billingState,
            city: billingCity,
            postCode: billingPostCode,
            phoneNo: billingPhoneNumber
          }
        },
        {
          addressType: 'SHIPPING',
          address: {
            fullname: shippingName,
            address: shippingAddress,
            stateOrProvince: shippingState,
            city: shippingCity,
            postCode: shippingPostCode,
            phoneNo: shippingPhoneNumber
          }
        }
      ]
    };
  }

  return {
    isValid,
    errors,
    reqBody
  }
}
