/* eslint-disable import/prefer-default-export */
export const imgCheck = image => {
  if (/\.(jpe?g|png|gif)$/i.test(image)) {
    return true;
  }
  return false;
};
/* eslint-enable import/prefer-default-export */
