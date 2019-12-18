import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './Header.scss';

class Header extends Component {

  render() {
    let path = this.props.location.pathname;

    let paths = ['/main/all', '/main/blog', '/main/news', '/main/promotion']

    if (!paths.includes(this.props.location.pathname)) {
      path = '/main/all'
    }

    return (
      <header className="header">
        <div className="header__wrap">
          <Link
            to="/main/all"
            className={`header__button ${path === '/main/all' ? "header__button_active" : ""}`}
          >Все</Link>
          <Link
            to="/main/blog"
            className={`header__button ${path === '/main/blog' ? "header__button_active" : ""}`}
          >Блог</Link>
          <Link
            to="/main/news"
            className={`header__button header__button_medium ${path === '/main/news' ? "header__button_active" : ""}`}
          >Новости</Link>
          <Link
            to="/main/promotion"
            className={`header__button ${path === '/main/promotion' ? "header__button_active" : ""}`}
          >Акции</Link>
        </div>
      </header>
    )
  }
}

Header = withRouter(Header);

export default Header;
