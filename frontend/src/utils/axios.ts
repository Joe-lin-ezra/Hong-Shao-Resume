import Axios from "axios";

const axios = () => {
  const instance = Axios.create({
    // baseURL: process.env.REACT_APP_BASEURL,
    baseURL: "http://127.0.0.1:8787",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
  return instance;
};

export { axios };
export default axios;
