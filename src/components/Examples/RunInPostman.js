import React, {PropTypes} from 'react';

export default class RunInPostman extends React.Component {
  static propTypes = {
    collectionId: PropTypes.string.isRequired,
  };

  render() {
    const {collectionId} = this.props;

    return (
      <a target="_blank" href={'https://app.getpostman.com/run-collection/' + collectionId}>
        <img id="postman-btn" src="https://run.pstmn.io/button.svg" />
      </a>
    );
  }
}
