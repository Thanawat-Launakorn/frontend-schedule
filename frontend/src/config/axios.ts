import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;
console.log(baseURL);

axios.interceptors.request.use((request) => {
  request.baseURL = `${baseURL}`;

  return Promise.resolve(request);
});

export default axios;
