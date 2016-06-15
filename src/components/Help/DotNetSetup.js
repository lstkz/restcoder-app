import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import RunForeman from './RunForeman';
import {ExternalLink, BashCode} from '../';

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
          Install <ExternalLink href="http://www.mono-project.com/download/">Mono</ExternalLink> or use Microsoft .NET.
          <br/>
          Check if .NET is properly installed:
          <br/>
          <BashCode>nuget<br/>
            NuGet Version: 2.8.5.0<br/>
            ....
          </BashCode>
          <BashCode>xbuild /help<br/>
            XBuild Engine Version 12.0<br/>
            Mono, Version 4.0.4.0<br/>
            Copyright (C) 2005-2013 Various Mono authors<br/>
          </BashCode>
        </section>

        <h3>Define .NET version</h3>
        <section>
          Currently it's not possible to define a .NET version.<br/>
          Your app will be executed always under .NET 4.5.
        </section>
      </div>
    );
  }
}
