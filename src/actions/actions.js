export const FETCH_ARTICLES_PENDING = 'FETCH_ARTICLES_PENDING';
export const FETCH_ARTICLES_REPLACE = 'FETCH_ARTICLES_REPLACE';
export const FETCH_ARTICLES_ADD = 'FETCH_ARTICLES_ADD';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';

export function fetchArticlesPending() {
    return {
        type: FETCH_ARTICLES_PENDING,
    }
}

export function fetchArticlesReplace(articles) {
    return {
        type: FETCH_ARTICLES_REPLACE,
        articles: articles,
        page: 1
    }
}

export function fetchArticlesAdd(articles, page) {
    return {
        type: FETCH_ARTICLES_ADD,
        articles: articles,
        page: page
    }
}

export function fetchArticlesError(error) {
    return {
        type: FETCH_ARTICLES_ERROR,
        error: error
    }
}
