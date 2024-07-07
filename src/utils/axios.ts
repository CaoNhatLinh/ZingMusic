import axios from "axios"

const instance = axios.create({
  baseURL: "http://192.168.1.2:3000/api"
})

// custom response
instance.interceptors.response.use(
  (response) => {
    return response.data.data
  }, function (error) {
    return Promise.reject(error);
  });


export default instance
