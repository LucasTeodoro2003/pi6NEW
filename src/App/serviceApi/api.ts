import axios from "axios";

// PEOPLE COM FALTA DE EPI
// const api = axios.create({
//   baseURL: "https://webhook.site/a35ffa4f-77b9-4eda-ab38-5dce898e9293",
//   timeout: 1000,
// });
// const apiUser = axios.create({
//   baseURL: "",
//   timeout: 1000,
// })
// const apiTabs = axios.create({
//   baseURL: "",
//   timeout: 1000,
// })

// PEOPLE TUDO CORRETO
// const api = axios.create({
//   baseURL: "https://webhook.site/7db9c146-695d-4334-8f0a-877c1171e60d",
//   timeout: 1000,
// });
// const apiUser = axios.create({
//   baseURL: "",
//   timeout: 1000,
// })
// const apiTabs = axios.create({
//   baseURL: "",
//   timeout: 1000,
// })


// FUNCIONAR AS TABS
// const api = axios.create({
//   baseURL: "",
//   timeout: 1000,
// });
// const apiUser = axios.create({
//   baseURL: "",
//   timeout: 1000,
// });
// const apiTabs = axios.create({
//   baseURL: "https://webhook.site/5abb3a95-ff19-4d6c-ae90-abc8b955d61c",
//   timeout: 1000,
// })

// SO FUNCIONAR
const api = axios.create({
  baseURL: "https://api-pi6periodo.azurewebsites.net",
  timeout: 1000,
});

//Tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
