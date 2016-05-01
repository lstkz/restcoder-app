import React, { PropTypes } from 'react';
import styles from './Callout.scss';
import classNames from 'classnames';

export default class Callout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    type: PropTypes.string,
    httpMethod: PropTypes.string,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded || true
    };
  }

  toggle() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const {title, children, type: originalType, className, httpMethod} = this.props;
    const httpMethod2Color = {
      get: 'green',
      post: 'orange'
    };
    const type = originalType || httpMethod2Color[httpMethod.toLowerCase()];
    const {expanded} = this.state;
    return (
      <div className={classNames(styles.Callout, styles[type], className)}>
        <h4 onClick={::this.toggle}>{title}</h4>
        {expanded && <div className="ptm">
          {children}
        </div>}
      </div>
    );
  }
}
