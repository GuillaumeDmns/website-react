import { useState } from "react";

const useFetch = <T>(func: (...arg: any) => T | undefined): [boolean, (...arg: any) => Promise<T | undefined>] => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (...arg: any): Promise<T | undefined> => {
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