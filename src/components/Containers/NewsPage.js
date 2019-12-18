import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticlePreview from '../ArticlePreview/ArticlePreview.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';

import fetchArticlesAction from '../../actions/api.js';
import {fetchArticlesReplace} from '../../actions/actions.js';

import {
  getArticlesError,
  getArticles,
  getArticlesPage,
  getArticlesPending
} from '../../reducers/reducer.js';

import './NewsPage.scss';

import viewsIcon from "../../icons/ic_remove_red_eye_black_24dp_1x.png";

class NewsPage extends Component {

  fetchNews = () => {
    const {fetchArticles} = this.props;
    fetchArticles({
      id: this.props.id,
      marker: 'all',
      clearPage: true,
    });
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchNews();
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    this.props.clearPage();
  }

  render() {
    //Forming articles previews
    let previews = [];
    const news = this.props.articles[0];

    this.props.articles.forEach((item, i) => {
      if (i > 0 && i < 5) {
          let newsPreview = <ArticlePreview
            key={item.id}
            article={item}
          />;
          previews.push(newsPreview);
      }
    });

    previews = previews.slice(0, 3);

    if (this.props.error) {
      return <div className="error">{`Ошибка: ${this.props.error}`}</div>
    }
    if (this.props.isPending) return <LoadingSpinner/>

    return(
      <div className="news-page-container">

        { this.props.articles[0] &&
           <div className="news-photo" src={news.photo}></div> }

        { this.props.articles[0] &&
          <div className="news-content">
            <div className="news-content__header">
              <div className="news-content__views">
                <img src={viewsIcon} alt="icon" className="news-content__views-icon"/>
                <p className="news-content__views-count">{news.views}</p>
              </div>
              <div className="news-content__date">{news.date}</div>
            </div>
            <div className="news-content__title">{news.caption}</div>
            <div className="news-content__text">{news.text}</div>
          </div> }

        { this.props.articles[0] &&
          <div className="news-preview">
            {previews}
          </div> }

      </div>
    )
  }
}

const mapStateToProps = state => ({
    error: getArticlesError(state),
    articles: getArticles(state),
    page: getArticlesPage(state),
    isPending: getArticlesPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    clearPage: () => (dispatch) => dispatch(fetchArticlesReplace([])),
    fetchArticles: fetchArticlesAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsPage);
