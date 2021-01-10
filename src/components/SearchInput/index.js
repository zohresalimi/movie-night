import React, { useState, useContext, useEffect } from "react";
import { Input, Segment } from "semantic-ui-react";
// import axios from "axios";
import axiosInstance from "../../services";
import AppContext from "../../store/context";

import { SET_MOVIES_REDUCER, EMPTY_SEARCH_RESULT } from "../../constants";

import "./style.css";
const baseURL = process.env.REACT_APP_BASE_URL;

export default function SearchInput() {
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let mounted = true;
    let fetchTimeout;
    const fetchData = async () => {
      console.log("fetch data >>>>>>>>>>>>>>>>>");

      try {
        setIsLoading(true);
        const result = await axiosInstance.get(baseURL, {
          params: { query: searchTerm },
        });
        if (result && mounted) {
          dispatch({ type: SET_MOVIES_REDUCER, data: result.data });
        }
        if (!result.data.total_results) {
          setMessage("No movies found. Try with another term");
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchTimeout = setTimeout(fetchData, 400);
    }

    return () => {
      clearTimeout(fetchTimeout);
      mounted = false;
    };
  }, [searchTerm, dispatch]);

  const handelInputChange = (value) => {
    setSearchTerm(value);
    if (!value) {
      dispatch({ type: EMPTY_SEARCH_RESULT });
    }
  };
  return (
    <Segment basic style={{ width: "100%" }}>
      <Input
        icon="search"
        loading={isLoading}
        data-testid="search-input"
        placeholder="Search by movie name!"
        value={searchTerm}
        onChange={(e) => handelInputChange(e.target.value)}
        className="full-width"
      />
      {isError && <div>Something went wrong ...</div>}
      {message && <div>{message}</div>}
      {isLoading && <div data-testid="loading">Loading...</div>}
    </Segment>
  );
}
