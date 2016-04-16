import React, {Component} from 'react';
import classnames from 'classnames';

export default class RecentSubmissions extends Component {
  render() {
    const styles = require('./RecentSubmissions.scss');
    const items = [
      {name: 'Starter:  FizzBuzz', time: '3 days ago', user: 'user1', result: 'PASS'},
      {name: 'Starter:  JSON response', time: '4 days ago', user: 'user2', result: 'FAIL'},
      {name: 'Starter:  Hello world', time: '5 days ago', user: 'user3', result: 'PASS'},
      {name: 'Starter:  Hello world', time: '11 days ago', user: 'user3', result: 'FAIL'},
      {name: 'Starter:  FizzBuzz', time: '12 days ago', user: 'user1', result: 'FAIL'}
    ];

    return (
      <div className={styles.recentSubmissions}>
        <div className="panel panel-default panel-info">
          <div className="panel-heading"> Recent submissions</div>
          <div className="">
            <ul className="list-group">
              {items.map((item) =>
                <li className="list-group-item">
                  <span className={classnames('badge', {'bgm-red': item.result === 'FAIL', 'bgm-green': item.result === 'PASS'})}>{item.result}</span>
                  <a><strong>{item.name}</strong></a>
                  <br/>
                  <small>By <a>{item.user}</a> <i>{item.time}</i>
                  </small>
                </li>
              )}
            </ul>
          </div>
          <a className="view-all" href="">View All</a>
        </div>
      </div>
    );
  }
}