import { useState, useCallback } from 'react';
import { validateEmail, validatePassword, validateAge, ERROR_MESSAGES, FORM_FIELDS } from '../data';

export const useFormValidation = (validationRules = {}) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback(
    (name, value, allFormData = {}) => {
      let error = '';

      if (validationRules.required && validationRules.required.includes(name) && !value) {
        error = ERROR_MESSAGES.REQUIRED_FIELD(name);
      } else if (name === 'email' && value && !validateEmail(value)) {
        error = ERROR_MESSAGES.INVALID_EMAIL;
      } else if (name === 'password' && value) {
        const passwordError = validatePassword(value);
        if (passwordError) error = passwordError;
      } else if (name === 'confirmPassword' && value && allFormData.password) {
        if (value !== allFormData.password) {
          error = ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
        }
      } else if (name === 'dateOfBirth' && value && !validateAge(value)) {
        error = ERROR_MESSAGES.UNDERAGE;
      }

      return error;
    },
    [validationRules],
  );

  const setFieldError = useCallback((fieldName, error) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  }, []);

  const validateSingleField = useCallback(
    (name, value, allFormData = {}) => {
      const error = validateField(name, value, allFormData);
      setFieldError(name, error);
      return !error;
    },
    [validateField, setFieldError],
  );

  const validateAllFields = useCallback(
    (formData) => {
      const newErrors = {};
      let isValid = true;

      if (validationRules.required) {
        validationRules.required.forEach((field) => {
          const error = validateField(field, formData[field], formData);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        });
      }

      Object.keys(formData).forEach((field) => {
        if (!validationRules.required || !validationRules.required.includes(field)) {
          const error = validateField(field, formData[field], formData);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        }
      });

      setErrors(newErrors);
      return { isValid, errors: newErrors };
    },
    [validateField, validationRules],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return {
    errors,
    validateSingleField,
    validateAllFields,
    setFieldError,
    clearFieldError,
    clearErrors,
    hasErrors,
  };
};
