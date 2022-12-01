import api from "@/services/api";

function getAll() {
  return api.get("hello/expectations/");
}

function createExpectation(data) {
  return api.post("hello/expectations/", data);
}

function updateExpectation(id, data) {
  return api.put(`hello/expectations/${id}/`, data);
}

function getExpectation(id) {
  return api.get(`hello/expectations/${id}/`);
}
function markDone(id, data) {
  return api.put(`hello/expectations/${id}/`, data);
}
function deleteExpectation(id) {
  return api.delete(`hello/expectations/${id}/`);
}
function searchExpectation(text) {
  return api.get(`hello/expectations/?author=${text}`);
}

export { getAll, createExpectation, updateExpectation, getExpectation, deleteExpectation, markDone, searchExpectation };
