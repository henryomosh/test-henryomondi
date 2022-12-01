import AuthService from "@/services/auth.service";
import router from "@/router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = { status: { loggedIn: user !== null }, user };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    googleAuth({ commit }, googleData) {
      return AuthService.googleAuth(googleData).then((response) => {
        router.push("/loading");
        AuthService.socialOAuth(googleData).then((res) => {
          commit("loginSuccess", res);
          router.push({ name: "expectations" });
        });
        return Promise.resolve(response);
      }
      );
    },
    currentUser({ commit }, data) {
      return AuthService.currentUser(data).then( (response) => {
        const user = Object.assign({}, data, { user: response.data[0] });
        commit("loginSuccess", user);
        return user;
      });
    },
    login({ commit }, user) {
      return AuthService.login(user).then(
        (res) => {
          return res ;
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
      commit("refreshToken", accessToken);
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, access_token: accessToken.access_token, refresh_token: accessToken.refresh_token };
    },
  }
};
