import axios from "axios";
const create = (payload) => axios.post(`/comments`, payload);
const comments = {
  create,
};
export default comments;
