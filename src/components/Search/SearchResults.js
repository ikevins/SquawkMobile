import { useEffect, useState } from "react";
import yelp from "../../api/yelp";

export default () => {
  const [results, setResults] = useState([]);

  // Await is used to wait for the response from the API. Async keyword is used to make the code asynchronous.
  // searchApi is a function that takes in a search term and returns a promise.
  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
      console.log(results);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call searchApi when the component is first rendered.
  useEffect(() => {
    searchApi("pizza");
  }, []);

  return [searchApi, results];
};