import axios from "axios";
import { useEffect } from "react";

export const Movie = () => {
  const getMovieData = async () => {
    try {
      const API =
        "https://www.omdbapi.com/?i=tt3896198&apikey=1c12799f&s=titanic&page=1";
      const response = await axios.get(API);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      <h1>Movie</h1>
    </>
  );
};
