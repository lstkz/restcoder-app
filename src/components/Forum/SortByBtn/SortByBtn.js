import React, { PropTypes } from 'react';
import styles from './SortByBtn.scss';
import {MenuItem, Dropdown} from 'react-bootstrap';

export default class SortByBtn extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <Dropdown id="sort-button" className={styles.SortByBtn}>
        <Dropdown.Toggle>
          Sort by
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="1">
            <i className="fa fa-fw fa-check"/> Newest to Oldest
          </MenuItem>
          <MenuItem eventKey="2">
            <i className="fa fa-fw"/> Oldest to Newest
          </MenuItem>
          <MenuItem eventKey="3">
            <i className="fa fa-fw"/> Most posts
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
