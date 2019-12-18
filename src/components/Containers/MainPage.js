import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticlePreview from '../ArticlePreview/ArticlePreview.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';

import fetchArticlesAction from '../../actions/api.js';
import {
  getArticlesError,
  getArticles,
  getArticlesPage,
  getArticlesPending,
  getArticlesShowMore,
} from '../../reducers/reducer.js';

import './MainPage.scss';

class MainPage extends Component {

  // Initial fetch
  componentDidMount() {
    this.props.fetchArticles({
      page: 1,
      marker: this.props.match.params.marker,
      clearPage: true,
    });
  }

  // Fetch if currentMarker changed
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.marker !== this.props.match.params.marker) {
      this.props.fetchArticles({
        page: 1,
        marker: this.props.match.params.marker,
        clearPage: true,
      });
    }
  }

  render() {
    // Forming array of JSX objects
    let articles = this.props.articles.map((articleObject) =>
      <ArticlePreview key={articleObject.id} article={articleObject} />)

    if (this.props.error) {
      return <div className="error">{`Ошибка: ${this.props.error}`}</div>
    }

    return (
      <main className="main-page-container">

        {this.props.isPending && <LoadingSpinner/>}
        <div className="articles-container">
          <div className="articles-wrap">
            {articles}
          </div>
        </div>

        { this.props.isShowMore &&
          <div className="pagination">
            <p className="pagination__show-more-button"
               onClick={() => {
                 this.props.fetchArticles({
                   page: this.props.page + 1,
                   marker: this.props.match.params.marker,
                   clearPage: false,
                 })
               }}>Загрузить еще</p>
          </div>}

      </main>
    )
  }
}

const mapStateToProps = state => ({
    error: getArticlesError(state),
    articles: getArticles(state),
    page: getArticlesPage(state),
    isPending: getArticlesPending(state),
    isShowMore: getArticlesShowMore(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchArticles: fetchArticlesAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
