import { Dispatch } from "@reduxjs/toolkit"
import { setConversations } from "../../store/reducers/conversation"

interface InitialMiddlewareParams {
  dispatch: Dispatch
  getState: any
}

export default function initialMiddleware()  {
  return (params: InitialMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch(type) {
      case 'auth/initialise/fulfilled':
        dispatch(setConversations(payload.conversations));
        break;
    }

    return next(action);
  }
}