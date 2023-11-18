import React from "react";
import TweetFeed from "../components/TweetFeed";
// import ReduxProviders from "./GlobalRedux/storeProvider";
import ReduxProviders from "../GlobalRedux/storeProvider";
const page = () => {
  return (
    <div>
      <ReduxProviders>
        <TweetFeed />
      </ReduxProviders>
    </div>
  );
};

export default page;
