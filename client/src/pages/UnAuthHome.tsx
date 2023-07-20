import { useEffect } from "react";
import { useAppContext } from "../App";
import Explore from "../components/Explore";
import UnAuthNavbar from "../components/UnAuthNavbar";

export default function UnAuthHome() {
  const { hideNavbar } = useAppContext();
  useEffect(() => {
    hideNavbar(true);
    document.title = "The Blog – Share, Engage, Inspire.";
    return () => hideNavbar(false);
  }, []);
  return (
    <div>
      <UnAuthNavbar />
      <Explore />
    </div>
  );
}
