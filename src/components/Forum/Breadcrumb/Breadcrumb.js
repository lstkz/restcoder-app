import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class Breadcrumb extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired
  };

  formatText(text) {
    if (text === '[[global:home]]') {
      return 'Forum';
    }
    return text;
  }

  renderItem(item, last) {
    if (!item.url || last) {
      return (
        <li className="active">
            <span>
              {this.formatText(item.text)}
            </span>
        </li>
      );
    }
    return (
      <li>
        <Link to={`/forum${item.url}`}>
          <span>
            {this.formatText(item.text)}
          </span>
        </Link>
      </li>);
  }

  render() {
    const {breadcrumbs} = this.props;

    return (
      <ol className="breadcrumb">
        {breadcrumbs.map((item, i) => this.renderItem(item, i + 1 === breadcrumbs.length))}
      </ol>
    );
  }
}