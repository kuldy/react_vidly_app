import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import auth from "./authService";

axios.defaults.headers.common["Authorization"] = auth.getJwt();
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(null, (error) => {
  console.log("interceptor");
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    logger.log(error);
    toast.error("Unexpected Error happend!!");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
