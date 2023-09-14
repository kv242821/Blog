import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AppLayout from "./components/appLayout/appLayout";
import PageNotFound from "./pages/pageNotFound";
import Write from "./pages/write";
import Authentication from "./routers/authentication";
import AuthRedirect from "./pages/authRedirect";
import Post from "./pages/post";

function App() {
  // -- [PARAMS] --

  // -- [FUNCTIONS] --

  // -- [HOOKS] --

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route
          path="/post/write"
          element={
            <Authentication>
              <Write />
            </Authentication>
          }
        />

        <Route path="/oauth/redirect" element={<AuthRedirect />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
