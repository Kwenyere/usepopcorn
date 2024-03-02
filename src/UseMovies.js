//Custom hook
import { useEffect, useState } from "react";
const KEY = "2150420f";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //To fetch the movies
  useEffect(
    function () {
      callback?.();
      //To prevent fetching multiple data at the same time,use an AbortContoller
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          //To handle error
          if (!res.ok) throw new Error("Something wrong in fetching movie");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      //cleanup function
      return function () {
        controller.abort();
      };
    },
    [query, callback]
  );
  return { isLoading, movies, error };
}
