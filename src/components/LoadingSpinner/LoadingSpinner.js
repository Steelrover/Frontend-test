import React, { Component } from 'react';
import './LoadingSpinner.scss';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="load-spinner">
        <div className="load-spinner__element load-spinner__element-first"/>
        <div className="load-spinner__element load-spinner__element-second"/>
        <div className="load-spinner__element load-spinner__element-third"/>
        <div className="load-spinner__element load-spinner__element-fourth"/>
      </div>
    )
  }
}

export default LoadingSpinner;
