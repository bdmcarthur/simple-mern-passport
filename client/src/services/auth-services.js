import axios from "axios";

const authAPI = axios.create({
  baseURL: `/`
});

export const signUpService = ({ username, password, name }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/user/signup", {
        username,
        password,
        name
      })
      .then(response => {
        const user = response.data;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logInService = ({ username, password }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/user/login", { username, password })
      .then(response => {
        const user = response.data;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logOutService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/user/logout")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
