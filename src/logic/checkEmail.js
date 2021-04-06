/* eslint-disable import/prefer-default-export */
export const validateEmail = inputText => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputText.match(mailformat)) {
    return true;
  }

  return false;
};
/* eslint-enable import/prefer-default-export */
