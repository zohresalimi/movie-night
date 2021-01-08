import React, { useState, useMemo, useContext } from "react";
import { Input } from "semantic-ui-react";
// import axios from "axios";
import axiosInstance from "../../services";
import debounce from "../../utils/debounce";
import AppContext from "../../store/context";

import { SET_MOVIES_REDUCER } from "../../constants";

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
    <div>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => getMoviesByTerms(e.target.value)}
      />
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <div>Loading ...</div> : ""}
    </div>
  );
}
