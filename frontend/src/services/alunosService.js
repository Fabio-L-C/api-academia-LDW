//baseado em https://www.bezkoder.com/react-jwt-auth/
import axios from "axios";
import { API } from "./api";

import { authHeader } from "./authServices";

const API_URL = API + "alunos/";

export const loadAlunos = () => {
  axios
    .get(API_URL, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
