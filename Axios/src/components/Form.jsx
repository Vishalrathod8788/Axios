import { useState } from "react";
import { addPost } from "../api/PostApi";

export const Form = ({ data, setData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async (addData) => {
    try {
      const res = await addPost(addData);
      // eslint-disable-next-line no-constant-condition
      if ((res.status = 201)) {
        setData([...data, addData]);
        setAddData({
          title: "",
          body: "",
        });
        console.log("Post added successfully:", res.data);
      }
    } catch (error) {
      console.log("Faild to add post:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostData(addData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          placeholder="Add Title"
          value={addData.title}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          id="body"
          name="body"
          autoComplete="off"
          placeholder="Add Post"
          value={addData.body}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
