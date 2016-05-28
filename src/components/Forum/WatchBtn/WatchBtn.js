import React, { PropTypes } from 'react';
import styles from './WatchBtn.scss';
import {MenuItem, Dropdown} from 'react-bootstrap';

export default class WatchBtn extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <Dropdown id="watch-button" className={styles.WatchBtn}>
        <Dropdown.Toggle>
          <i className="fa fa-fw fa-eye"/>
          Watching
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="1">
            <i className="fa fa-fw fa-check"/>
            <i className="fa fa-fw fa-eye"/>
            Watching
            <p className="help-text"><small>Show topics in unread</small></p>
          </MenuItem>
          <MenuItem eventKey="2">
            <i className="fa fa-fw"/>
            <i className="fa fa-fw fa-eye-slash"/>
            Ignoring
            <p className="help-text"><small>Do not show topics in unread</small></p>
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
