import React, {PropTypes} from 'react';
import JSONSchemaView from 'json-schema-view-js';
import ReactDOM from 'react-dom';
import './JSONSchema.scss';

export default class JSONSchema extends React.Component {
  static propTypes = {
    schema: PropTypes.any
  };

  componentDidMount() {
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    const view = new JSONSchemaView(this.props.schema);
    wrapper.appendChild(view.render());
  }

  render() {
    return (
      <div ref="wrapper">
      </div>
    );
  }
}
