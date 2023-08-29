import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import Auth from "./contexts/Auth";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <App />
        </Auth>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
