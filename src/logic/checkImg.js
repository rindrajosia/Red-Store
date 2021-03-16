export const imgCheck = image => {
  if ( /\.(jpe?g|png|gif)$/i.test(image)) {
    return true
  }else{
    return false
  }
}
