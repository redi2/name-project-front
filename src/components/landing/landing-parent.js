import React, { Fragment, useState, useEffect } from "react";

import CreateName from "../../components/name/create-name";
import Search from "../../components/landing/search";
import SearchResult from "../../components/landing/search-result";

const LandingParent = () => {
  const [searchResult, setSearchResult] = useState();
  const [name, setName] = useState("");

  const callBackMe = (data) => {
    setSearchResult(data);
  };

  const callNameBack = (data) => {
    console.log("name is" + data);
    setName(data);
  };

  return (
    <Fragment>
      <header className="masthead text-white text-center">
        <div className="overlay"></div>
        <div className="container">
          <Search callBackMe={callBackMe} callNameBack={callNameBack} />
        </div>
      </header>
      {searchResult != null && searchResult.length > 0 && (
        <SearchResult searchResult={searchResult} />
      )}
      {searchResult != null && searchResult.length === 0 && (
        <CreateName
          propName={name}
          title={`You are the first to add the great name ${name}. Congrats`}
        />
      )}
    </Fragment>
  );
};

export default LandingParent;
