import axios from "axios";

const list = () => axios.get("/users");

// const show = (id) => axios.get(`/users/${id}`);

// const create = (payload) => axios.post("/users/", payload);

// const update = ({ id, payload }) => axios.put(`/users/${id}`, payload);

// const destroy = (id) => axios.delete(`/users/${id}`);

const usersApi = {
  list,
};

export default usersApi;
