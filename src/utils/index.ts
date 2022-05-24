import passwordEnum from "../enums/password";
import pageCode from "../enums/pageCode";

export const isPasswordValid = (password: string) => {
  return password == passwordEnum.WelcomePassword;
};

export const isRouteValid = (password: string) => {
  if (pageCode.Login) {
  }
};
