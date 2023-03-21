import PublicLayout from "components/layouts/Public";
import ItemContainer from "containers/item";
import { useStaticRouter } from "utils/useStaticRouter";

const HomePage = () => {
  const router = useStaticRouter();
  const { nasaId } = router.query;

  return (
    <PublicLayout title="Explore">
      <ItemContainer nasaId={nasaId as string} />
    </PublicLayout>
  );
};

export default HomePage;
