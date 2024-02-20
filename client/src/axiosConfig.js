import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
  //baseURL: "http://localhost:3001",
});

export default instance;
