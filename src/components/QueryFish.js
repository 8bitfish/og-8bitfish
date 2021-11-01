import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import firebase from "./firebase";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Context } from "./Context";
// import { getTokenURI } from "./Functions";
const QueryFish = ({ Favicon, _, chance }) => {
  const [currentFish, setCurrentFish] = useState("");
  const { contract } = useContext(Context);
  const db = firebase.firestore();
  const ref = useMemo(() => db.collection("fish"), [db]);
  let { category, query } = useParams();
  //   console.log(category, query);
  const runQuery = useCallback(() => {
    if (contract !== null) {
      ref.where(category, "==", query).onSnapshot((querySnapshot) => {
        const queryTokens = [];
        querySnapshot.forEach((doc) => {
          queryTokens.push(doc.data());
        });
        setCurrentFish(queryTokens);
      });
    } else {
      console.log("contract not ready");
    }
  }, [ref, category, query, contract]);

  useEffect(() => {
    runQuery();
  }, [runQuery]);

  return (
    <div>
      <Helmet>
        <link rel="icon" href={Favicon} sizes="16x16" />
        <title>8bitfish | Query ({query})</title>
      </Helmet>
      <h1>
        {category} - {query}
      </h1>
      {currentFish !== "" ? (
        _.map(currentFish, (tokens, key) => {
          const currentKey = key + 1;
          console.log(tokens);
          return (
            <React.Fragment key={chance.integer()}>
              <Link to={`/details/${tokens.id}`}>
                <img key={currentKey} src={tokens.image} alt={currentKey} />
              </Link>
            </React.Fragment>
          );
        })
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default QueryFish;
