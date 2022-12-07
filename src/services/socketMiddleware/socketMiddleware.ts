import { MiddlewareAPI, Middleware } from "redux";
import { store } from "../..";
import { TWSOrdersHistory } from "../../utils/typeData";
import { getCookie } from "../../utils/utils";

 type RootState = ReturnType<typeof store.getState>;
 type AppDispatch = typeof store.dispatch;

 type TAppActions = {
  type: string;
  payload?: string;
}

export const socketMiddleware =
  (wsUrl: string, wsActions: TWSOrdersHistory, auth: boolean): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => (action: TAppActions) => {
      const { dispatch } = store;

      const { type, payload } = action;
      const { wsInit, wsSendMessage, onClose, onMessage, onError } =
        wsActions;
      const accessToken = auth ? getCookie("accessToken") : null;
      const token = accessToken?.split('Bearer ')[1]
      if (type === wsInit) {
        socket = token
          ? new WebSocket(`${wsUrl}?token=${token}`)
          : new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === onClose) {
          socket.close();
        }

        if (type === wsSendMessage) {
          const message = token ? { ...payload as Object, token: token } : { ...payload as Object };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  }) as Middleware;
  };
