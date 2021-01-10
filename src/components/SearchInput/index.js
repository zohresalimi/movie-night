import React, { useState, useMemo, useContext } from "react";
import { Input, Segment } from "semantic-ui-react";
// import axios from "axios";
import axiosInstance from "../../services";
import debounce from "../../utils/debounce";
import AppContext from "../../store/context";

import { SET_MOVIES_REDUCER } from "../../constants";

import "./style.css";
const baseURL = process.env.REACT_APP_BASE_URL;

export default function SearchInput() {
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (value) => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get(baseURL, {
        params: { query: value },
      });
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
    <Segment basic style={{ width: "100vh" }}>
      <Input
        icon="search"
        loading={isLoading}
        placeholder="Search Movie ..."
        onChange={(e) => getMoviesByTerms(e.target.value)}
        className="full-width"
      />
      {isError && <div>Something went wrong ...</div>}
    </Segment>
  );
}
