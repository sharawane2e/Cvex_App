import passwordEnum from "../enums/password";

export const isPasswordValid = (password: string) => {
  return password == passwordEnum.WelcomePassword;
};
