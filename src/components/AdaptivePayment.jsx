import React from 'react';
import PropTypes from 'prop-types';
import BackdropPaymentComponent from './BackdropPaymentComponent';
import ModalPaymentComponent from './ModalPaymentComponent';

function AdaptivePayment({ open, onClose, isDesktop, productInfo }) {
  return (
    <>
      {!isDesktop
        ? <BackdropPaymentComponent open={open} onClose={onClose} productInfo={productInfo} />
        : <ModalPaymentComponent open={open} onClose={onClose} productInfo={productInfo} />
      }
    </>
  );
}

AdaptivePayment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  productInfo: PropTypes.object.isRequired,
};

export default AdaptivePayment;
