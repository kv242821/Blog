import { Link } from "react-router-dom";
import { mediumLogo, writeBlogIcon } from "../assets/icons";
import AvatarMenu from "./AvatarMenu";
import Search from "./Search";

export default function UnAuthNavbar() {
  return (
    <nav
      className="container_70"
      style={{
        height: "56px",
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="left"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "17px",
        }}
      >
        <Link to="/">{mediumLogo}</Link>
        <Search />
      </div>
      <div
        className="right"
        style={{
          marginRight: "25px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
          height: "100%",
        }}
      >
        <Link
          to="/signin/write"
          className="writeBtn"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "gray",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "rgba(117, 117, 117, 1)" }}>
            {writeBlogIcon}
          </span>
          <p style={{ fontSize: "14.5px", marginTop: "-4px" }}>Write</p>
        </Link>

        <Link to="/signin/in" className="button-custom">
          Sign In
        </Link>
      </div>
    </nav>
  );
}
