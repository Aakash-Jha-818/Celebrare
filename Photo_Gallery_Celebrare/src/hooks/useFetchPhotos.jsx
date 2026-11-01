import { useEffect, useState } from "react";
import axios from "axios";

const useFetchPhotos = (limit = 30) => {
    // initial  states
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // avoids setting state as the component unmounts generally during the midlde of request..

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);// no need to show error , until we really get any error , let it stay null
        const res = await axios.get(
          `https://picsum.photos/v2/list?limit=${limit}`,
        );
        if (!ignore) setPhotos(res.data);
      } catch (err) {
        console.log("Error While Fetching Images..", err);
        if (!ignore) setError(err.message || "Something went wrong"); // 
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return { photos, loading, error };
};

export default useFetchPhotos;
