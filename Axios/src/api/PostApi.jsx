import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//get method
export const getPost = () => {
  return api.get("/posts");
};

// Delete method
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//Post Method
export const addPost = (data) => {
  return api.post("/posts", data);
};
