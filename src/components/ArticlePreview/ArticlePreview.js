import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './ArticlePreview.scss';

import viewsIcon from "../../icons/ic_remove_red_eye_black_24dp_1x.png";

class ArticlePreview extends Component {

  render() {
    // Set marker text
    let marker = "";
    switch (this.props.article.marker) {
      case "blog":
        marker = "БЛОГ"
        break;
      case "news":
        marker = "НОВОСТИ"
        break;
      case "promotion":
        marker = "АКЦИИ"
        break;
      default: break;
    }

    return (
      <div className="article-preview">
        <div className="article-preview__wrap">

          <div className="article-preview__photo"
               style={{backgroundImage: `url('${this.props.article.img}')`}}/>

          <div className="article-preview__content">

            <div className="article-preview__header">
              <Link
                to={`/main/${this.props.article.marker}`}
                className={`article-preview__marker ${'article-preview__marker_'
                   + this.props.article.marker}`}
                >{marker}</Link>
              <p className="article-preview__date">
                {this.props.article.date}
              </p>
            </div>

            <div className="article-preview__body">
              <h4 className="article-preview__title">
                {this.props.article.caption}
              </h4>
              <p className="article-preview__text">
                {this.props.article.text}
              </p>
            </div>

            <div className="article-preview__footer">
              <Link to={`/news/${this.props.article.id}`}
                    className="article-preview__link">Читать далее</Link>
              <div className="article-preview__views">
                <img src={viewsIcon}
                     alt="icon"
                     className="article-preview__views-icon"/>
                <p className="article-preview__views-count">
                  {this.props.article.views}
                </p>
              </div>
            </div>

            <div className="article-preview__gradient"/>

          </div>

        </div>
      </div>
    )
  }
}

export default ArticlePreview;
