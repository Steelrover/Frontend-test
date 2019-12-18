import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_REPLACE,
  FETCH_ARTICLES_ADD,
  FETCH_ARTICLES_ERROR
} from '../actions/actions.js';

const initState = {
  isPending: false,
  articles: [],
  error: null,
}

export function articlesReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING:
      return {
        ...state,
        isPending: true
      }
    case FETCH_ARTICLES_REPLACE:
      return {
        ...state,
        isPending: false,
        articles: action.articles,
        page: action.page,
        isShowMore: !(action.articles.length < 6),
      }
    case FETCH_ARTICLES_ADD:
      return {
        ...state,
        isPending: false,
        articles: [...state.articles, ...action.articles],
        page: action.page,
        isShowMore: action.articles.length >= 6,
      }
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.error,
      }
    default: return state;
  }
}

export const getArticles = state => state.articles;
export const getArticlesPage = state => state.page;
export const getArticlesPending = state => state.isPending;
export const getArticlesError = state => state.error;
export const getArticlesShowMore = state => state.isShowMore;
