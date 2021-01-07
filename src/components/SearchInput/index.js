import React, { useState, useMemo, useContext } from "react";
import { Input } from "semantic-ui-react";
import axios from "axios";
import debounce from "../../utils/debounce";
import AppContext from "../../store/context";

import { SET_MOVIES_REDUCER } from "../../constants";

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_Key;

const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    api_key: apiKey,
    ...config.params,
  };
  return config;
});

export default function SearchInput() {
  const { state, dispatch } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (value) => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get("/", {
        params: { query: value },
      });
      setMovies(result.data);
      if (result) {
        dispatch({ type: SET_MOVIES_REDUCER, data: result.data });
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const getMoviesByTerms = useMemo(() => debounce(fetchData, 400), []);

  return (
    <div>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => getMoviesByTerms(e.target.value)}
      />
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <div>Loading ...</div> : ""}
      {movies && movies.results && (
        <ul>
          {movies.results.map((item) => (
            <li key={item.id}>
              <a href={item}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
