import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { UserData } from "../interfaces";

import Header from "../components/header";
import Spinner from "../components/spinner";
import ErrorBoundary from "../components/error-boundary";

import { GlobalStyle } from "../global.styles";
import { ExecutionResult } from "react-apollo";

import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

const HomePage = lazy(() => import("../pages/homepage"));
const ShopPage = lazy(() => import("../pages/shop"));
const CheckoutPage = lazy(() => import("../pages/checkout"));
const SignInAndSignUpPage = lazy(() => import("../pages/sign-in-and-sign-up"));

type Props = {
  setCurrentUser(user: UserData | null): Promise<ExecutionResult>;
  currentUser: UserData | null;
};

const App = ({ setCurrentUser, currentUser }: Props) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (!userRef) return;

        userRef.onSnapshot((snapShot) => {
          const userData = snapShot.data() as UserData | undefined;
          if (!userData) return setCurrentUser(null);

          setCurrentUser({
            id: snapShot.id,
            ...userData,
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default App;
