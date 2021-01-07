import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import axios from "axios";

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
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ value: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axiosInstance.get("/", {
          params: { query: searchTerm.value },
        });
        setMovies(result.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
      setIsLoading(false);
    };
    if (searchTerm.value) {
      fetchData();
    }
  }, [searchTerm, searchTerm.value]);
  return (
    <div>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => setSearchTerm({ value: e.target.value })}
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
