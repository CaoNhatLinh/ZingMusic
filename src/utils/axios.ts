import axios from "axios"

const instance = axios.create({
  baseURL: "https://music-api-3ptc.onrender.com/api"
})

// custom response
instance.interceptors.response.use(
  (response) => {
    return response.data.data
  }, function (error) {
    return Promise.reject(error);
  });


export default instance
