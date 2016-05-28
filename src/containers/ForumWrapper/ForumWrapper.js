import React, {PropTypes} from 'react';
import {App} from '../';
import {Composer} from '../../components/Forum';
import {connect} from 'react-redux';
import * as actions from '../../redux/modules/forum';

@connect(state => state.forum, actions)
export default class ForumWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    toggleComposerPreview: PropTypes.func.isRequired,
    setComposerContent: PropTypes.func.isRequired,
    setComposerTitle: PropTypes.func.isRequired,
  };

  render() {
    const {children} = this.props;

    return (
      <App>
        {children}
        <Composer
          {...this.props.composer}
          togglePreview={this.props.toggleComposerPreview}
          setContent={this.props.setComposerContent}
          setTitle={this.props.setComposerTitle}
        />
      </App>
    );
  }
}
