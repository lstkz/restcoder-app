import React, {PropTypes} from 'react';
import styles from './Examples.scss';
import {Callout, ResponseCode} from '../';
import {Tabs, Tab} from 'react-bootstrap';
import _ from 'underscore';
import Codemirror from 'react-code-mirror';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');

if (__CLIENT__) {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/addon/display/autorefresh');
}

export default class Examples extends React.Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired
  };

  renderCodeMirror({responseType, body}) {
    if (!Codemirror) {
      return null;
    }
    if (responseType === 'plain') {
      return (<code>{body}</code>);
    }
    if (!body) {
      return (<span>No response</span>);
    }
    const options = {
      autoRefresh: true,
      lineNumbers: false,
      mode: 'application/ld+json',
      readOnly: true,
      theme: 'material'
    };
    return <Codemirror {...options} value={body} />;
  }

  renderTabs(obj, titlePrefix) {
    const headerCount = _.keys(obj.headers || {}).length;
    return (
      <Tabs defaultActiveKey={1} id="examplesTabs">
        <Tab eventKey={1} title={titlePrefix + ' BODY'}>
          {this.renderCodeMirror(obj)}
        </Tab>

        {!!headerCount && <Tab eventKey={2} title={titlePrefix + ' HEADERS'}>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                {_.map(obj.headers, (value, header) =>
                  <li className="list-group-item" key={header}>
                    <strong>{header} →</strong> {value}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Tab>}
      </Tabs>);
  }

  renderItem(item, i) {
    const title = (<span>{item.request.method} {item.request.url} → <ResponseCode code={item.response.status} /></span>);
    return (
      <Callout className="example" key={i} title={title} httpMethod={item.request.method} description={item.description}>
        {item.request.body && this.renderTabs(item.request, 'REQUEST')}
        {this.renderTabs(item.response, 'RESPONSE')}
      </Callout>
    );
  }

  render() {
    const { challenge: { examples } } = this.props;

    return (
      <div className={styles.Examples}>
        {examples.map((suit, i) =>
          <div key={i}>
            {suit.requests.map(::this.renderItem)}
          </div>
        )}
      </div>
    );
  }
}
