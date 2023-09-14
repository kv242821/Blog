import { useEffect, useState } from "react";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";
import { useAppSelector } from "../redux/hooks";
import PostCard from "../components/post/postCard";
import Topic from "../components/topic/topic";

export default function Home() {
  // -- [PARAMS] --
  const { isAuthenticated, userInfo } = useAppSelector((state) => state.app);
  const [posts, setPosts] = useState<Array<any>>();
  const [topics, setTopics] = useState<Array<any>>();

  // -- [FUNCTIONS] --

  // -- [HOOKS] --
  useEffect(() => {
    async function getPosts() {
      let res = await httpRequest.get(
        `${url}/post/${isAuthenticated ? "home" : "explore"}`
      );
      setPosts(res.data);
    }
    async function getTopics() {
      let res = await httpRequest.get(
        `${url}/post/suggest/topics?userId=${userInfo?._id}`
      );
      setTopics(res.data);
    }

    getPosts();
    getTopics();
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto my-6">
      <div className="grid grid-cols-none md:grid-cols-3">
        <div className="col-span-2 md:mr-10">
          {posts?.map((item, index, { length }) => {
            return (
              <div key={item?.post._id} className="relative" onClick={() => {}}>
                <PostCard
                  postId={item?.post._id}
                  title={item?.post.title}
                  summary={item?.post.summary}
                  postImage={item?.post.image}
                  userId={item?.user._id}
                  userName={item?.user.name}
                  userAvatar={item?.user.avatar}
                  tags={item?.post.tags}
                  timestamp={item?.post.createdAt}
                />
                {index !== length - 1 && (
                  <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="col-span-1">
          <div className="text-md font-semibold text-gray-500 ml-3 mb-5">
            Hot Topics
          </div>
          {topics?.map((item, index, { length }) => {
            return (
              <div
                key={item?._id}
                className={`inline-block mx-3 mb-3 cursor-pointer ${
                  index === length - 1 && "mr-0"
                }`}
                onClick={() => {}}
              >
                <Topic name={item?.name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
