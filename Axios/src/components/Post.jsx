import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

export const Post = () => {
  //useState
  const [data, setData] = useState([]);

  // getPostData function
  const getPostData = async () => {
    const response = await getPost();
    console.log(response.data);
    setData(response.data);
  };

  // useEffect
  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatePosts = data.filter((currData) => {
          return currData.id !== id;
        });
        setData(newUpdatePosts);
      }
    } catch (error) {
      console.log("Faild to delete post:", error);
    }
  };

  const handleEditPost = (currData) => {
    
  };

  return (
    <>
      <section className="section-form">
        <Form data={data} setData={setData} />
      </section>
      <section className="section-post">
        <ol>
          {data.map((currData) => {
            const { id, body, title } = currData;
            return (
              <li key={currData.id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button
                  onClick={() => {
                    handleEditPost(currData);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleDeletePost(id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
