import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const FETCH_CERVEJARIAS = 'FETCH_CERVEJARIAS';

const FIREBASE_URL = 'https://crud-redux.firebaseio.com/';

export function fetchCervejarias() {
  var request = axios.get(`${API_URL}/cervejarias`);
  return {
    type: FETCH_CERVEJARIAS,
    payload: request
  };
}
