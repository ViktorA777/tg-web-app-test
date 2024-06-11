import axios from "axios";

const BASE_URL = "https://666816a3f53957909ff67c7a.mockapi.io";

export const instanse = axios.create({
  baseURL: BASE_URL,
});
