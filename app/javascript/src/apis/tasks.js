import axios from "axios";

const list = () => axios.get("/tasks");

const show = (id) => axios.get(`/tasks/${id}`);

const create = (payload) => axios.post("/tasks/", payload);

const update = ({ id, payload }) => axios.put(`/tasks/${id}`, payload);

const destroy = (id) => axios.delete(`/tasks/${id}`);

const tasksApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default tasksApi;
