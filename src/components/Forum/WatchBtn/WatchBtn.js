import React, {PropTypes} from 'react';
import styles from './WatchBtn.scss';
import {MenuItem, Dropdown} from 'react-bootstrap';

export default class WatchBtn extends React.Component {
  static propTypes = {
    isIgnored: PropTypes.bool.isRequired,
    watch: PropTypes.func.isRequired,
    unwatch: PropTypes.func.isRequired,
  };

  renderBtn() {
    const { isIgnored } = this.props;
    if (!isIgnored) {
      return (
        <span>
          <i className="fa fa-fw fa-eye"/>
          Watching
        </span>
      );
    }
    return (
      <span>
        <i className="fa fa-fw fa-eye-slash"/>
        Ignoring
      </span>
    );
  }

  render() {
    const {isIgnored, watch, unwatch} = this.props;

    return (
      <Dropdown id="watch-button" className={styles.WatchBtn}>
        <Dropdown.Toggle>
          {this.renderBtn()}
        </Dropdown.Toggle>
        <Dropdown.Menu onSelect={(key) => key === '1' ? watch() : unwatch()}>
          <MenuItem eventKey="1">
            <i className={`fa fa-fw ${isIgnored ? '' : 'fa-check'}`}/>
            <i className="fa fa-fw fa-eye"/>
            Watching
            <p className="help-text"><small>Show topics in unread</small></p>
          </MenuItem>
          <MenuItem eventKey="2">
            <i className={`fa fa-fw ${!isIgnored ? '' : 'fa-check'}`}/>
            <i className="fa fa-fw fa-eye-slash"/>
            Ignoring
            <p className="help-text"><small>Do not show topics in unread</small></p>
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
