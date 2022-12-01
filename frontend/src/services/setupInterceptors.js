import axiosInstance from "@/services/api";
import TokenService from "@/services/TokenService";
import axios from "axios";
import { refreshToken } from "@/common/OauthData";

const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url !== "hello/login/" && config.url !== "hello/register/" ) {
        const token = TokenService.getLocalAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${ token }`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.config.url !== "hello/login/" && err.config.url !== "hello/register/" && err.response) {

        if (err.response.status === 401 && !err.config._retry) {
          err.config._retry = true;
          try {
            refreshToken.refresh_token = TokenService.getLocalRefreshToken();
            const rs = await axios.post("social-auth/token/", refreshToken);

            const { access } = rs.data;
            TokenService.updateLocalAccessToken(access);
            return axios.request(err.config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
