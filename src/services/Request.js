import axios from "axios";

export const getWithToken = (url, params) => {
  const options = {
    headers: {
      "Authorization": process.env.REACT_APP_RESCUE_API_KEY,
    },
    ...params,
  }

  return axios.get(url, options);
}

export default axios;
