import React, {PropTypes} from 'react';
import _ from 'underscore';
import marked from 'marked';
import styles from './SwaggerExplorer.scss';
import {Callout, ResponseCode} from '../';
import JSONSchema from './JSONSchema';

export default class SwaggerExplorer extends React.Component {
  static propTypes = {
    spec: PropTypes.string,
    challenge: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { spec, challenge } = props;
    const name = spec || 'main';
    const content = _.findWhere(challenge.swaggerSpecs, { name: name }).content;
    const specs = JSON.parse(content);
    this.state = {
      specs,
      multiPath: _.keys(specs.paths).length > 1
    };
  }

  getParameters(path, operation) {
    const operationParameters = operation.parameters || [];
    const pathParameters = path.parameters || [];
    return operationParameters.concat(pathParameters)
      .map((parameter) => {
        if (parameter.schema) {
          return parameter;
        } else if (parameter.type === 'array') {
          parameter.schema = _.pick(parameter, 'type', 'items');
        } else {
          const schema = {type: parameter.type};
          if (parameter.format) {
            schema.format = parameter.format;
          }
          parameter.schema = schema;
        }
        // if allowEmptyValue is explicitly set to false it means this parameter
        // is required for making a request.
        if (parameter.allowEmptyValue === false) {
          parameter.schema.required = true;
        }
        return parameter;
      });
  }

  renderResponseHeaders(response) {
    if (!response.headers) {
      return (<td/>);
    }
    return (<td>
      <div className="table-responsive">
      <table className="respnse-headers">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        {_.map(response.headers, (header, headerName) =>
          <tr key={headerName}>
            <td>{headerName}</td>
            <td>{header.description}</td>
            <td>
              {/* <json-formatter json="header.type"></json-formatter> */}
            </td>
            <td>
              {/* <json-formatter json="header"></json-formatter> */}
            </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
    </td>);
  }

  renderOperation(path, pathName, operation, operationName) {
    const parameters = this.getParameters(path, operation);
    const {responses} = operation;
    const hasAResponseWithHeaders = _.keys(responses).some((responseCode) => {
      return responses[responseCode] && responses[responseCode].headers;
    });
    const hasAResponseWithSchema = _.keys(responses).some((responseCode) => {
      return responses[responseCode] && responses[responseCode].schema;
    });
    return (
      <Callout className="operation"
               title={`${operationName.toUpperCase()} ${pathName}`}
               httpMethod={operationName} key={operationName}>

          {operation.summary &&
            <section className="summary">
              <h5>Summary</h5>
              <p>{operation.summary}</p>
            </section>
          }

          {operation.description &&
            <section className="description">
              <h5>Description</h5>
              <p dangerouslySetInnerHTML={{__html: marked(operation.description)}}/>
            </section>
          }

          {!!parameters.length &&
          <section className="parameters">
            <h5>Parameters</h5>
            <div className="table-responsive">
              <table className="table table-condensed">
                <thead>
                <tr>
                  <th className="short">Name</th>
                  <th className="short">Located in</th>
                  <th className="short">Required</th>
                  <th>Description</th>
                  <th>Schema</th>
                </tr>
                </thead>
                <tbody>
                {parameters.map((parameter) =>
                  <tr key={parameter.name}>
                    <td className="short">{parameter.name}</td>
                    <td className="short">{parameter.in}</td>
                    <td className="short">{parameter.required ? 'Yes' : 'No'}</td>
                    <td dangerouslySetInnerHTML={{__html: marked(parameter.description)}}/>
                    <td>
                      <JSONSchema schema={parameter.schema} />
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </section>
          }

        <section>
          <h5>Responses</h5>

          <div className="table-responsive">
            <table className="table table-condensed responses">
              <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                {hasAResponseWithHeaders && <th>Headers</th>}
                {hasAResponseWithSchema && <th>Schema</th>}
              </tr>
              </thead>

              <tbody>
              {_.map(responses, (response, responseCode) =>
                <tr key={responseCode}>
                  <td>
                    <ResponseCode code={responseCode} />
                  </td>
                  <td dangerouslySetInnerHTML={{__html: marked(response.description)}}/>
                  {hasAResponseWithHeaders && this.renderResponseHeaders(response)
                  }
                  {hasAResponseWithSchema && <td>
                    <JSONSchema schema={response.schema} />
                  </td>}
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </section>
      </Callout>
    );
  }

  renderPath(path, pathName) {
    return (
      <ul className="operations" key={pathName}>
        {_.map(path, (operation, operationName) => this.renderOperation(path, pathName, operation, operationName))}
      </ul>
    );
  }

  render() {
    const { specs } = this.state;
    const paths = specs.paths;
    return (
      <div className={styles.SwaggerExplorer}>
        {_.map(paths, (path, pathName) => this.renderPath(path, pathName))}
      </div>
    );
  }
}
