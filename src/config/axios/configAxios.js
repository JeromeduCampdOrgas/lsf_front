import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://lsf-back-2.herokuapp.com/api/", //"http://localhost:3000/api/",
  headers: {
    Authorization: token,
  },
});

export default instance;
