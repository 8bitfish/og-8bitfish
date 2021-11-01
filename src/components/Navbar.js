import React, { useContext } from "react";
import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { VscGear } from "react-icons/vsc";
import { Context } from "./Context";
const Navbar = () => {
  const { accounts } = useContext(Context);
  return (
    <div>
      {accounts !== null ? (
        <div className="topnav">
          <Link to="/" className="nav-link active">
            <AiOutlineHome className="icon" />
          </Link>
          <Link className="nav-link icon-link" to={`/aquarist/${accounts[0]}`}>
            <BiUserCircle className="icon" />
          </Link>
          <Link className="nav-link icon-link" to="/generate">
            <VscGear className="icon" />
          </Link>
        </div>
      ) : (
        <h1>account not loaded or loading</h1>
      )}
    </div>
  );
};

export default Navbar;
