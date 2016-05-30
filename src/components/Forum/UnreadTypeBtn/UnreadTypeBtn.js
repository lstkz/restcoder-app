import React, {PropTypes} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import classNames from 'classnames';

const translations = {
  '[[unread:all-topics]]': 'All Topics',
  '[[unread:new-topics]]': 'New Topics',
  '[[unread:watched-topics]]': 'Watched Topics',
};

export default class UnreadTypeBtn extends React.Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    selectedFilter: PropTypes.object.isRequired,
    queryString: PropTypes.string.isRequired,
  };

  render() {
    const {filters, selectedFilter, queryString} = this.props;

    return (

      <Dropdown id="unreadType">
        <Dropdown.Toggle>
          {translations[selectedFilter.name]}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {filters.map((item, i) =>
            <LinkContainer key={i} to={`/${item.url}${queryString}`}>
              <MenuItem eventKey={i}>
                  <i className={classNames('fa fa-fw', {'fa-check': item.selected})}/>
                  {translations[item.name]}
              </MenuItem>
            </LinkContainer>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
