import Cookies from "universal-cookie";
import { store } from "../thirdparties/redux/store";
import { login, logout } from "../thirdparties/redux/userSlice";

export function handleLogout() {
  const cookies = new Cookies();
  store.dispatch(logout());
  cookies.remove("token");
  window.location.href = "/";
}

export function handleLogin(data) {
  const cookies = new Cookies();
  delete data.created_at;
  delete data.updated_at;
  store.dispatch(login(data.user));
  cookies.set("token", data.access_token, { path: "/" });
  window.location.href = "/";
}

export function isLoggedIn() {
  const cookies = new Cookies();
  return cookies.get("token") !== undefined;
}

export function validateForm(form, exceptionFields = []) {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexPhone = /^[0-9]{10,15}$/;
  const errors = {};

  for (let key in form) {
    if (!exceptionFields.includes(key)) {
      if (key === "email" && !regexEmail.test(form[key])) {
        errors[key] = "Invalid email address";
      }
      if (key === "phone" && !regexPhone.test(form[key])) {
        errors[key] = "Invalid phone number (10-15 digits)";
      }
      if (!form[key]) {
        errors[key] = "This field is required";
      }
    }
  }

  return errors;
}
