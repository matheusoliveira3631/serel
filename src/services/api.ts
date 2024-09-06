import axios from "axios";

//const apiURL = "https://api.anabbprev.org.br/v1";
const apiURL = "https://api-restrito-anabbprev-h.serelnet.com.br/v1";

const api = axios.create({
  baseURL: apiURL,
});

export default api;
