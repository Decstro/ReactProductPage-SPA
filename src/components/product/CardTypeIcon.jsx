import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// Images for card types
import visaSvg from '../../assets/cards/visa.svg';
import mastercardSvg from '../../assets/cards/mastercard.svg';
import amexSvg from '../../assets/cards/amex.svg';
import discoverSvg from '../../assets/cards/discover.svg';
import dinersSvg from '../../assets/cards/diners.svg';
import jcbSvg from '../../assets/cards/jcb.svg';
import unionpaySvg from '../../assets/cards/unionpay.svg';
import maestroSvg from '../../assets/cards/maestro.svg';
import mirSvg from '../../assets/cards/mir.svg';
import eloSvg from '../../assets/cards/elo.svg';
import hiperSvg from '../../assets/cards/hiper.svg';
import hipercardSvg from '../../assets/cards/hipercard.svg';


const CardTypeIcon = ({ type }) => {
  // Card type configuration with image paths
  const typeMap = {
    'visa': {
      display: 'VISA',
      pattern: /^4/,
      image: visaSvg
    },
    'mastercard': {
      display: 'MC',
      pattern: /^5[1-5]/,
      image: mastercardSvg
    },
    'american-express': {
      display: 'AMEX',
      pattern: /^3[47]/,
      image: amexSvg
    },
    'discover': {
      display: 'DISCOVER',
      pattern: /^(6011|65|64[4-9]|622)/,
      image: discoverSvg
    },
    'diners-club': {
      display: 'DINERS',
      pattern: /^(36|38|30[0-5])/,
      image: dinersSvg
    },
    'jcb': {
      display: 'JCB',
      pattern: /^35/,
      image: jcbSvg
    },
    'unionpay': {
      display: 'UNIONPAY',
      pattern: /^62/,
      image: unionpaySvg
    },
    'maestro': {
      display: 'MAESTRO',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      image: maestroSvg
    },
    'mir': {
      display: 'MIR',
      pattern: /^220[0-4]/,
      image: mirSvg
    },
    'elo': {
      display: 'ELO',
      // eslint-disable-next-line max-len
      pattern: /^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368|(506699|5067[0-6]\d|50677[0-8]|50679[7-9]|65003[1-3]|65003[5-9]|65004\d|65005[0-1]|65040[5-9]|65048[5-9]|65049\d|6505\d|6507[0-4]|6507[6-9]|6508\d|6509\d|65165[2-9]|6516[6-7]\d|65168\d|65169[0-1]|6517[0-1]\d|6517[2-8]\d|6519[0-1]\d|6519[2-9]\d|655000|65501\d|65502\d|655021|65505[0-5]|6555\d))/,
      image: eloSvg
    },
    'hiper': {
      display: 'HIPER',
      pattern: /^(637095|63737423|63743358|637568|637599|637609|637612)/,
      image: hiperSvg
    },
    'hipercard': {
      display: 'HIPERCARD',
      pattern: /^(606282)/,
      image: hipercardSvg
    }
  };

  if (!type || !typeMap[type]) return null;

  return (
    <>
      {typeMap[type].image ? (
        <Box
          component="img"
          src={typeMap[type].image}
          alt={typeMap[type].display}
          sx={{
            width: 40,
            height: 25,
            objectFit: 'contain'
          }}
        />
      ) : (
        <Box
          component="span"
          sx={{
            px: 1,
            py: 0.5,
            bgcolor: 'grey.100',
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          {typeMap[type].display}
        </Box>
      )}
    </>
  );
};

CardTypeIcon.propTypes = {
  type: PropTypes.string
};

export default CardTypeIcon;
