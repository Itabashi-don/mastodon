import api from '../api';

export const QUOTE_FETCH_REQUEST =  'QUOTE_FETCH_REQUEST';
export const QUOTE_FETCH_FOUND =    'QUOTE_FETCH_FOUND';
export const QUOTE_FETCH_NOTFOUND = 'QUOTE_FETCH_NOTFOUND';

export function fetchQuote(quoteUrl, router) {
  return (dispatch, getState) => {
    dispatch(fetchQuoteRequest());

    api(getState).get('/api/v1/search', {
      params: { q: quoteUrl },
    }).then(response => {
      if (response.data.statuses[0]) {
        const quoteId = response.data.statuses[0].id;
        dispatch(fetchQuoteFound(quoteId));

        return router.push(`/statuses/${quoteId}`);
      }

      dispatch(fetchQuoteNotfound(quoteUrl));
    });
  };
};

export function fetchQuoteRequest() {
  return {
    type: QUOTE_FETCH_REQUEST,
  };
};

export function fetchQuoteFound(quoteId) {
  return {
    type: QUOTE_FETCH_FOUND,
    quoteId,
  };
};

export function fetchQuoteNotfound(url) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener";

  anchor.dispatchEvent(new MouseEvent("click"));

  return {
    type: QUOTE_FETCH_NOTFOUND,
    url,
  };
};
