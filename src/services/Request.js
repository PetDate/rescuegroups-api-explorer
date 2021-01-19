import axios from "axios";

export const getWithToken = (url, params) => {
  return requestWithToken("GET", url, { params })
}

export const requestWithToken = (method, url, config) => {
  return axios.request({
    method,
    url,
    headers: {
      "Authorization": process.env.REACT_APP_RESCUE_API_KEY,
    },
    ...config
  });
}

export default axios;
