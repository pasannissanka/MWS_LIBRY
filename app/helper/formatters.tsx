const emailFormatevalidate = (email: string): boolean => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return reg.test(email);
};

function validatePassword(password: string): boolean {
  //Check if the password contains more or equal 8 characters
  if (password.length < 8) {
    return false;
  }
  // Check if the password contains at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least 1 number
  if (!/\d/.test(password)) {
    return false;
  }

  // Check if the password contains at least 1 special character
  if (!/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
    return false;
  }

  // All criteria passed, password is valid
  return true;
}
function validateUsername(username: string): boolean {
  //Check if the username is not empty
  if (username.length > 0) {
    return true;
  } else {
    //Else, username is invalid
    return false;
  }
}
export {emailFormatevalidate, validatePassword, validateUsername};
