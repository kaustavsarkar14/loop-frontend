import { useEffect, useState } from "react";

export default function useScollPagination() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const debouncedScroll = debounce(handleScroll, 200);

    document.addEventListener("scroll", debouncedScroll);

    return () => {
      document.removeEventListener("scroll", debouncedScroll);
    };
  }, []);
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  return page;
}
