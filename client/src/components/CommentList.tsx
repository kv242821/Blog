import { Avatar, ButtonBase, Stack, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import { useQuery } from "@tanstack/react-query";
import { iconColor } from "../pages/Post";
import { moreIcon, trashIcon } from "../assets/icons";

interface Props {
  postId: string;
  ownerId: string;
}

type Comment = {
  _id: string;
  comment: string;
  user: {
    name: string;
    avatar: string;
  };
};
export const CommentList = ({ postId, ownerId }: Props) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const { _id, avatar } = JSON.parse(localStorage.getItem("user") || "");

  const { refetch: getAllComments } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/comments/${postId}`),
    queryKey: ["comment"],
    enabled: true,
    onSuccess(data) {
      setAllComments(data.data);
    },
  });

  console.log(allComments);

  const { refetch: makeComment } = useQuery({
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("comment", comment);
      return httpRequest.put(`${url}/post/comment/${postId}`, params);
    },
    queryKey: ["comment", "blog", "post"],
    enabled: false,
    onSuccess() {
      getAllComments();
    },
  });

  const handleComment = () => {
    makeComment();
    setComment("");
  };

  interface Card {
    comment: Comment;
  }
  const CommentCard = ({ comment }: Card) => {
    const { refetch: deleteComment } = useQuery({
      queryFn: () => {
        const params = new URLSearchParams();
        params.append("commentId", comment._id);
        return httpRequest.delete(`${url}/post/comment/${postId}`, {
          data: params,
        });
      },
      queryKey: ["delete", comment._id],
      enabled: false,
      onSuccess() {
        getAllComments();
      },
    });

    return (
      <Stack direction={"row"} alignContent={"start"} spacing={2}>
        <Avatar src={comment?.user?.avatar} />
        <Stack
          direction={"column"}
          width={"100%"}
          bgcolor={"#F2F3F5"}
          padding={2}
          borderRadius={3}
        >
          <h5>{comment.user.name}</h5>
          <text>{comment.comment}</text>
        </Stack>
        {ownerId == _id ? (
          <span style={iconColor} onClick={() => deleteComment()}>
            {trashIcon}
          </span>
        ) : null}
      </Stack>
    );
  };

  return (
    <Stack paddingX={5} paddingY={2} width={500}>
      <h1
        style={{
          fontWeight: "bolder",
          fontFamily: "Inter",
          fontSize: "24px",
          marginBottom: "18px",
        }}
      >
        Comments
      </h1>
      <Stack direction={"row"} spacing={3} alignItems={"center"}>
        <Avatar src={avatar} />
        <TextareaAutosize
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
          value={comment}
          placeholder="Leave you comment"
          style={{
            width: "100%",
            fontSize: "20px",
            border: "none",
            outline: "transparent",
            resize: "none",
            fontFamily: "Inter",
          }}
        />
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <button
          onClick={handleComment}
          className="button-custom"
          style={{
            marginLeft: "auto",
          }}
          disabled={comment.length == 0}
        >
          Comment
        </button>
      </Stack>
      <Stack direction={"column"} spacing={3} mt={5}>
        {allComments.length > 0
          ? allComments.map((comment) => <CommentCard comment={comment} />)
          : null}
      </Stack>
    </Stack>
  );
};
