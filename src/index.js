// import { StrictMode } from "react";
import store from "./redux-axios-mini-assign/store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
