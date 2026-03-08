export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{11}$/;
  return phoneRegex.test(phone);
};

export const validateCNIC = (cnic) => {
  const cnicRegex = /^[0-9]{13}$/;
  return cnicRegex.test(cnic);
};

export const validateForm = (fields) => {
  const errors = {};
  
  if (fields.email && !validateEmail(fields.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (fields.password && !validatePassword(fields.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  if (fields.phone && !validatePhoneNumber(fields.phone)) {
    errors.phone = 'Please enter a valid 11-digit phone number';
  }
  
  if (fields.cnic && !validateCNIC(fields.cnic)) {
    errors.cnic = 'Please enter a valid 13-digit CNIC number';
  }
  
  return errors;
};