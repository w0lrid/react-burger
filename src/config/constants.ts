const apiURL: string = 'https://norma.nomoreparties.space/api';
const apiAuthURL: string = `${apiURL}/auth`;

const ingredientsURL: string = `${apiURL}/ingredients`;
const orderURL: string = `${apiURL}/orders`;
const passwordRecoveryURL: string = `${apiURL}/password-reset`;
const passwordResetURL: string = `${passwordRecoveryURL}/reset`;
const authTokenURL: string = `${apiAuthURL}/token`;
const authRegisterURL: string = `${apiAuthURL}/register`;
const authLoginURL: string = `${apiAuthURL}/login`;
const authLogoutURL: string = `${apiAuthURL}/logout`;
const authUserURL: string = `${apiAuthURL}/user`;

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
