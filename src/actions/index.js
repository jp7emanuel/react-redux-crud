import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const FETCH_CERVEJARIAS = 'FETCH_CERVEJARIAS';
export const CREATE_CERVEJARIA = 'CREATE_CERVEJARIA';

export function fetchCervejarias() {
  const request = axios.get(`${API_URL}/cervejarias`);
  return {
    type: FETCH_CERVEJARIAS,
    payload: request
  };
}

export function createCervejaria(props) {
  const request = axios.post(`${API_URL}/cervejarias`, props);

  return {
    type: CREATE_CERVEJARIA,
    payload: request
  };
}