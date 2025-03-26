import { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";

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
  return (
    <section className="section-post">
      <ol>
        {data.map((currData) => {
          const { body, title } = currData;
          return (
            <li key={currData.id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button>Edit</button>
              <button className="btn-delete">Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
