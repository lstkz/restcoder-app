import React, {PropTypes} from 'react';

export default class ExternalLink extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  render() {
    const {href, children} = this.props;
    return (
      <a target="_blank" href={href}>{children} <small><i className="fa fa-external-link"/></small></a>
    );
  }
}
