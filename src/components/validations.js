import Joi from 'joi';

// Simple required-only schema
export const paymentSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': 'Email is required'
  }),
  cardNumber: Joi.string().required().messages({
    'string.empty': 'Card number is required'
  }),
  expiry: Joi.string().required().messages({
    'string.empty': 'Expiry date is required'
  }),
  cvv: Joi.string().required().messages({
    'string.empty': 'CVV is required'
  }),
  nameOnCard: Joi.string().required().messages({
    'string.empty': 'Name on card is required'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Billing address is required'
  })
});

// Validation function
export const validatePaymentForm = (formData) => {
  const { error } = paymentSchema.validate(formData, {
    abortEarly: false,
    allowUnknown: true
  });

  if (!error) return { isValid: true, errors: {} };

  const errors = {};
  error.details.forEach((err) => {
    errors[err.path[0]] = err.message;
  });

  return { isValid: false, errors };
};
