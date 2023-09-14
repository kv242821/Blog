import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Topic from "../topic/topic";
import Markdown from "./markdown";

interface IPostCardProps {
  postId: string;
  title: string;
  summary: string;
  postImage: string;
  userId: string;
  userName: string;
  userAvatar: string;
  tags: Array<string>;
  timestamp: string;
}

export default function PostCard({
  postId,
  title,
  summary,
  postImage,
  userId,
  userName,
  userAvatar,
  tags,
  timestamp,
}: IPostCardProps) {
  // -- [PARAMS] --

  // -- [FUNCTIONS] --

  // -- [HOOKS] --
  return (
    <div className="p-4 flex justify-between">
      <div className="flex flex-col">
        <div className="text-sm flex items-center">
          <Link to={`/user/${userId}`}>
            <img
              className="h-8 w-8 rounded-full mr-4"
              src={userAvatar}
              alt="avt"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/user/${userId}`}>
              <div className="text-gray-700 font-medium">{userName}</div>
            </Link>
            <ReactTimeAgo
              date={Date.parse(timestamp)}
              locale="en-US"
              timeStyle="round"
            />
          </div>
        </div>

        <Link
          to={`/post/${postId}`}
          className="text-xl text-gray-700 font-bold my-3"
        >
          {title}
        </Link>

        <Link
          to={`/post/${postId}`}
          className="text-md text-gray-400 font-normal line-clamp-3"
        >
          <Markdown>{summary}</Markdown>
        </Link>
        <div className="mt-3 max-w-min">
          <Topic name={tags?.[0]} />
        </div>
      </div>

      <div className="ml-5 flex items-center">
        <Link
          to={`/post/${postId}`}
          className="w-28 h-28 xl:w-36 xl:h-36 overflow-hidden flex items-center"
        >
          <img src={postImage} />
        </Link>
      </div>
    </div>
  );
}
