import { FETCH_CERVEJARIAS } from '../actions/index';

const INITIAL_STATE = {all: [], cervejaria: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CERVEJARIAS:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
