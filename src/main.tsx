import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { store } from "./app/store.tsx";
import { Provider } from "react-redux";

const AppWrapper = () => {
  const AppStore = store;
  return (
    <Provider store={AppStore}>
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
