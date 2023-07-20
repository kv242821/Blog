import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useAppContext } from "../App";
import { moreIcon, mutePost, savePost } from "../assets/icons";
import { url } from "../baseUrl";
import { httpRequest } from "../interceptor/axiosInterceptor";
import Chip from "./Chip";
import PostMenu from "./PostMenu";
import Markdown from "./Markdown";

type PostProps = {
  title: string;
  image?: string;
  username?: string;
  userImage?: string;
  timestamp: string;
  postId: string;
  tag?: string;
  summary: string;
  userId: string;
  filterPost?: (postId: string) => void;
  filterAuthorPost?: (userId: string) => void;
  showMuteicon?: boolean;
  showUserList: boolean;
  unAuth?: boolean;
  showMoreIcon?: boolean;
};

export default function Post({
  postId,
  timestamp,
  title,
  username,
  image,
  tag,
  summary,
  userImage,
  userId,
  filterPost,
  showMuteicon = true,
  showUserList = true,
  unAuth = false,
  filterAuthorPost,
  showMoreIcon = true,
}: PostProps) {
  const { handleToast } = useAppContext();
  const navigate = useNavigate();

  const { refetch: ignorePostCall } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/post/ignore/${postId}`),
    queryKey: ["ignore", postId],
    enabled: false,
    onSuccess: (data) => {},
  });

  const { refetch: ignoreAuthorCall } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/post/ignoreAuthor/${userId}`),
    queryKey: ["ignoreAuthor", userId],
    enabled: false,
    onSuccess: (data) => {},
  });

  const { refetch: deleteStory } = useQuery({
    queryFn: () => httpRequest.delete(`${url}/post/${postId}`),
    queryKey: ["delete", postId],
    enabled: false,
    onSuccess() {
      handleToast("Story deleted successfully");
      handleClose();
      filterPost && filterPost(postId);
    },
  });

  function ignorePost() {
    ignorePostCall();
    handleToast("Got it. You will not see this story again");
    filterPost && filterPost(postId);
  }

  function ignoreAuthor() {
    ignoreAuthorCall();
    handleToast("Got it. You will not see this author's story again");
    handleClose();
    filterAuthorPost && filterAuthorPost(userId);
  }

  function deletePost() {
    deleteStory();
  }

  function editPost() {
    navigate(`/write/${postId}`);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        paddingBottom: "40px",
        marginRight: "auto",
      }}
    >
      {showUserList && (
        <div
          className="user_post_details"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            marginBottom: "13px",
          }}
        >
          <Link to={`/user/${userId}`}>
            <img
              style={{ width: "26px", borderRadius: "50%" }}
              src={userImage}
              alt=""
            />
          </Link>
          <Link
            to={`/user/${userId}`}
            style={{
              fontSize: "14.45px",
              fontFamily: "Inter",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {username}
          </Link>
          <p
            style={{
              fontSize: "13.15px",
              color: "gray",
              fontFamily: "Inter",
            }}
          >
            <ReactTimeAgo
              date={Date.parse(timestamp)}
              locale="en-US"
              timeStyle="round"
            />
          </p>
        </div>
      )}
      {!showUserList && (
        <p
          style={{
            fontSize: "13.15px",
            color: "gray",
            fontFamily: "Inter",
            marginBottom: "10px",
          }}
        >
          <ReactTimeAgo
            date={Date.parse(timestamp)}
            locale="en-US"
            timeStyle="round"
          />
        </p>
      )}
      <div
        className="postgap"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "45px",
        }}
      >
        <div className="left_post">
          <h3
            className="post_heading"
            style={{ margin: "8px 0", marginTop: "-2px", fontSize: "22px" }}
          >
            <Link
              to={`/blog/${postId}`}
              style={{
                fontFamily: "Inter",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Link>
          </h3>
          <Link
            className="resp_summary"
            to={`/blog/${postId}`}
            style={{
              fontSize: "15.25px",
              marginTop: "10px",
              letterSpacing: "0.2px",
              lineHeight: "25px",
              fontFamily: "Inter",
              color: "rgb(80 80 80)",
              textDecoration: "none",
            }}
          >
            <div className="markdown">
              <Markdown>
                {unAuth
                  ? summary.slice(0, 130) + "..."
                  : summary.slice(0, 190) + "..."}
              </Markdown>
            </div>
          </Link>

          <div
            className="actions"
            style={{
              marginTop: "28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="left_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {tag && <Chip text={tag} />}
            </div>
            <div
              className="right_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {/* <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {savePost}
              </span>
              {showMuteicon && (
                <span
                  onClick={() => ignorePost()}
                  style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
                >
                  {mutePost}
                </span>
              )}
              {showMoreIcon && (
                <span
                  onClick={handleClick}
                  style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
                >
                  {moreIcon}
                </span>
              )} */}
              <PostMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                ignoreAuthor={ignoreAuthor}
                deletePost={deletePost}
                editPost={editPost}
                userId={userId}
              />
            </div>
          </div>
        </div>
        <Link to={`/blog/${postId}`} className="image">
          {image && (
            <img
              className="post_image"
              style={{ width: "112px", height: "112px", objectFit: "cover" }}
              src={image}
              alt=""
            />
          )}
        </Link>
      </div>
    </div>
  );
}
