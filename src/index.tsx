import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers";
import { wsOrdersHistoryActions } from "./services/actions/typeWsOrdersHistoryAction";
import { socketMiddleware } from "./services/socketMiddleware";
import { ws_url_all, ws_url_user } from "./utils/data";
import { wsUserOrdersHistoryActions } from "./services/actions/typeWsUserOrdersHistoryAction";
import {
  WS_ORDERS_HISTORY_CLOSE,
  WS_ORDERS_HISTORY_ERROR,
  WS_USER_ORDERS_HISTORY_CLOSE,
  WS_USER_ORDERS_HISTORY_ERROR,
} from "./services/actions/ws";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          WS_ORDERS_HISTORY_CLOSE,
          WS_USER_ORDERS_HISTORY_CLOSE,
          WS_ORDERS_HISTORY_ERROR,
          WS_USER_ORDERS_HISTORY_ERROR
        ],
      },
    }).concat(
      socketMiddleware(ws_url_user, wsUserOrdersHistoryActions, true),
      socketMiddleware(ws_url_all, wsOrdersHistoryActions, false)
    ),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
