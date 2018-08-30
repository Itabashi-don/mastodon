import api from '../api';

export const QUOTE_FETCH_REQUEST = 'QUOTE_FETCH_REQUEST';
export const QUOTE_FETCH_SUCCESS = 'QUOTE_FETCH_SUCCESS';
export const QUOTE_FETCH_FAIL    = 'QUOTE_FETCH_FAIL';

export function fetchQuote(id) {
  return (dispatch, getState) => {
    dispatch(fetchQuoteRequest(id));

    api(getState).get(`/api/v1/statuses/${id}/context`).then(response => {
      dispatch(importFetchedStatuses(response.data.ancestors.concat(response.data.descendants)));
      dispatch(fetchContextSuccess(id, response.data.ancestors, response.data.descendants));

    }).catch(error => {
      if (error.response && error.response.status === 404) {
        dispatch(deleteFromTimelines(id));
      }

      dispatch(fetchContextFail(id, error));
    });
  };
};

export function fetchQuoteRequest(id) {
  return {
    type: QUOTE_FETCH_REQUEST,
    id,
  };
};

export function fetchQuoteSuccess(id, ancestors, descendants) {
  return {
    type: QUOTE_FETCH_SUCCESS,
    id,
    ancestors,
    descendants,
    statuses: ancestors.concat(descendants),
  };
};

export function fetchQuoteFail(id, error) {
  return {
    type: QUOTE_FETCH_FAIL,
    id,
    error,
    skipAlert: true,
  };
};