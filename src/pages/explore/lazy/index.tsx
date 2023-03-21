import React from "react";
import { LazyExploreContainer } from "containers/explore";
import PublicLayout from "components/layouts/Public";

const ExplorePage = () => {
  return (
    <PublicLayout title="Lazy Explore">
      <LazyExploreContainer />
    </PublicLayout>
  );
};

export default ExplorePage;
