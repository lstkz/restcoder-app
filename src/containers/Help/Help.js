import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {App} from '../';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {Link} from 'react-router';
import {NodejsSetup, JavaSetup, Scoring, ProcfileInfo, RubySetup, PythonSetup, DotNetSetup, RestCoderCLI, PlatformInformation, Limitations} from '../../components/Help';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
@connect(state => state, {})
export default class Help extends React.Component {
  static propTypes = {};

  renderLanguage(lang) {
    switch (lang) {
      case 'nodejs':
        return <NodejsSetup />;
      case 'java':
        return <JavaSetup />;
      case 'ruby':
        return <RubySetup />;
      case 'python':
        return <PythonSetup />;
      case 'dotnet':
        return <DotNetSetup />;
      default:
        return this.renderDefaultContent();
    }
  }

  renderContent() {
    const params = this.props.routeParams || {};
    switch (params.topic) {
      case 'getting-started':
        return this.renderLanguage(params.subtopic);
      case 'procfile':
        return <ProcfileInfo/>;
      case 'cli-tool':
        return <RestCoderCLI/>;
      case 'platform-information':
        return <PlatformInformation/>;
      case 'limitations':
        return <Limitations/>;
      case 'scoring':
        return <Scoring/>;
      default:
        return this.renderDefaultContent();
    }
  }

  renderDefaultContent() {
    return (
      <div className="text-center">
        <h1>Getting Started with RestCoder</h1>
        <p>Please select a topic on the left sidebar</p>
      </div>
    );
  }

  renderLink(text, topic, subtopic) {
    const params = this.props.routeParams || {};
    let className;
    if (params.topic === topic && params.subtopic === subtopic) {
      className = 'active';
    }
    let url;
    if (subtopic) {
      url = `/help/${topic}/${subtopic}`;
    } else {
      url = `/help/${topic}`;
    }
    return (
      <li className={className}>
        <Link to={url}>{text}</Link>
      </li>);
  }

  render() {
    return (
      <App>
        <Helmet title="Help" />
        <div className={'container ' + styles.Help}>
          <div className="row">
            <div className="col-sm-3">
              <ul className="nav nav-list">
                <li className="nav-header">Getting started</li>
                <li >
                  <ul className="nav nav-list">
                    {this.renderLink('Node.js', 'getting-started', 'nodejs')}
                    {this.renderLink('Java', 'getting-started', 'java')}
                    {this.renderLink('Ruby', 'getting-started', 'ruby')}
                    {this.renderLink('Python', 'getting-started', 'python')}
                    {this.renderLink('.NET', 'getting-started', 'dotnet')}
                  </ul>
                </li>
                <li className="divider"/>
                <li className="nav-header">General</li>
                {this.renderLink('RestCoder CLI tool', 'cli-tool')}
                {this.renderLink('Procfile', 'procfile')}
                {this.renderLink('Platform information', 'platform-information')}
                {this.renderLink('Limitations', 'limitations')}
                {this.renderLink('Scoring', 'scoring')}
              </ul>
            </div>

            <div className="col-sm-9">
              {this.renderContent()}
            </div>

          </div>
        </div>
      </App>
    );
  }
}
