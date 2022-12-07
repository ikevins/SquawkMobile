import { useEffect, useState } from "react";
import yelp from "../../api/yelp";

export default () => {
  const [results, setResults] = useState([]);

  const searchApi = async (searchTerm, searchLocation) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: searchLocation,
        },
      });
      setResults(response.data.businesses);
    } catch (error) {
      console.log(error.message);
    }
  };

  /*useEffect(() => {
    searchApi('pizza', 'Clermont, Fl');
  }, []);*/

  return [searchApi, results];
};