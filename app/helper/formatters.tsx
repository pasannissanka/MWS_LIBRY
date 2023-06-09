const emailFormatevalidate = (email: string): boolean => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return reg.test(email);
};

export {emailFormatevalidate};
