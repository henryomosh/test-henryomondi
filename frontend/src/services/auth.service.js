import api from "@/services/api";
import TokenService from "@/services/TokenService";
import axios from "axios";
import { convertToken, oauthToken } from "@/common/OauthData";

const userData = {
  email: ""
};

class AuthService {
  async googleAuth(googleData) {
    return await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${googleData.access_token}`
      }
    }).then( (res) => {
      userData.email = res.data.email;
      return res;
    });
  }
  async socialOAuth(googleData) {
    convertToken.token = googleData.access_token;
    return await axios.post("social-auth/convert-token", convertToken).then( (response) => {
      response.data["email"] = userData.email;
      return this.currentUser(response.data).then( (res) => {
        const user = Object.assign({}, response.data, { user: res.data[0] } );
        TokenService.setUser(user);
        return user;
      });
    });
  }
  async login(user) {
    oauthToken.username = user.email;
    oauthToken.password = user.password;
    return await axios.post("social-auth/token", oauthToken);
  }
  async currentUser(user) {
    return await axios.get(`api/hello/users/?email=${user.email}`, { headers: {
      Authorization: `Bearer ${user.access_token}`
    } }).then( (res) => {
      let resData = Object.assign({}, user, { user: res.data[0] });
      TokenService.setUser(resData);
      return res;
    });
  }
  logout() {
    TokenService.removeUser();
  }
  register(user) {
    return api.post("hello/register/", { username: user.username, email: user.email, password: user.password });
  }
}
export default new AuthService();
