import api from '../api';

export const QUOTE_FETCH_REQUEST = 'QUOTE_FETCH_REQUEST';
export const QUOTE_FETCH_SUCCESS = 'QUOTE_FETCH_SUCCESS';
export const QUOTE_FETCH_FAIL    = 'QUOTE_FETCH_FAIL';

export function fetchQuote(quoteUrl, router) {
  return (dispatch, getState) => {
    dispatch(fetchQuoteRequest());

    api(getState).get('/api/v1/search', {
      params: { q: quoteUrl },
    }).then(response => {
      if (response.data.statuses[0]) {
        const quoteId = response.data.statuses[0].id;
        dispatch(fetchQuoteSuccess(quoteId));

        router.push(`/statuses/${quoteId}`);
      }
    }).catch(error => {
      dispatch(fetchQuoteFail(quoteUrl, error));
    });
  };
};

export function fetchQuoteRequest() {
  return {
    type: QUOTE_FETCH_REQUEST,
  };
};

export function fetchQuoteSuccess(quoteId) {
  return {
    type: QUOTE_FETCH_SUCCESS,
    quoteId,
  };
};

export function fetchQuoteFail(quoteUrl, error) {
  return {
    type: QUOTE_FETCH_FAIL,
    quoteUrl,
    error,
  };
};