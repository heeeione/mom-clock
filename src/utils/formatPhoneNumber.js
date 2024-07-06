const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  if (cleaned.startsWith('010') && cleaned.length === 11) {
    return '+82' + cleaned.substring(1);
  }
  throw new Error('Invalid phone number format');
};

module.exports = formatPhoneNumber;
