import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseProfileFeedPage } from "../state/ProfileSlice";

export default function useProfileFeedPagination() {
  const dispatch = useDispatch();
  const isLastPage = useSelector((state) => state.profile.isLastPage);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10
      ) {
        if (!isLastPage) {
          console.log("islast page condition", !isLastPage);
          dispatch(increaseProfileFeedPage());
        }
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
