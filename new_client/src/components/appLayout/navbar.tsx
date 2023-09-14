import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/app/appSlice";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { clearLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

type MyRefType = HTMLDivElement | null;

function Navbar() {
  // -- [PARAMS] --
  const dispatch = useAppDispatch();
  const { isAuthenticated, userInfo } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const [isShowUserMenu, setIsShowUserMenu] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const ref = useRef<MyRefType>(null);

  // -- [FUNCTIONS] --
  function handleGoogleAuth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  }

  async function handleLogout() {
    await httpRequest.post(`${url}/auth/logout`, {
      refresh_token: JSON.parse(
        localStorage.getItem("refresh_token") as string
      ),
    });
    clearLocalStorage();
    dispatch(logout());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log(searchText);
    }
  }

  // -- [HOOKS] --
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-white">
      <div className="relative container mx-auto px-3">
        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5"></div>
        <div className="relative flex h-16 items-center justify-between">
          <img
            className="h-8 w-auto cursor-pointer"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          />
          <label className="relative block mx-4 w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </span>
            <input
              className="placeholder:text-slate-400 text-gray-500 text-sm block bg-white w-full border rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onKeyUp={handleKeyDown}
            />
          </label>
          {!isAuthenticated ? (
            <button
              className="text-gray-500 font-medium rounded-lg text-sm pl-3 pr-2 py-1.5 focus:outline-none flex items-center border"
              onClick={handleGoogleAuth}
            >
              Login
              <svg width="25" height="25" className="ml-2">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
                    fill="#EA4335"
                  ></path>
                </g>
              </svg>
            </button>
          ) : (
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                className="text-gray-500 font-medium rounded-lg text-sm mr-3 px-3 py-2 focus:outline-none flex items-center border"
                onClick={() => navigate("/post/write")}
              >
                New Post
              </button>

              <button className="relative rounded-full p-1 text-gray-400 hover:text-gray-700">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button
                    className="relative flex rounded-full text-sm"
                    onClick={() => setIsShowUserMenu(true)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userInfo?.avatar}
                      alt=""
                    />
                  </button>
                </div>

                <div
                  ref={ref}
                  className={`${
                    !isShowUserMenu && "hidden"
                  } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={() => {}}
                  >
                    Your Profile
                  </div>

                  <div
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
