import {
  fetchArticlesPending,
  fetchArticlesReplace,
  fetchArticlesAdd,
  fetchArticlesError,
} from './actions.js';

function formatViews(views) {
  let viewsString = views.toString();

  if (views > 1000000) {
    viewsString = `${viewsString.slice(-9, -6) + "  " + viewsString.slice(-6, -3) + "  " + viewsString.slice(-3)}`;
  } else if (views > 1000) {
    viewsString = `${viewsString.slice(-6, -3) + "  " + viewsString.slice(-3)}`;
  }
  return viewsString;
}

function uniqueArray(array) {
  const ids = new Set();
  const newArray = array.filter(item => {
    if (ids.has(item.id)) {
      return false
    }
    ids.add(item.id);
    return true;
  });
  return newArray;
}

function fetchArticles({page = 1, marker = '', id, clearPage}) {
    return async (dispatch) => {
      try {
        dispatch(fetchArticlesPending());

        const serverUrl = 'https://my-json-server.typicode.com/steelrover/Test-news-list-site/articles';
        let filterParameter = marker === 'all' ? '' : 'marker=' + marker;

        if (id) filterParameter = 'id=' + id;

        const startQuery = async (queryParameter) => {
          let url = `${ serverUrl + '?'
          + queryParameter + '&_page=' + page + '&_limit=6'}`;

          const response = await fetch(url);
          let data = await response.json();

          if (data.error) {
            throw(data.error);
          }

          data = data.map((item) => {
            item.views = formatViews(item.views);
            return item;
          });

          return data;
        }

        let articles = await startQuery(filterParameter);

        if (id && marker) {
          filterParameter = marker === 'all' ? '' : 'marker=' + marker;
          articles = uniqueArray([
             ...articles,
             ...await startQuery(filterParameter, false)
           ]);
        }
        clearPage
          ? dispatch(fetchArticlesReplace(articles))
          : dispatch(fetchArticlesAdd(articles, page));
      } catch(err) {
        dispatch(fetchArticlesError(err));
      }

    }
}

export default fetchArticles;
