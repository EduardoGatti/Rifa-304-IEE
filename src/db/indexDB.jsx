import { useState, useEffect } from "react";

function useIndexedDB(key, initialValue) {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}

export default useIndexedDB;
