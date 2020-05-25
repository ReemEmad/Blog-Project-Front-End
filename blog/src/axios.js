import axios from "axios";
axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  )
    return Promise.reject(error);

  alert("an unexpected error occured");
  return Promise.reject(error);
});
axios.defaults.headers["auth-token"] = localStorage.getItem("token");
export default axios;
