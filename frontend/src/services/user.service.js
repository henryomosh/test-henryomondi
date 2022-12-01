import api from "@/services/api";

function getUserBoard() {
  let user = JSON.parse(localStorage.getItem("user"));
  const id = user.user.id;
  return api.get(`hello/users/${id}/`);
}
function getCurrentUser(data) {
  const access_token = data.access_token;
  return api.get("hello/users/", { headers: {
    Authorization: `Bearer ${access_token}`
  } });

}
function getCurrentUserExpectations() {
  const user = JSON.parse(localStorage.getItem("user"));
  return api.get(`hello/expectations/?author=${user.user.username}`);
}
export { getUserBoard, getCurrentUser, getCurrentUserExpectations };
