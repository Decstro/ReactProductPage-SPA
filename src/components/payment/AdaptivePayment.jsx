import React from 'react';

import PropTypes from 'prop-types';
import BackdropPaymentComponent from './BackdropPaymentComponent';
import ModalPaymentComponent from './ModalPaymentComponent';

function AdaptivePayment({ open, onClose, isDesktop }) {

  return (
    <>
      {!isDesktop
        ? <BackdropPaymentComponent open={open} onClose={onClose} />
        : <ModalPaymentComponent open={open} onClose={onClose} />
      }
    </>
  );
}

AdaptivePayment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

export default AdaptivePayment;
