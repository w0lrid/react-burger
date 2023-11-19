const apiURL = 'https://norma.nomoreparties.space/api';
const apiAuthURL = `${apiURL}/auth`;

const ingredientsURL = `${apiURL}/ingredients`;
const orderURL = `${apiURL}/orders`;
const passwordRecoveryURL = `${apiURL}/password-reset`;
const passwordResetURL = `${passwordRecoveryURL}/reset`;
const authTokenURL = `${apiAuthURL}/token`;
const authRegisterURL = `${apiAuthURL}/register`;
const authLoginURL = `${apiAuthURL}/login`;
const authLogoutURL = `${apiAuthURL}/logout`;
const authUserURL = `${apiAuthURL}/user`;

export {
  ingredientsURL,
  orderURL,
  passwordRecoveryURL,
  passwordResetURL,
  authTokenURL,
  authRegisterURL,
  authLoginURL,
  authLogoutURL,
  authUserURL,
};
