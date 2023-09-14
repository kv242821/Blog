import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../utils/baseUrl";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/app/appSlice";

export default function AuthRedirect() {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string | undefined>(undefined);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const [, setRefreshToken] = useLocalStorage<string | undefined>(
    "refresh_token",
    undefined
  );
  const [, setAccessToken] = useLocalStorage<string | undefined>(
    "access_token",
    undefined
  );
  const [, setUser] = useLocalStorage<any>("user", undefined);

  useEffect(() => {
    axios
      .get(`${url}/user/${query.get("uid")}`)
      .then((res) => {
        if (!res.data.success) {
          setErr("Something unexpected happened");
          clearLocalStorage();
        }
        setAccessToken(query.get("access_token") as string);
        setRefreshToken(query.get("refresh_token") as string);
        setUser(res.data);
        dispatch(login(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErr("Something unexpected happened");
        localStorage.clear();
      });
  }, [navigate, query]);

  return (
    <div className="text-center mt-10">{err ? err : "Redirecting ..."}</div>
  );
}
