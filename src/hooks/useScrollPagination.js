import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { increasePage } from "../state/PostSlice";

export default function useScollPagination() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 40
      ) {
        dispatch(increasePage());
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
}
