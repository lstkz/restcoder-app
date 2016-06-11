import React, {PropTypes} from 'react';

export default class RunInPostman extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
  };

  render() {
    return (
      <a target="_blank" href="https://app.getpostman.com/run-collection/87262e6e50b5f5e157d3">
        <img id="postman-btn" src="https://run.pstmn.io/button.svg" />
      </a>
    );
  }
}
