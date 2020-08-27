import axios from "axios";
import hash from "../config/hash";

let _token = hash.access_token;

if (_token) {
  localStorage.setItem("token", _token);
}

console.log(process.env.REACT_APP_API_URL)

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
