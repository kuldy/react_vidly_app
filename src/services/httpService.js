import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  console.log("interceptor");
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("Logging the error:", error);
    alert("Unexpected Error happen");
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
