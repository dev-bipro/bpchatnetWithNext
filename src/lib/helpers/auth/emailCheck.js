export default (email = "") => {
  console.log(email);
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailFormat.test(email)) {
    return false;
  }
  return true;
};
