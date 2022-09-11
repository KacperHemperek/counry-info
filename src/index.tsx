import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url, init) => fetch(url, init).then((res) => res.json()),
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
