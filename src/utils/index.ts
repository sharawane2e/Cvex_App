import passwordEnum from "../enums/password";
import pageCode from "../enums/pageCode";

export const isPasswordValid = (password: string) => {
  return password == passwordEnum.WelcomePassword;
};

// export const isRouteValid = (routes: string) => {
//   if (pageCode.Login == "1") {
//   }
// };

export const saveScrollPosNew = (containerClass:string, inputFieldId:string) => {
  var scrollValue = document.querySelector(`${containerClass}`)?.scrollTop;
  var scrollInput:any = document.querySelector(`${inputFieldId}`);
  return scrollInput.value = scrollValue;
}

