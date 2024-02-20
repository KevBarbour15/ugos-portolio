import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:3001"
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

//process.env.REACT_APP_BACKEND_URL  add this back to baseURL for production
export default instance;
