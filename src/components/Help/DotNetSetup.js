import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import RunForeman from './RunForeman';

export default class DotNetSetup extends React.Component {
  static propTypes = {};

  getCode() {
    return `
  public class HelloController : ApiController
  {
      [HttpGet]
      public HttpResponseMessage Index()
      {
          var response = new HttpResponseMessage();
          response.Content = new StringContent("world", System.Text.Encoding.UTF8, "text/html");
          return response;
      }
  }
    `.trim().replace(/\n/, '<br/>');
  }

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with .NET</h1>
        <h3>Setup</h3>
        <section>
          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
        </section>
        <section>
          Install <a target="_blank" href="http://www.mono-project.com/download/">Mono <i className="fa fa-external-link"/></a> or use Microsoft .NET.
        </section>

        <CheckoutCodeSection lang="dotnet"/>

        <h3>Define .NET version</h3>
        <section>
          Currently it's not possible to define a .NET version.<br/>
          Your app will be executed always under .NET 4.5.
        </section>

        <h3>Solve it</h3>
        <section>
          Add following code to <code>Program.cs</code>
          <pre><code dangerouslySetInnerHTML={{__html: this.getCode()}}/></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i
            className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from packages.config
        <pre><code><span className="nv">$ </span>nuget restore -NonInteractive<br/></code></pre>
          Compile
          <pre><code><span className="nv">$ </span>xbuild<br/></code></pre>
          <RunForeman>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>7:47:54 PM web.1 |</span>   Listening on 5000<br/>
            <span className={styles.cyan}>7:47:54 PM web.1 |</span>   READY
          </RunForeman>
          <strong>Important: </strong>Use <code>nf start -j Procfile.windows</code> command in Windows
        </section>
        <SubmitCodeSection lang=" dotnet@4.2.3" fileCount={8} />
      </div>
    );
  }
}
