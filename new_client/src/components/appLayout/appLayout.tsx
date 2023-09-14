import { ReactNode } from "react";
import Navbar from "./navbar";

interface IAppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: IAppLayoutProps) {
  // -- [PARAMS] --

  // -- [FUNCTIONS] --

  // -- [HOOKS] --
  return (
    <>
      <Navbar />
      <div className="px-4">{children}</div>
    </>
  );
}

export default AppLayout;
