import axios from "axios";

const list = () => axios.get("/comments");

// const create = (payload) => axios.post("/tasks/", payload);

const commentsApi = {
  list,
  // show,
  // create,
  // update,
  // destroy,
};

export default commentsApi;
