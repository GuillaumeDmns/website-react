import { useState } from "react";

const useFetch = <T, Args extends unknown[]>(func: (...arg: Args) => Promise<T | undefined> | T | undefined): [boolean, (...arg: Args) => Promise<T | undefined>] => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (...arg: Args): Promise<T | undefined> => {
    setIsLoading(true);

    try {
      return await func(...arg);
    } catch (e) {
      console.error("Error in fetch data :", e);
    } finally {
      setIsLoading(false);
    }
    return;
  };

  return [isLoading, fetchData];
};

export default useFetch;