import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Context } from "./Context";
import Favicon from "../favicon.ico";
const UserProfile = ({ currentUserTokens, chance, _ }) => {
  const { contract, accounts } = useContext(Context);
  const [userTokens, setUserTokens] = useState([]);
  const [userTokensUpdated, setUserTokensUpdated] = useState(false);
  const [accountEqual, setAccountEqual] = useState(false);
  let { account } = useParams();

  const getUserTokens = useCallback(async () => {
    if (contract !== null) {
      const output = await currentUserTokens(account, contract);
      if (accounts !== null) {
        if (Number(accounts[0]) === Number(account)) {
          setAccountEqual(true);
        }
      }
      console.log(accounts);
      console.log(output);
      setUserTokens(output);
      setUserTokensUpdated(true);
    }
  }, [currentUserTokens, account, accounts, contract]);

  useEffect(() => {
    getUserTokens();
  }, [account, getUserTokens, accounts]);
  return (
    <div>
      <Helmet>
        <link rel="icon" href={Favicon} sizes="16x16" />
        <title>8bitfish | User ({account})</title>
      </Helmet>
      <center>
        <h1>Account</h1>
        <h1>
          {account} {accountEqual ? "- (You)" : null}
        </h1>
        {userTokensUpdated ? (
          _.map(userTokens, (tokens, key) => {
            return (
              <React.Fragment key={chance.integer()}>
                <Link to={`/details/${tokens[1].currentFish.issue}`}>
                  <img key={tokens[0]} src={tokens[0]} alt="" />
                </Link>
              </React.Fragment>
            );
          })
        ) : (
          <h1>loading...</h1>
        )}
      </center>
    </div>
  );
};

export default UserProfile;
