import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://lsf-back.herokuapp.com/", //"http://localhost:3000/api/",
  headers: {
    Authorization: token,
  },
});

export default instance;
