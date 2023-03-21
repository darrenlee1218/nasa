import { useEffect } from "react";
import { EXPLORE_URL } from "constants/urls";
import { useStaticRouter } from "utils/useStaticRouter";

const HomePage = () => {
  const router = useStaticRouter();
  useEffect(() => {
    router.push(EXPLORE_URL);
  }, []);

  return null;
};

export default HomePage;
