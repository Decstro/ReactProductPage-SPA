import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../redux/transaction/transactionSlice';
import { number } from 'card-validator';
import { validatePaymentForm } from './validations.js';

import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
  Divider,
  IconButton,
  FormHelperText,
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CardTypeIcon from './CardTypeIcon.jsx';

const PaymentForm = () => {
  const dispatch = useDispatch();
  const [cardType, setCardType] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    address: '',
    country: 'US',
  });

  const [errors, setErrors] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    address: '',
  });

  const handleCardChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, cardNumber: value }));
    // Only detect card type
    const validation = number(value);
    setCardType(validation.card?.type || null);
  };

  const formatCardNumber = (value) => {
    const sanitized = value.replace(/\D/g, '');
    const parts = [];

    for (let i = 0; i < sanitized.length; i += 4) {
      parts.push(sanitized.substring(i, i + 4));
    }

    return parts.join(' ').substring(0, 19);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validatePaymentForm(formData);
    setErrors(validationErrors);

    if (!isValid) {
      // Focus first error field
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    dispatch(updateTransaction({
      payment: {
        method: 'card',
        cardType,
        last4: formData.cardNumber.slice(-4), // Security best practice
        expiry: formData.expiry
      },
      shipping: {
        address: formData.address,
        country: formData.country,
        email: formData.email
      },
    }));
  };


  return (
    <Box
      component="form"
      autoComplete="on"
      sx={{ width: '100%' }}
      onSubmit={handleSubmit}
    >
      {/* Email Field */}
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        sx={{
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px rgb(255, 255, 255) inset !important',
            WebkitTextFillColor: '#050505 !important',
            caretColor: '#050505',
            borderRadius: 'inherit'
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          mt: 3
        }}
      >
        <Divider sx={{  flex: 1, height: 1, backgroundColor: 'rgb(145, 192, 145)' }} />

        <Typography
          variant="body2"
          sx={{
            mx: 2,
            fontSize: '17px',
            color: 'rgb(122, 183, 122)',
            fontWeight: 700,
          }}
        >
          Card Information
        </Typography>
        <Divider sx={{  flex: 1, height: 1, backgroundColor: 'rgb(145, 192, 145)' }} />
      </Box>

      {/* Card Number Field */}
      <TextField
        fullWidth
        label="Card number"
        name="cardNumber"
        value={formatCardNumber(formData.cardNumber)}
        onChange={handleCardChange}
        margin="normal"
        error={!!errors.card}
        helperText={errors.card}
        slotProps={{
          input: {
            endAdornment: cardType && (
              <InputAdornment position="end">
                <CardTypeIcon type={cardType} />
              </InputAdornment>
            ),
          },
          htmlInput: {
            maxLength: 19,
            inputMode: 'numeric',
            pattern: '[0-9\\s]{13,19}',
            autoComplete: 'cc-number'
          }
        }}
      />

      <Box display="flex" gap={2} mt={2}>
        {/* Expiry Date Field */}
        <TextField
          fullWidth
          label="MM/YY"
          name="expiry"
          value={formData.expiry}
          onChange={(e) => {
            // Get the raw input value
            const inputVal = e.target.value.replace(/\D/g, '');

            // Format the value
            let formattedValue = '';
            if (inputVal.length > 0) {
              // Handle month part (first 2 digits)
              const month = inputVal.substring(0, 2);
              // Ensure month is between 01-12
              if (month.length === 1) {
                formattedValue = month;
              } else if (parseInt(month) > 12) {
                formattedValue = '12';
              } else if (month === '00') {
                formattedValue = '01';
              } else {
                formattedValue = month;
              }

              // Add year part if available
              if (inputVal.length > 2) {
                formattedValue += `/${inputVal.substring(2, 4)}`;
              }
            }

            setFormData(prev => ({ ...prev, expiry: formattedValue }));
          }}
          error={!!errors.expiry}
          helperText={errors.expiry}
          autoComplete="cc-exp"
          placeholder="MM/YY"
          slotProps={{
            htmlInput: {
              maxLength: 5
            }
          }}
          onKeyDown={(e) => {
            // Add slash automatically when typing
            if (e.key !== 'Backspace' && e.key !== 'Delete' &&
                formData.expiry.length === 2 && !formData.expiry.includes('/')) {
              setFormData(prev => ({ ...prev, expiry: `${prev.expiry}/` }));
            }
          }}
        />

        {/* CVV Field */}
        <TextField
          fullWidth
          label="CVV"
          name="cvv"
          type="password"
          autoComplete="cc-csc"
          value={formData.cvv}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" edge="end">
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />

      </Box>

      {/* Name on Card */}
      <TextField
        fullWidth
        label="Name on card"
        name="nameOnCard"
        autoComplete="cc-name"
        value={formData.nameOnCard}
        onChange={handleChange}
        margin="normal"
        error={!!errors.nameOnCard}
        helperText={errors.nameOnCard}
      />


      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          mt: 3
        }}
      >
        <Divider sx={{  flex: 1, height: 1, backgroundColor: 'rgb(145, 192, 145)' }} />
        <Typography
          variant="body2"
          sx={{
            mx: 2,
            fontSize: '17px',
            color: 'rgb(122, 183, 122)',
            fontWeight: 700,
          }}
        >
          Delivery Information
        </Typography>
        <Divider sx={{  flex: 1, height: 1, backgroundColor: 'rgb(145, 192, 145)' }} />
      </Box>

      <TextField
        fullWidth
        label="Billing Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
        autoComplete="street-address"
        error={!!errors.address}
        helperText={errors.address}
        sx={{
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px rgb(255, 255, 255) inset !important',
            WebkitTextFillColor: '#050505 !important',
            caretColor: '#050505',
            borderRadius: 'inherit'
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <HomeIcon color="action" />
              </InputAdornment>
            ),
          }
        }}
      />


      {/* Country Selector */}
      <TextField
        select
        fullWidth
        label="Country or Region"
        name="country"
        value={formData.country}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="CO">Colombia</MenuItem>
        <MenuItem value="ES">Spain</MenuItem>
        <MenuItem value="FR">France</MenuItem>
        <MenuItem value="DE">Germany</MenuItem>
        <MenuItem value="US">United States</MenuItem>
        <MenuItem value="CA">Canada</MenuItem>
        <MenuItem value="GB">United Kingdom</MenuItem>
      </TextField>

      <Divider sx={{ my: 3 }} />

      {/* Buy Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        sx={{
          borderRadius: 4,
          py: 1.5,
          backgroundColor: 'rgb(16, 124, 16)',
          '&:hover': { backgroundColor: 'rgb(13, 100, 13)' }
        }}
      >
        <strong>
          Continue
        </strong>
      </Button>
    </Box>
  );
};

export default PaymentForm;
