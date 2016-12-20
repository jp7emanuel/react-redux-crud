import { FETCH_CERVEJARIAS, FETCH_CERVEJARIA } from '../actions/index';

const INITIAL_STATE = {all: [], cervejaria: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CERVEJARIAS:
      return { ...state, all: action.payload.data };
    case FETCH_CERVEJARIA:
      return { ...state, cervejaria: action.payload.data };
    default:
      return state;
  }
}
