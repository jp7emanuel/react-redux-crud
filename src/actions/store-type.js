import axios from 'axios';

export const FETCH_STORETYPES = 'FETCH_STORETYPES';

const API_URL = 'http://localhost:8080/api';

export function requestStoreTypes() {
  return function(dispatch) {
    return axios.get(`${API_URL}/store-types`)
    .then(function(response) {
      dispatch(fetchStoreTypes(response));
    });
  };
}

export function saveStoreType(storeType) {
  return function(dispatch) {
    return axios.post(`${API_URL}/store-types`, { data: storeType })
    .then(function(response) {
      return response.data;
    })
  };
}

export function fetchStoreTypes(response) {
  return {
    type: FETCH_STORETYPES,
    payload: response
  };
}
