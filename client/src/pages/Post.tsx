import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import Markdown from "../components/Markdown";
import Chip from "../components/Chip";
import {
  clapIcon,
  commentIcon,
  moreIcon,
  savePost,
  shareicon,
} from "../assets/icons";
import TopPicks from "../components/TopPicks";
import UserPostCard from "../components/UserPostCard";
import PostAuthor from "../components/PostAuthor";
import useShare from "../hooks/useShare";
import { useMemo, useState } from "react";
import { useAuth } from "../contexts/Auth";
import MoreFrom from "../components/MoreFrom";
import { useAppContext } from "../App";
import PostMenu from "../components/PostMenu";
import { Drawer } from "@mui/material";
import { CommentList } from "../components/CommentList";

export default function Post() {
  const { webShare } = useShare();
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const postUrl = useMemo(() => window.location.href, [id]);
  const [votes, setVotes] = useState(0);
  const [turnBlack, setTurnBlack] = useState(false);
  const { socket } = useAppContext();
  const navigate = useNavigate();
  const { handleToast } = useAppContext();

  const { isLoading, error, data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/${id}`),
    queryKey: ["blog", id],
    onSuccess: (data) => {
      document.title = data.data.post.title;
      setVotes(data.data.post.votes.length ?? 0);
      setTurnBlack(data.data.post.votes.includes(user?._id));
    },
  });
  console.log(data?.data);

  const { refetch: clap } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/post/vote/${id}`),
    queryKey: ["vote", id],
    enabled: false,
    onSuccess: (res) => {
      if (res.data.success) {
        socket.emit("notify", { userId: data?.data.user._id });
        setVotes((prev) => prev + 1);
      }
    },
  });
  function votePost() {
    setTurnBlack(true);
    clap();
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);

  const { refetch: ignoreAuthorCall } = useQuery({
    queryFn: () =>
      httpRequest.patch(`${url}/post/ignoreAuthor/${data?.data.user._id}`),
    queryKey: ["ignoreAuthor", data?.data.user._id],
    enabled: false,
  });

  const { refetch: deleteStory } = useQuery({
    queryFn: () => httpRequest.delete(`${url}/post/${id}`),
    queryKey: ["delete", "page", id],
    enabled: false,
    onSuccess() {
      handleToast("Story deleted successfully");
      handleClose();
      navigate(-1);
    },
  });

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function deletePost() {
    deleteStory();
  }

  function editPost() {
    navigate(`/write/${id}`);
  }

  function ignoreAuthor() {
    ignoreAuthorCall();
    handleToast("Got it. You will not see this author's story again");
    handleClose();
  }

  if (error) return <p>Something went wrong ...</p>;
  if (isLoading) return <p>Loading ...</p>;

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <Drawer
        open={openCommentDrawer}
        anchor="right"
        onClose={() => setOpenCommentDrawer(false)}
      >
        <CommentList postId={id || ""} ownerId={data?.data.user._id} />
      </Drawer>

      <div
        className="postsList"
        style={{
          borderRight: "solid 1px rgba(242, 242, 242, 1)",
          width: "69%",
          paddingTop: "3vh",
          minHeight: "97vh",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
          marginRight: "auto",
        }}
      >
        <div
          className="post_content"
          style={{
            width: "90%",
            marginRight: "auto",
          }}
        >
          {data?.data && (
            <PostAuthor
              title={data.data.post.title}
              avatar={data.data.user.avatar}
              postId={data.data.post._id}
              timestamp={data.data.post.createdAt}
              username={data.data.user.name}
              userId={data.data.user._id}
              postUrl={postUrl}
              anchorEl={anchorEl}
              deletePost={deletePost}
              open={open}
              handleClose={handleClose}
              editPost={editPost}
              ignoreAuthor={ignoreAuthor}
              handleClick={handleClick}
            />
          )}
          <h1
            style={{
              fontWeight: "bolder",
              fontFamily: "Inter",
              fontSize: "32px",
              marginBottom: "18px",
            }}
          >
            {data?.data?.post.title}
          </h1>
          <div className="markdown">
            <Markdown>{data?.data?.post?.markdown}</Markdown>
          </div>
          <div
            className="bottomScreen"
            style={{
              marginTop: "60px",
            }}
          >
            <div className="relatedTags">
              {data?.data?.post.tags.map((item: string) => {
                return (
                  <Chip
                    key={item}
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                      fontFamily: "Inter",
                      padding: "10px 18px",
                      margin: "4.5px 3px",
                      fontSize: "13.8px",
                    }}
                    text={item}
                  />
                );
              })}
            </div>
            <div
              className="post_reach"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "5vh 0",
              }}
            >
              <div
                className="left_tile"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    onClick={() =>
                      data?.data.post.userId !== user?._id && votePost()
                    }
                    style={{
                      ...iconColor,
                      color: turnBlack ? "black" : "rgb(171 169 169)",
                      cursor:
                        data?.data.post.userId == user?._id
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {clapIcon}
                  </span>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontFamily: "Inter",
                    }}
                  >
                    {votes || 0}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={iconColor}
                    onClick={() => setOpenCommentDrawer(true)}
                  >
                    {commentIcon}
                  </span>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontFamily: "Inter",
                    }}
                  >
                    {data?.data.post.comments.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {id && data?.data?.user._id && (
            <MoreFrom
              userId={data?.data?.user._id}
              postId={id}
              avatar={data?.data?.user.avatar}
              username={data?.data?.user.name}
              bio={data.data?.user?.bio}
              followers={data.data?.user?.followers}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const iconColor = {
  color: "rgba(117, 117, 117, 1)",
  cursor: "pointer",
};
