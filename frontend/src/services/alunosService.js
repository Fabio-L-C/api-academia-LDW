//baseado em https://www.bezkoder.com/react-jwt-auth/
import axios from "axios";
import { API } from "./api";

import { authHeader } from "./authServices";

const API_URL = API + "alunos/";

export const loadAlunos = (setAlunos, setLoading) => {
  axios
    .get(API_URL, { headers: authHeader() })
    .then((response) => {
      setAlunos(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
};
