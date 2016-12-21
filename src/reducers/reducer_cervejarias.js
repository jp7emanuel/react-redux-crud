import { FETCH_CERVEJARIAS, FETCH_CERVEJARIA, UPDATE_CERVEJARIA, DELETE_CERVEJARIA, FETCH_HAS_ERRORED } from '../actions/index';
import update from 'react-addons-update'; // ES6
import { omit } from 'lodash';

const INITIAL_STATE = {
  all: [],
  cervejaria: null,
  isLoading: true,
  error: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_HAS_ERRORED:
      return update(state, {
        $merge: {
          isLoading: false,
          error: true
        }
      });
    case FETCH_CERVEJARIAS:
      return update(state, {
        $merge: {
          all: action.payload.data,
          isLoading: false,
          error: false
        }
      });
    case FETCH_CERVEJARIA:
    case UPDATE_CERVEJARIA:
      return { ...state, cervejaria: action.payload.data };
    case DELETE_CERVEJARIA:
      return update(state.all, {
        $set: {
          all: Object.values(omit(state.all, function (item) {
            return item._id === action.payload;
          }))
        }
      });
    default:
      return state;
  }
}
