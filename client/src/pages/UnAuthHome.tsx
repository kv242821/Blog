import { useEffect } from "react";
import { useAppContext } from "../App";
import Explore from "../components/Explore";
import UnAuthNavbar from "../components/UnAuthNavbar";

export default function UnAuthHome() {
  const { hideNavbar } = useAppContext();
  useEffect(() => {
    hideNavbar(true);
    document.title = "Medium – Where good ideas find you.";
    return () => hideNavbar(false);
  }, []);
  return (
    <div>
      <UnAuthNavbar />
      <Explore />
    </div>
  );
}
