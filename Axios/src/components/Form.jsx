import { useEffect, useState } from "react";
import { addPost, updatePost } from "../api/PostApi";

export const Form = ({ data, setData, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const isEmpty = updateData.body === "" && updateData.title === "";

  //get update data and add into input field
  useEffect(() => {
    updateData &&
      setAddData({
        title: updateData.title || "",
        body: updateData.body || "",
      });
  }, [updateData]);

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

  const updatePostData = async () => {
    try {
      const res = await updatePost(updateData.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currEle) => {
            return currEle.id === updateData.id ? res.data : currEle;
          });
        });
        setUpdateData({
          title: "",
          body: "",
        });
      }

      console.log("Post updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData(addData);
    } else if (action === "Edit") {
      updatePostData();
    }
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
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
