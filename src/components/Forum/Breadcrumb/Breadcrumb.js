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
        <li key={item.text} className="active">
            <span dangerouslySetInnerHTML={{__html: this.formatText(item.text)}}>
            </span>
        </li>
      );
    }
    return (
      <li>
        <Link key={item.url} to={`${item.url === '/' ? '/forum' : item.url}`}>
          <span dangerouslySetInnerHTML={{__html: this.formatText(item.text)}}>
          </span>
        </Link>
      </li>);
  }

  render() {
    const {breadcrumbs} = this.props;
    if (!breadcrumbs) {
      return null;
    }

    return (
      <ol className="breadcrumb">
        {breadcrumbs.map((item, i) => this.renderItem(item, i + 1 === breadcrumbs.length))}
      </ol>
    );
  }
}
