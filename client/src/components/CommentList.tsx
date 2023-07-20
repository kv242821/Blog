import { Avatar, ButtonBase, Stack, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import { useQuery } from "@tanstack/react-query";

interface Props {
  postId: string;
}
type Comment = {
  comment: string;
  user: {
    name: string;
    avatar: string;
  };
};
export const CommentList = ({ postId }: Props) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  const { avatar } = JSON.parse(localStorage.getItem("user") || "");

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

  return (
    <Stack paddingX={5} paddingY={2} width={500}>
      <h1
        style={{
          fontWeight: "bolder",
          fontFamily: "Poppins",
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
          }}
        />
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <button
          onClick={handleComment}
          style={{
            backgroundColor: "black",
            outline: "transparent",
            border: `1px solid  "black`,
            borderRadius: "17px",
            padding: "7px 14px",
            cursor: "pointer",
            marginLeft: "auto",
            color: "white",
          }}
          disabled={comment.length == 0}
        >
          Comment
        </button>
      </Stack>
      <Stack direction={"column"} spacing={3} mt={5}>
        {allComments.length > 0
          ? allComments.map((comment) => (
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
              </Stack>
            ))
          : null}
      </Stack>
    </Stack>
  );
};
