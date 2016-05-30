import React, { PropTypes } from 'react';
import styles from './TopicToolbar.scss';
import StatsNumber from '../StatsNumber/StatsNumber';
import {MenuItem, Dropdown} from 'react-bootstrap';


export default class TopicToolbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    topic: PropTypes.object.isRequired,
    replyPost: PropTypes.func.isRequired,
  };

  render() {
    const {topic, className, replyPost} = this.props;
    return (
      <div className={`${styles.TopicToolbar} ${className || ''}`}>
        <StatsNumber title="Posts" count={topic.postcount} />
        <StatsNumber className="mhl" title="Views" count={topic.viewcount} />

        <button className="btn btn-inverse" onClick={() => replyPost(null, topic)}>Reply</button>
        &nbsp;
        <button className="btn btn-default">
          <i className="fa fa-inbox"/><span className="visible-sm-inline visible-md-inline visible-lg-inline"> Mark unread</span>
        </button>
        &nbsp;
        <Dropdown id="watch-button">
          <Dropdown.Toggle>
            <i className="fa fa-fw fa-bell-o"/>
            Watching
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem eventKey="1">
              <i className="fa fa-fw fa-check"/>
              <i className="fa fa-fw fa-eye"/>
              Watching
              <p className="help-text hidden-xs"><small>Notify me of new replies.<br/>Show topic in unread.</small></p>
            </MenuItem>
            <MenuItem eventKey="2">
              <i className="fa fa-fw"/>
              <i className="fa fa-fw fa-bell-slash-o"/>
              Not Watching
              <p className="help-text hidden-xs"><small>Do not notify me of new replies.<br/>Show topic in unread if category is not ignored.</small></p>
            </MenuItem>
            <MenuItem eventKey="3">
              <i className="fa fa-fw"/>
              <i className="fa fa-fw fa-eye-slash"/>
              Ignoring
              <p className="help-text hidden-xs"><small>Do not notify me of new replies.<br/>Do not show topic in unread.</small></p>
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
