import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";

interface IComment {
  _id: string;
  userId: string;
  comment: string;
}

interface IPost {
  postId: string;
  title: string;
  summary: string;
  userId: string;
  tags: Array<string>;
  votes: Array<string>;
  comments: Array<IComment>;
}

export default function Post() {
  // -- [PARAMS] --
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  // -- [FUNCTIONS] --

  // -- [HOOKS] --
  useEffect(() => {
    if (id)
      httpRequest.get(`${url}/post/${id}`).then((res) => setPost(res.data));
  }, [id]);

  return <div className="container mx-auto">Post</div>;
}
