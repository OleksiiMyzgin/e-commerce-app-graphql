import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Spinner from "../../components/spinner";

const CollectionsOverview = lazy(() =>
  import("../../components/collections-overview"),
);
const CollectionPageContainer = lazy(() => import("../collection"));

const ShopPage = () => {
  const match = useRouteMatch();
  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

export default ShopPage;
