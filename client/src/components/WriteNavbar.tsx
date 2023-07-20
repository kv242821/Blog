import { Link } from "react-router-dom";
import { theBlogLogo, moreIcon, NotificationIcon } from "../assets/icons";
import AvatarMenu from "./AvatarMenu";

type WriteNavType = {
  onClick(): void;
  disabled: boolean;
  buttonText: string;
};

export default function WriteNavbar({
  onClick,
  disabled,
  buttonText,
}: WriteNavType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
      }}
    >
      <div className="left_write_nav">
        <Link to="/">{theBlogLogo}</Link>
      </div>
      <div
        className="right_write_nav"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* cbe4ca */}
        <button
          disabled={disabled}
          onClick={() => {
            !disabled && onClick();
          }}
          className="button-custom"
        >
          {buttonText}
        </button>
        <span style={{ color: "gray", cursor: "pointer" }}>{moreIcon}</span>
        <Link to="/notifications">
          <span style={{ color: "gray", cursor: "pointer" }}>
            {NotificationIcon}
          </span>
        </Link>
        <AvatarMenu />
      </div>
    </div>
  );
}
