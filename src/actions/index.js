import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const FETCH_HAS_ERRORED = 'FETCH_HAS_ERRORED';
export const FETCH_IS_LOADING = 'FETCH_IS_LOADING';
export const FETCH_CERVEJARIAS = 'FETCH_CERVEJARIAS';
export const FETCH_CERVEJARIA = 'FETCH_CERVEJARIA';
export const CREATE_CERVEJARIA = 'CREATE_CERVEJARIA';
export const DELETE_CERVEJARIA = 'DELETE_CERVEJARIA';
export const UPDATE_CERVEJARIA = 'UPDATE_CERVEJARIA';

export function requestCervejarias() {
  return function(dispatch) {
    dispatch(fetchIsLoading());

    return axios.get(`${API_URL}/cervejarias`)
    .then(function(response) {
      dispatch(fetchCervejarias(response));
    })
    .catch(function(response){
      dispatch(fetchHasErrored());
      dispatch(pushState(null,'/error'));
    })
  };
}

export function requestCervejaria(id) {
  return function(dispatch) {
    dispatch(fetchIsLoading());

    return axios.get(`${API_URL}/cervejarias/${id}`)
    .then(function(response) {
      dispatch(fetchCervejaria(response));
    })
    .catch(function(response){
      dispatch(fetchHasErrored());
      dispatch(pushState(null,'/error'));
    })
  };
}

export function fetchHasErrored() {
  return {
    type: FETCH_HAS_ERRORED
  };
}

export function fetchIsLoading() {
  return {
    type: FETCH_IS_LOADING
  };
}

export function fetchCervejarias(response) {
  return {
    type: FETCH_CERVEJARIAS,
    payload: response
  };
}

export function createCervejaria(props) {
  const request = axios.post(`${API_URL}/cervejarias`, props);
  return {
    type: CREATE_CERVEJARIA,
    payload: request
  };
}

export function fetchCervejaria(response) {
  return {
    type: FETCH_CERVEJARIA,
    payload: response
  };
}

export function deleteCervejaria(id) {
  const request = axios.delete(`${API_URL}/cervejarias/${id}`);
  return {
    type: DELETE_CERVEJARIA,
    payload: id
  };
}

export function updateCervejaria(props) {
  const request = axios.put(`${API_URL}/cervejarias/${props._id}`, props);
  return {
    type: UPDATE_CERVEJARIA,
    payload: request
  };
}
