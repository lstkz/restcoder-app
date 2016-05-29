import React, {PropTypes} from 'react';
import styles from './Paginate.scss';
import {Link} from 'react-router';
import classNames from 'classnames';

export default class Paginate extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
  };

  renderPage(item) {
    const {baseUrl} = this.props;
    if (item.separator) {
      return (
        <li><span>...</span></li>
      );
    }
    return (
      <li key={item.page} className={classNames({active: item.active})}>
        <Link to={baseUrl + '?' + item.qs}>{item.page}</Link>
      </li>
    );
  }

  renderPrevNext(text, name) {
    const {pagination, baseUrl} = this.props;
    const disabled = !pagination[name].active;
    return (
      <li className={classNames(text, {disabled})}>
        {!disabled && <Link to={baseUrl + '?' + pagination[name].qs} >{text}</Link>}
        {disabled && <span>{text}</span>}
      </li>
    );
  }

  render() {
    const {pagination} = this.props;
    if (pagination.pageCount < 2) {
      return null;
    }
    const {pages} = pagination;

    return (
      <div className={classNames(styles.Paginate, '')}>
        <div className="pagination">
          <ul>
            {this.renderPrevNext('previous', 'prev')}
            {pages.map(::this.renderPage)}
            {this.renderPrevNext('next', 'next')}
          </ul>
        </div>
      </div>
    );
  }
}
