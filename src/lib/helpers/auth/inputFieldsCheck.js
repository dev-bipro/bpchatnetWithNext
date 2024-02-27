export const regInputsCheck = (name = "", email = "", password = "") => {
  let inputErrors = null;
  if (!name && !email && !password) {
    inputErrors = {
      name: "please enter your name",
      email: "please enter your email",
      password: "please enter your password",
    };
  } else {
    if (!name && !email) {
      inputErrors = {
        name: "please enter your name",
        email: "please enter your email",
      };
    } else if (!name && !password) {
      inputErrors = {
        name: "please enter your name",
        password: "please enter your password",
      };
    } else if (!email && !password) {
      inputErrors = {
        email: "please enter your email",
        password: "please enter your password",
      };
    } else {
      if (!name) {
        inputErrors = {
          name: "please enter your name",
        };
      } else if (!email) {
        inputErrors = {
          email: "please enter your email",
        };
      } else if (!password) {
        inputErrors = {
          password: "please enter your password",
        };
      }
    }
  }
  return inputErrors;
};

export const loginInputsCheck = (email = "", password = "") => {
  let inputErrors = null;

  if (!email && !password) {
    inputErrors = {
      email: "please enter your email",
      password: "please enter your password",
    };
  } else {
    if (!email) {
      inputErrors = {
        email: "please enter your email",
      };
    } else if (!password) {
      inputErrors = {
        password: "please enter your password",
      };
    }
  }
  return inputErrors;
};
export const forgetInputsCheck = (email = "") => {
  let inputErrors = null;

  if (!email) {
    inputErrors = {
      email: "please enter your email",
    };
  }
  return inputErrors;
};
