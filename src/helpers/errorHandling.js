const ERROR_MAPPING = {
  ACCOUNT_SUSPENDED: {
    msg: "Account has been temporarily suspended",
    forceLogout: true,
  },
  ACCOUNT_DELETED: { msg: "Account deleted", forceLogout: true },
  CREDENTIALS_REVOKED: {
    msg: "Credentials revoked. Login again.",
    forceLogout: true,
  },
  EMAIL_REQUIRED: { msg: "Email is required" }, // submitting email from forgot password
  USERNAME_AND_PASSWORD_REQUIRED: {
    // login
    msg: "Username & Password are required",
  },
  USER_NOT_FOUND: { msg: "User not found" }, // login
  UNAUTHORIZED: { msg: "Unauthorized", forceLogout: true }, // user not found in middle ware
  INCORRECT_PASSWORD: { msg: "Incorrect password" }, // original password does not match which changing password
  INVALID_USERNAME_OR_PASSWORD: {
    msg: "Invalid username/password",
  }, // login
  INVALID_EMAIL: { msg: "Invalid email" }, // submitting email from forgot password
  INVALID_JWT_TOKEN: { msg: "Invalid token", forceLogout: true }, // Token not correct
  JWT_TOKEN_EXPIRED: { msg: "Token expired", forceLogout: true }, // token has been logged out from session
  INVALID_RESET_TOKEN: { msg: "Reset token expired" }, // reset password
  INVALID_VERIFICATION_TOKEN: { msg: "Invalid verification token" }, // account verification
  NO_JWT_TOKEN_FOUND: { msg: "No token found" },
  EMAIL_OR_USERNAME_REGISTERED: { msg: "Email/Username already exists." },
};

const handleError = (
  error,
  {
    logout,
    enableStatusHandling = true,
    enableForceLogout = true,
    notify = () => {},
  } = {}
) => {
  // error handling for axios
  const errorMessage = error.response ? error.response.data : error.message;

  const matchedErrorObj = ERROR_MAPPING[errorMessage];

  if (enableStatusHandling && matchedErrorObj) {
    notify(matchedErrorObj.msg, "error");
    if (enableForceLogout && matchedErrorObj.forceLogout) {
      if (logout) logout();
      else {
        setTimeout(() => {
          localStorage.clear();
          // if (window.location.pathname !== "/login") window.location.reload();
        }, 2000);
      }
    }
  } else notify(errorMessage, "error");
  console.error(error);
};

export { handleError };
