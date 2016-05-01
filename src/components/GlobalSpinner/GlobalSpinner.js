import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

@connect(state => state.global, {})
export default class GlobalSpinner extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

  render() {
    const {loading} = this.props;
    if (!loading) {
      return null;
    }
    return (
      <div className="react-progress-bar-spinner-icon"></div>
    );
  }
}
