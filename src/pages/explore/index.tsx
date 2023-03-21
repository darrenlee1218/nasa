import React from "react";
import ExploreContainer from "containers/explore";
import PublicLayout from "components/layouts/Public";

const ExplorePage = () => {
  return (
    <PublicLayout title="Explore">
      <ExploreContainer />
    </PublicLayout>
  );
};

export default ExplorePage;
